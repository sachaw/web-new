import * as maplibre from "maplibre-gl";
import {
  createContext,
  JSXElement,
  onCleanup,
  useContext,
  createUniqueId,
  createMemo,
} from "solid-js";
import { useMap, useMapEffect } from "./MapGL.jsx";

export interface SourceProps {
  id?: string;
  source: maplibre.SourceSpecification;
  children?: JSXElement;
}

export const SourceIdContext = createContext<string | undefined>();

export const useSource = () => useContext(SourceIdContext);

export function Source(props: SourceProps) {
  const id = createMemo(() => props.id ?? createUniqueId());

  useMapEffect((map) => {
    if (!map.getSource(id())) {
      map.addSource(id(), props.source);
    }
  });

  onCleanup(
    () => useMap()?.()?.getSource(id()) && useMap()?.()?.removeSource(id()),
  );

  return (
    <SourceIdContext.Provider value={id()}>
      {props.children}
    </SourceIdContext.Provider>
  );
}
