import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Map from "../components/map";
import statesFile from "../data/states";
import State, { StateType } from "../components/state";

const states: StateType[] = statesFile;

export default function Home() {
  return (
    <>
      <div id="details-box"></div>
      <Map>
        {states.map((s) => (
          <State key={s.id} {...s} />
        ))}
      </Map>
    </>
  );
}
