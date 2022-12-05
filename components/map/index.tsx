import * as React from "react";

type MapProps = {
  children: React.ReactNode;
};

const Map = (props: MapProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground={"new 0 0 1000 589"}
      height="589px"
      version="1.1"
      viewBox="0 0 1000 589"
      width="1000px"
      id="us-map"
      preserveAspectRatio="xMinYMin meet"
    >
      <defs id="defs4"></defs>
      {props.children}
    </svg>
  );
};

export default Map;
