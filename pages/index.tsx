import useSwr from "swr";

import Map from "../components/map";
import statesFile from "../data/states";
import State, { StateType } from "../components/state";
import { StatesData } from "../interfaces/api";
import { useState } from "react";
import Popup, { PopupType } from "../components/popup";

const states: StateType[] = statesFile;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSwr<StatesData>(`/api/states/`, fetcher);
  const [popupData, setPopupData] = useState<PopupType>({
    show: false,
  });

  const onMouseMove = (e: React.MouseEvent) => {
    setPopupData((prevState) => {
      const newState = { ...prevState };
      newState.x = e.clientX;
      newState.y = e.clientY;
      return newState;
    });
  };

  const onMouseOver = (e: React.MouseEvent) => {
    var element = e.target as HTMLElement;
    if (element.tagName === "path") {
      setPopupData((preState) => {
        const newState = { ...preState };
        newState.show = true;
        newState.text = element.dataset.name;
        return newState;
      });
    } else {
      setPopupData((prevState) => {
        const newState = { ...prevState };
        newState.show = false;
        return newState;
      });
    }
  };

  return (
    <>
      <Popup
        x={popupData.x}
        y={popupData.y}
        text={popupData.text}
        show={popupData.show}
      />
      <Map mouseMove={onMouseMove} mouseOver={onMouseOver}>
        {states.map((s) => {
          const { style, ...allData } = s;
          let stateColor;
          if (data && data[s.id.toLowerCase()]) {
            const newGreen = (data[s.id.toLowerCase()].pct || 0) * 50 * 255;
            stateColor = `rgb(0, ${newGreen}, 0)`;
          } else {
            stateColor = "rgb(120, 120, 120)";
          }
          console.log(s.id, stateColor);
          const newStyle = { ...s.style, fill: stateColor };
          return <State key={s.id} {...allData} style={newStyle} />;
        })}
      </Map>
    </>
  );
}
