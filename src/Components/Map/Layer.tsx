import * as maplibre from "maplibre-gl";
import { onCleanup, createUniqueId, splitProps, createMemo } from "solid-js";

import { useSource } from "./Source.jsx";
import { useMap, useMapEffect } from "./MapGL.jsx";

export type LayerProps = {
  id?: string;
  layer: Omit<maplibre.CircleLayerSpecification, "id" | "source">;
} & LayerEvents;

type LayerEvents = Partial<{
  [P in keyof maplibre.MapLayerEventType as `on${P}`]: (
    e: maplibre.MapLayerEventType[P],
  ) => void;
}>;

export function Layer(initial: LayerProps) {
  const [props, events] = splitProps(initial, ["id", "layer"]);
  const id = createMemo(() => props.id ?? createUniqueId());
  const sourceId = useSource();

  useMapEffect((map) => {
    if (!sourceId || map.getLayer(id())) return;

    map.addLayer({
      ...props.layer,
      id: id(),
      source: sourceId,
    });
  });

  useMapEffect((map) => {
    if (!map.getLayer(id())) return;

    for (const [k, v] of Object.entries(props.layer.paint ?? {})) {
      const old = map.getPaintProperty(id(), k);
      if (!deepEqual(old, v)) {
        map.setPaintProperty(id(), k, v);
      }
    }

    const oldFilter = map.getFilter(id());
    if (!deepEqual(oldFilter, props.layer.filter)) {
      map.setFilter(id(), props.layer.filter);
    }
  });

  useMapEffect((map) => {
    for (const [key, handler] of Object.entries(events)) {
      if (!key.startsWith("on")) continue;

      const name = key.slice(2).toLowerCase();
      map.on(name as never, id(), handler as never);
      onCleanup(() => map.off(name as never, id(), handler));
    }
  });

  onCleanup(
    () => useMap()?.()?.getLayer(id()) && useMap()?.()?.removeLayer(id()),
  );

  return <></>;
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (typeof a !== typeof b) return false;

  if (
    typeof a === "object" &&
    typeof b === "object" &&
    a !== null &&
    b !== null
  ) {
    for (const key in a) {
      if (!(key in b)) return false;

      if (
        !deepEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
        )
      )
        return false;
    }
    for (const key in b) {
      if (!(key in a)) return false;

      if (
        !deepEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
        )
      )
        return false;
    }
    return true;
  }

  return a === b;
}
