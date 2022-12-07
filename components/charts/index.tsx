import { ResponsivePie } from "@nivo/pie";
import { StateDataType } from "../../interfaces/api";

export type ChartsProps = {
  data: StateDataType | null;
};

const Charts = (props: ChartsProps) => {
  const chartData = props.data
    ? [
        {
          id: "ho3",
          label: "ho3",
          value: props.data.ho3,
        },
        {
          id: "ho6",
          label: "ho6",
          value: props.data.ho6,
        },
        {
          id: "ho5",
          label: "ho5",
          value: props.data.ho5,
        },
        {
          id: "dp3",
          label: "dp3",
          value: props.data.dp3,
        },
      ]
    : [];

  return (
    <div id="charts">
      <ResponsivePie
        theme={{
          fontSize: 18,
        }}
        colors={{ scheme: 'accent' }}
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

export default Charts;
