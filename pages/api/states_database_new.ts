// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {StateDataType, StatesData} from "../../interfaces/api";
const { PG_PASSWORD } = process.env;
import statesDataFile from "../../data/states_data_database";
import {stringify} from "querystring";

var fs = require('fs');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatesData[]>
) {
  console.log('Checking file')
  if (refreshFileIfNeeded("./data/states_data_database.ts")) {
    console.log('Need to refresh file')
  }

  /*
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
  const queryRes = await pool.query(template)*/
  const rawStatesData:StateDataType[] = queryDb();


  let obj:StatesData = {}
  const allCount = rawStatesData.reduce((a, c) => a + c.total_in_state, 0)
  rawStatesData.forEach((s, dx) => {
    obj = {...obj, ...stateDataToJson(rawStatesData[dx], allCount)}
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

async function queryDb(): Promise<StateDataType[]> {
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
  return queryRes.rows[0].json_agg;
}

function stateDataToJson(stateData:StateDataType, allCount:number) {
  const state = stateData.state || "na"  // If no state, set it to N/A
  stateData.pct = stateData.total_in_state / allCount
  delete stateData.state
  return {[state]: stateData}
}

function refreshFileIfNeeded(filename:string) {
  return (fileLastFresh(filename)>3)
}

function fileLastFresh(filename:string) {
  const fileStats = fs.statSync(filename);
  return (new Date().getTime() - fileStats.mtimeMs) / 1000;
}
