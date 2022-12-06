// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {GetStatesDataType} from "../../interfaces/api";
import statesDataFile from '../../data/states_data'

const statesData: GetStatesDataType[] = statesDataFile

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetStatesDataType[]>
) {
  const allCount = statesData.reduce((a, c) => a + c.total_in_state, 0)
  statesData.forEach((s, dx) => statesData[dx].pct = statesData[dx].total_in_state / allCount);
  res.status(200).json(statesData);
}
