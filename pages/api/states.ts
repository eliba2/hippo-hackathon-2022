// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StateClaimsDataType, PoliciesData} from "../../interfaces/api";
import policiesDataFile from "../../data/states_data";

const policiesData: PoliciesData = policiesDataFile;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PoliciesData>
) {
  const allCount = Object.keys(policiesData).reduce(
    (a, c) => a + policiesData[c].total_in_state,
    0
  );
  Object.keys(policiesData).forEach(
    (s) => (policiesData[s].pct = policiesData[s].total_in_state / allCount)
  );
  res.status(200).json(policiesData);
}
