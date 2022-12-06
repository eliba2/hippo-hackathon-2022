import * as React from "react";

const Y_OFFSET = 20;

export type PopupType = {
  x?: number;
  y?: number;
  text?: string;
  show: boolean;
};

const Popup = (props: PopupType) => {
  return (
    <div
      id="details-box"
      style={{
        top: `${Y_OFFSET + (props.y || 0)}px`,
        left: `${props.x}px`,
        opacity: props.show ? "100%" : "0%",
      }}
      dangerouslySetInnerHTML={{ __html: props.text || "" }}
    />
  );
};

export default Popup;
