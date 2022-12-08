import { ResponsivePie } from "@nivo/pie";
import { PerilStruct, StateDataType } from "../../interfaces/api";

export type ChartsProps = {
  data: PerilStruct | null;
};

type ChartPropsProduct = {
  id: string;
  label: string;
  value: number;
};

const ClaimsChart = (props: ChartsProps) => {
  const chartData: ChartPropsProduct[] = [];
  const perils = [
    "aircraft",
    "electrical_current",
    "equipment_breakdown",
    "explosions",
    "falling_objects",
    "fire",
    "flood",
    "hail",
    "hurricane",
    "liability",
    "lightning",
    "medical_payments",
    "pipe_freezing",
    "riots_or_civil_disturbances",
    "roof_leak",
    "service_line",
    "smoke",
    "theft",
    "vandalism",
    "vehicle",
    "volcanic_eruption",
    "water_appliance",
    "water_backup",
    "water_overflow",
    "wind",
  ] as const;

  console.log('data', perils .filter((key) => props.data && (props.data[key] || 0) > 0));

  perils
    .filter((key) => props.data && (props.data[key] || 0) > 0)
    .forEach((key) => {
      chartData.push({
        id: key,
        label: key,
        value: props.data?.[key] as number,
      });
    });
  return (
    <div className="charts">
      <ResponsivePie
        theme={{
          fontSize: 18,
        }}
        colors={{ scheme: "nivo" }}
        animate={true}
        data={chartData}
        margin={{ top: 80, bottom: 80 }}
        innerRadius={0.6}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default ClaimsChart;
