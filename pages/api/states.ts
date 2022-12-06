// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {GetStatesDataType} from "../../interfaces/api";
const { PG_PASSWORD } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetStatesDataType[]>
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
      'FROM policies WHERE status=\'active\'  AND "createdAt" > (CURRENT_DATE - INTERVAL \'30 DAY\')::DATE GROUP BY STATE' +
      ') t'
  const queryRes = await pool.query(template)
  const statesData: GetStatesDataType[] = queryRes.rows[0].json_agg

  const allCount = statesData.reduce((a, c) => a + c.total_in_state, 0)
  statesData.forEach((s, dx) => statesData[dx].pct = statesData[dx].total_in_state / allCount);
  res.status(200).json(statesData);
}
