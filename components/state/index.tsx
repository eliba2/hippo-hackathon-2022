import * as React from "react";

export type StateType = {
  id: string;
  dataName: string;
  dataId: string;
  d: string;
  style: React.CSSProperties;
};

const State = (props: StateType) => {
  return (
    <path
      key={props.id}
      id={props.id}
      data-name={props.dataName}
      data-id={props.dataId}
      d={props.d}
      style={props.style}
    />
  );
};

export default State;
