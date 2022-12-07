import useSwr from "swr";
import { animate, easeInOut } from "popmotion";

import Map from "../components/map";
import statesFile from "../data/states";
import State, { StateType } from "../components/state";
import { StateDataType, StatesData, ViewBoxType } from "../interfaces/api";
import { useRef, useState } from "react";
import Popup, { PopupType } from "../components/popup";
import Charts from "../components/charts";

const states: StateType[] = statesFile;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSwr<StatesData>(`/api/states/`, fetcher);
  const [popupData, setPopupData] = useState<PopupType>({
    show: false,
  });
  const [mapViewBox, setMapViewBox] = useState<ViewBoxType>({
    minX: 0,
    minY: 0,
    width: 1000,
    height: 589,
  });
  const mapRef = useRef<SVGSVGElement>(null);
  const [currentState, setCurrentState] = useState<StateDataType | null>(null);

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
      const stateId = element.dataset?.id?.toLowerCase();
      const stateData = data && stateId && data[stateId];
      //console.log(data, stateId);
      if (stateData) {
        setCurrentState(stateData);
      }
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

  const onMouseClick = (e: React.MouseEvent) => {
    /*
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    const box = (e.target as SVGGraphicsElement).getBBox();

    const targetX = screenWidth / 2 - box.x + box.width / 2;

    const newViewBox = { ...mapViewBox };
    newViewBox.minX = -targetX;

    animate({
      elapsed: 0,
      duration: 500,
      ease: easeInOut,
      to: [mapViewBox, newViewBox],
      onUpdate: (val) => {
        console.log("to => ", val);
        setMapViewBox(val);
      },
    });
    */
  };

  return (
    <div id="mainpage">
      <Popup
        x={popupData.x}
        y={popupData.y}
        text={popupData.text}
        show={popupData.show}
      />
      <Map
        viewBox={`${mapViewBox.minX} ${mapViewBox.minY} ${mapViewBox.width} ${mapViewBox.height}`}
        mouseMove={onMouseMove}
        mouseOver={onMouseOver}
        svgRef={mapRef}
      >
        {states.map((s) => {
          const { style, ...allData } = s;
          let stateColor;
          if (data && data[s.id.toLowerCase()]) {
            const newGreen =
              (1 - (data[s.id.toLowerCase()].pct || 0 + 0.2) * 3) * 255;
            stateColor = `rgb(0, ${newGreen}, 0)`;
          } else {
            stateColor = "rgb(230, 230, 230)";
          }
          const newStyle = { ...s.style, fill: stateColor };
          return (
            <State
              onclick={onMouseClick}
              key={s.id}
              {...allData}
              style={newStyle}
            />
          );
        })}
      </Map>
      <Charts data={currentState} />
    </div>
  );
}
