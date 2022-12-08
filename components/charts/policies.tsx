import { ResponsivePie } from "@nivo/pie";
import { StatePoliciesDataType } from "../../interfaces/api";

export type PolicyChartsProps = {
  data: StatePoliciesDataType | null;
};

type PolicyChartPropsProduct = {
  id: string;
  label: string;
  value: number;
};

const PolicyChart = (props: PolicyChartsProps) => {
  const chartData: PolicyChartPropsProduct[] = [];
  const products = ["ho3", "ho6", "dp3", "ho5"] as const;
  products
    .filter((key) => props.data && props.data[key] > 0)
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
        colors={{ scheme: "accent" }}
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

export default PolicyChart;
