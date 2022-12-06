// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GetStatesType } from "../../interfaces/api";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetStatesType[]>
) {

  const response: GetStatesType[] = [
    { state: "al", count: 5907 },
    { state: "ar", count: 6306 },
    { state: "az", count: 14052 },
    { state: "ca", count: 33836 },
    { state: "co", count: 13069 },
    { state: "ct", count: 8029 },
    { state: "de", count: 2676 },
    { state: "fl", count: 1159 },
    { state: "ga", count: 13588 },
    { state: "il", count: 7062 },
    { state: "in", count: 4148 },
    { state: "ks", count: 2724 },
    { state: "ky", count: 7956 },
    { state: "ma", count: 1886 },
    { state: "md", count: 2958 },
    { state: "me", count: 3041 },
    { state: "mi", count: 4037 },
    { state: "mn", count: 3060 },
    { state: "mo", count: 4468 },
    { state: "ms", count: 2912 },
    { state: "nc", count: 920 },
    { state: "ne", count: 4310 },
    { state: "nh", count: 4797 },
    { state: "nj", count: 21473 },
    { state: "nm", count: 4052 },
    { state: "nv", count: 4162 },
    { state: "ny", count: 1684 },
    { state: "oh", count: 6563 },
    { state: "or", count: 5637 },
    { state: "pa", count: 8842 },
    { state: "ri", count: 3276 },
    { state: "sc", count: 6721 },
    { state: "tn", count: 4339 },
    { state: "tx", count: 39775 },
    { state: "ut", count: 1838 },
    { state: "va", count: 3966 },
    { state: "vt", count: 4232 },
    { state: "wa", count: 2192 },
    { state: "wi", count: 2102 },
    { state: "wv", count: 2475 },
  ];
  const allCount = response.reduce((a, c) => a + c.count, 0)
  response.forEach((s, dx) => response[dx].pct = response[dx].count / allCount);
  res.status(200).json(response);
}
