import { Component, JSX } from "solid-js";
import { MapPage } from "./index.jsx";
import { MapGL } from "@components/Map/MapGL.jsx";

export const MapWrapper: Component = () => (
  <MapGL
    options={{
      style: "https://demotiles.maplibre.org/style.json",
      center: [-76.53063297271729, 39.18174077994108],
      zoom: 13,
    }}
    style={{
      width: "100%",
      "aspect-ratio": "calc(16/9)",
    }}
  >
    {(container) => <MapPage mapContainer={container} />}
  </MapGL>
);
