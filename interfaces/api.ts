export type GetStatesType = {
  state: string;
  count: number;
  pct?: number;
};

export type StateDataType = {
  state?: string
  ho3: number;
  ho6: number;
  dp3: number;
  ho5: number;
  total_in_state: number;
  pct?: number;
};

export type StatesData = Record<string, StateDataType>;

export type ViewBoxType = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};
