// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  StateDataType,
  ClaimsData,
  PerilType,
  StateClaimsDataType,
} from "../../interfaces/api";
import claimsDataFile from "../../data/claims_data_database";

const claimsData: ClaimsData = claimsDataFile;

//const { PG_PASSWORD } = process.env;

//var fs = require("fs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClaimsData>
) {
  /*
    const Pool = require("pg").Pool;
    const config = {
        host: "pod-staging.clv5lxmu2lpv.us-west-2.rds.amazonaws.com",
        user: "awsuser",
        password: PG_PASSWORD,
        database: "staging"
    };
    const pool = new Pool(config);
    const template = 'SELECT json_agg(t) FROM (SELECT STATE, claims->0->\'updates\'->0->\'peril\' as peril, COUNT(1) FROM policies WHERE jsonb_array_length(claims_info)>0 GROUP BY STATE, peril) t'
    const queryRes = await pool.query(template)
    console.log(queryRes.rows[0].json_agg)
    const rawClaimsStatesData: ClaimsDataType[] = queryRes.rows[0].json_agg


    let obj: StatesData = {}
    const allCount = rawClaimsStatesData.reduce((a, c) => a + c.count, 0)
    console.log('count=', allCount)


    const temp = rawClaimsStatesData.reduce((acc, currentValue) => {
        const {state, peril, count} = currentValue;

        if (acc[state]) {
            return {
                ...acc,
                [state]: {
                    ...acc[state],
                    [peril]: count
                }
            };
        }

        return {...acc, [state]: {[peril]: count}};
    }, {} as ClaimsData)
    console.log('temp', temp)
    const fileContent = '// eslint-disable-next-line\n' +
        'export default ' + JSON.stringify(temp)
    fs.writeFile("./data/claims_data_database.ts", fileContent, (err: any) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).json(temp)
*/

  const allCount = Object.keys(claimsData).reduce((a, c) => {
    const totalInState = Object.keys(claimsData[c]).reduce((a0, c0) => {
      return a0 + Number(claimsData[c][c0 as PerilType]);
    }, 0);
    claimsData[c].total_in_state = totalInState;
    return a + totalInState;
  }, 0);

  Object.keys(claimsData).forEach(
    (s) => (claimsData[s].pct = (claimsData[s].total_in_state || 0) / allCount)
  );

  res.status(200).json(claimsData);
}

function stateData(stateData: StateClaimsDataType, allCount: number) {
  const state: string = stateData.state || "";
  stateData.pct = (stateData.total_in_state || 0) / allCount;
  delete stateData.state;
  return { [state]: stateData };
}
