import {
  ScaleControl as MapLibreScaleControl,
  ScaleOptions,
} from "maplibre-gl";
import { Component, JSX, onCleanup, splitProps } from "solid-js";
import { useMap, useMapEffect } from "./MapGL.js";

export const ScaleControl: Component<ScaleOptions> = (props) => {
  const control = new MapLibreScaleControl(props);
  const map = useMap();
  useMapEffect((map) => {
    map.addControl(control);
  });

  onCleanup(() => {
    if (control && map && map().hasControl(control)) {
      map().removeControl(control);
    }
  });

  return <></>;
};
