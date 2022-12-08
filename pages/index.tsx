import useSwr from "swr";
import { animate, easeInOut } from "popmotion";

import Map from "../components/map";
import statesFile from "../data/states";
import State, { StateType } from "../components/state";
import {
  ClaimsData,
  MapDataType,
  StateDataType,
  PoliciesData,
  ViewBoxType,
} from "../interfaces/api";
import { useRef, useState } from "react";
import Popup, { PopupType } from "../components/popup";
import PolicyChart from "../components/charts/policies";
import ClaimChart from "../components/charts/claims";
import Header from "../components/header";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const states: StateType[] = statesFile;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: policiesData, error: policiesError } = useSwr<PoliciesData>(
    `/api/states/`,
    fetcher
  );
  const { data: claimsData, error: claimsError } = useSwr<ClaimsData>(
    `/api/claims_database/`,
    fetcher
  );

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
  const [mapDataType, setMapDataType] = useState<MapDataType>(
    MapDataType.PoliciesCount
  );

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
      const policyData = policiesData && stateId && policiesData[stateId];
      const claimData = claimsData && stateId && claimsData[stateId];
      //console.log(data, stateId);
      if (policyData && claimData) {
        setCurrentState({
          policies: policyData,
          claims: claimData,
        });
      } else {
        setCurrentState(null);
      }
      setPopupData((preState) => {
        const newState = { ...preState };
        newState.show = true;
        newState.text = element.dataset.name;
        return newState;
      });
    } else {
      setCurrentState(null);
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

  const buckets = {
    0: "rgb(205, 252, 191)",
    1000: "rgb(174, 246, 157)",
    2000: "rgb(150, 238, 133)",
    3000: "rgb(114, 224, 106)",
    4000: "rgb(78, 207, 80)",
    5000: "rgb(39, 187, 54)",
    6000: "rgb(7, 167, 33)",
    7000: "rgb(0, 145, 18)",
    8000: "rgb(0, 124, 15)",
    9000: "rgb(0, 103, 15)",
    10000: "rgb(0, 83, 13)",
    20000: "rgb(0, 64, 10)",
    60000: "rgb(0, 48, 7)",
  };

  const assignColor = (numberOfPolicies: number) => {
    if (numberOfPolicies < 1000) {
      return buckets[0];
    } else if (numberOfPolicies < 2000) {
      return buckets[1000];
    } else if (numberOfPolicies < 3000) {
      return buckets[2000];
    } else if (numberOfPolicies < 4000) {
      return buckets[3000];
    } else if (numberOfPolicies < 5000) {
      return buckets[4000];
    } else if (numberOfPolicies < 6000) {
      return buckets[5000];
    } else if (numberOfPolicies < 7000) {
      return buckets[6000];
    } else if (numberOfPolicies < 8000) {
      return buckets[7000];
    } else if (numberOfPolicies < 9000) {
      return buckets[8000];
    } else if (numberOfPolicies < 10000) {
      return buckets[9000];
    } else if (numberOfPolicies < 20000) {
      return buckets[10000];
    } else if (numberOfPolicies < 60000) {
      return buckets[20000];
    } else {
      return buckets[60000];
    }
  };

  return (
    <div id="main-page">
      <Header dataType={mapDataType} setDataType={setMapDataType} />
      <section id="visual-data">
        <Map
          viewBox={`${mapViewBox.minX} ${mapViewBox.minY} ${mapViewBox.width} ${mapViewBox.height}`}
          mouseMove={onMouseMove}
          mouseOver={onMouseOver}
          svgRef={mapRef}
        >
          {states.map((s) => {
            const { style, ...allData } = s;
            let stateColor;
            if (policiesData && policiesData[s.id.toLowerCase()]) {
              stateColor = assignColor(
                policiesData[s.id.toLowerCase()].total_in_state
              );
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
        <section id="charts">
          <PolicyChart data={currentState && currentState.policies} />
          <ClaimChart data={currentState && currentState.claims} />
        </section>
      </section>
      <Popup
        x={popupData.x}
        y={popupData.y}
        text={popupData.text}
        show={popupData.show}
      />
    </div>
  );
}
