// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {GetStatesDataType, StateDataType, StatesData} from "../../interfaces/api";
const { PG_PASSWORD } = process.env;
import statesDataFile from "../../data/states_data_database";


export type StatePolicyNumber = {
  state: StateDataType
}

var fs = require('fs');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetStatesDataType[]>
) {
  fs.stat("./data/states_data_database.ts", function(err, stats) {
    let seconds = (new Date().getTime() - stats.mtime) / 1000;
    console.log(`File modified ${seconds} ago`);
    if (seconds < 3) {
      console.log("No need to refresh data. Returning data from file")
      const statesData: StatesData = statesDataFile;
      const allCount = Object.keys(statesData).reduce(
          (a, c) => a + statesData[c].total_in_state, 0
      );
      Object.keys(statesData).forEach(
          (s) => (statesData[s].pct = statesData[s].total_in_state / allCount)
      );
      res.status(200).json(statesData);
      return
    }
  });

  const Pool = require("pg").Pool;
  const config = {
    host: "pod-staging.clv5lxmu2lpv.us-west-2.rds.amazonaws.com",
    user: "awsuser",
    password: PG_PASSWORD,
    database: "staging"
  };
  const pool = new Pool(config);
  const template = 'SELECT json_agg(t) FROM (\n' +
      'SELECT STATE, \n' +
      'COUNT(id) filter (WHERE product=\'ho3\') AS ho3,\n' +
      'COUNT(id) filter (WHERE product=\'ho6\') AS ho6,\n' +
      'COUNT(id) filter (WHERE product=\'dp3\') AS dp3,\n' +
      'COUNT(id) filter (WHERE product=\'ho5\') AS ho5,\n' +
      'COUNT(id)  AS total_in_state\n' +
      'FROM policies WHERE status=\'active\'  AND "createdAt" > (CURRENT_DATE - INTERVAL \'30 DAY\')::DATE GROUP BY STATE' +
      ') t'
  const queryRes = await pool.query(template)
  const rawStatesData: GetStatesDataType[] = queryRes.rows[0].json_agg

  let obj:GetStatesDataType = {}
  const allCount = rawStatesData.reduce((a, c) => a + c.total_in_state, 0)
  rawStatesData.forEach((s, dx) => {
    obj = {...obj, ...stateData(rawStatesData[dx], allCount)}
  });
  const fileContent = '// eslint-disable-next-line\n' +
      'export default ' + JSON.stringify(obj)
  fs.writeFile("./data/states_data_database.ts", fileContent, err => {
    if (err) {
        console.log(err);
    }
  });
  res.status(200).json(obj)
};

function stateData(stateData:GetStatesDataType, allCount:number) {
  const state = stateData.state
  stateData.pct = stateData.total_in_state / allCount
  delete stateData.state
  return {[state]: stateData}
}
