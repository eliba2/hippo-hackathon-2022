// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {StateDataType, StatesData} from "../../interfaces/api";
const { PG_PASSWORD } = process.env;

var fs = require('fs');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatesData[]>
) {
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
      'FROM policies WHERE status=\'active\'  AND "createdAt" > (CURRENT_DATE - INTERVAL \'130 DAY\')::DATE GROUP BY STATE' +
      ') t'
  const queryRes = await pool.query(template)
  const rawStatesData: StateDataType[] = queryRes.rows[0].json_agg

  let obj:StatesData = {}
  const allCount = rawStatesData.reduce((a, c) => a + c.total_in_state, 0)
  rawStatesData.forEach((s, dx) => {
    obj = {...obj, ...stateData(rawStatesData[dx], allCount)}
  });
  const fileContent = '// eslint-disable-next-line\n' +
      'export default ' + JSON.stringify(obj)
  fs.writeFile("./data/states_data_database.ts", fileContent, (err: any) => {
    if (err) {
        console.log(err);
    }
  });
  res.status(200).json(obj)
};

function stateData(stateData:StateDataType, allCount:number) {
  const state:string = stateData.state || ""
  stateData.pct = stateData.total_in_state / allCount
  delete stateData.state
  return {[state]: stateData}
}
