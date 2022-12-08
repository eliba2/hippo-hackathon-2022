export type GetStatesType = {
  state: string;
  count: number;
  pct?: number;
};

export type StatePoliciesDataType = {
  state?: string;
  ho3: number;
  ho6: number;
  dp3: number;
  ho5: number;
  total_in_state: number;
  pct?: number;
};

export type StateClaimsDataType = {
  state?: string;
  aircraft?: number;
  electrical_current?: number;
  equipment_breakdown?: number;
  explosions?: number;
  falling_objects?: number;
  fire?: number;
  flood?: number;
  hail?: number;
  hurricane?: number;
  liability?: number;
  lightning?: number;
  medical_payments?: number;
  pipe_freezing?: number;
  riots_or_civil_disturbances?: number;
  roof_leak?: number;
  service_line?: number;
  smoke?: number;
  theft?: number;
  vandalism?: number;
  vehicle?: number;
  volcanic_eruption?: number;
  water_appliance?: number;
  water_backup?: number;
  water_overflow?: number;
  wind?: number;
  total_in_state?: number;
  pct?: number;
};

export type StateDataType = {
  policies: StatePoliciesDataType;
  claims: StateClaimsDataType;
};

export type PoliciesData = Record<string, StatePoliciesDataType>;

export type ViewBoxType = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

export enum MapDataType {
  PoliciesCount = 0,
  Claims = 1,
}

export type ClaimsDataType = {
  state: string;
  peril: PerilType;
  count: number;
};

export enum PerilType {
  aircraft = "aircraft",
  electrical_current = "electrical_current",
  equipment_breakdown = "equipment_breakdown",
  explosions = "explosions",
  falling_objects = "falling_objects",
  fire = "fire",
  flood = "flood",
  hail = "hail",
  hurricane = "hurricane",
  liability = "liability",
  lightning = "lightning",
  medical_payments = "medical_payments",
  pipe_freezing = "pipe_freezing",
  riots_or_civil_disturbances = "riots_or_civil_disturbances",
  roof_leak = "roof_leak",
  service_line = "service_line",
  smoke = "smoke",
  theft = "theft",
  vandalism = "vandalism",
  vehicle = "vehicle",
  volcanic_eruption = "volcanic_eruption",
  water_appliance = "water_appliance",
  water_backup = "water_backup",
  water_overflow = "water_overflow",
  wind = "wind",
  total_in_state = "total_in_state",
  pct = "pct",
}

export type PerilStruct = Partial<Record<PerilType, number>>;
export type ClaimsData = Record<string, PerilStruct>;
