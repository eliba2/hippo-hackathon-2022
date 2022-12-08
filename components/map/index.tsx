import * as React from "react";

type MapProps = {
  children: React.ReactNode;
  mouseMove: (e: React.MouseEvent) => void;
  mouseOver: (e: React.MouseEvent) => void;
  viewBox: string;
  svgRef: React.RefObject<SVGSVGElement> | undefined;
};

const Map = (props: MapProps) => {
  return (
    <div className="map-container">
      <svg
        onMouseMove={props.mouseMove}
        onMouseOver={props.mouseOver}
        xmlns="http://www.w3.org/2000/svg"
        enableBackground={"new 0 0 1000 589"}
        height="589px"
        version="1.1"
        viewBox={props.viewBox}
        id="us-map"
        preserveAspectRatio="xMinYMin meet"
        ref={props.svgRef}
      >
        <defs id="defs4"></defs>
        {props.children}
      </svg>
    </div>
  );
};

export default Map;
