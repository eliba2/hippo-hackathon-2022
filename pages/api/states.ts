// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StatesData } from "../../interfaces/api";
import statesDataFile from "../../data/states_data";

const statesData: StatesData = statesDataFile;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatesData>
) {
  const allCount = Object.keys(statesData).reduce(
    (a, c) => a + statesData[c].total_in_state,
    0
  );
  Object.keys(statesData).forEach(
    (s) => (statesData[s].pct = statesData[s].total_in_state / allCount)
  );

  //console.log(JSON.stringify(statesData, null, 2));
  res.status(200).json(statesData);
}
