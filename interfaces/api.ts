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

export type ClaimsDataType = {
    state: string,
    peril: PerilType,
    count: number
}

export enum PerilType {
    aircraft = 'aircraft',
    electrical_current = 'electrical_current',
    equipment_breakdown = 'equipment_breakdown',
    explosions = 'explosions',
    falling_objects = 'falling_objects',
    fire = 'fire',
    flood = 'flood',
    hail = 'hail',
    hurricane = 'hurricane',
    liability = 'liability',
    lightning = 'lightning',
    medical_payments = 'medical_payments',
    pipe_freezing = 'pipe_freezing',
    riots_or_civil_disturbances = 'riots_or_civil_disturbances',
    roof_leak = 'roof_leak',
    service_line = 'service_line',
    smoke = 'smoke',
    theft = 'theft',
    vandalism = 'vandalism',
    vehicle = 'vehicle',
    volcanic_eruption = 'volcanic_eruption',
    water_appliance = 'water_appliance',
    water_backup = 'water_backup',
    water_overflow = 'water_overflow',
    wind = 'wind',
}


export type ClaimsData = Record<string, Partial<Record<PerilType, number>>>;

