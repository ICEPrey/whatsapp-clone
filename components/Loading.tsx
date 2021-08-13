/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      center: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

function Loading() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#c81d1d");
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <SyncLoader color={color} loading={loading} size={20} />
      </div>
    </center>
  );
}

export default Loading;
