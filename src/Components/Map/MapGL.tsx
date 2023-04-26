import { MapEventType, MapOptions, Map as MapLibreMap } from "maplibre-gl";
import {
  createContext,
  createSignal,
  JSX,
  onCleanup,
  onMount,
  useContext,
  Accessor,
  mergeProps,
  createEffect,
  splitProps,
  createMemo,
} from "solid-js";

export const MapContext = createContext<Accessor<MapLibreMap>>()!;

export const useMap = () => useContext(MapContext);

export const useMapEffect = (f: (map: MapLibreMap) => void) =>
  createEffect(() => {
    const map = useMap()?.();
    map && f(map);
  });

export type MapGLProps = {
  style?: JSX.CSSProperties;
  cursor?: string;
  options?: Partial<Omit<MapOptions, "container">>;
  children: (container: HTMLDivElement) => JSXElement;
} & MapEvents;

type MapEvents = Partial<{
  [P in keyof MapEventType as `on${P}`]: (e: MapEventType[P]) => void;
}>;

const defaultProps: Partial<MapGLProps> = {
  style: { position: "relative", width: "100%", height: "100%" },
};

export function MapGL(initial: MapGLProps) {
  const mergedProps = mergeProps(defaultProps, initial);
  const [props, events] = splitProps(mergedProps, [
    "style",
    "cursor",
    "options",
    "children",
  ]);
  const container = (<div style={props.style} />) as HTMLDivElement;
  const [map, setMap] = createSignal<MapLibreMap>();

  onMount(() => {
    const map = new MapLibreMap({
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      ...props.options,
      container,
    });

    map.once("load", () => setMap(map));
  });

  const interactive = createMemo(
    () =>
      typeof props.options?.interactive === "undefined" ||
      props.options.interactive,
  );
  createEffect(() => {
    const canvas = map()?.getCanvas();
    if (canvas)
      canvas.style.cursor = props.cursor ?? interactive() ? "grab" : "auto";
  });

  createEffect(() => {
    const m = map();
    if (!m) return;

    for (const [key, handler] of Object.entries(events)) {
      if (!key.startsWith("on")) continue;

      const name = key.slice(2).toLowerCase();
      m.on(name as never, handler as never);
      onCleanup(() => m.off(name as never, handler));
    }
  });

  onCleanup(() => map()?.remove());

  return (
    <MapContext.Provider value={map}>
      {props.children(container)}
    </MapContext.Provider>
  );
}
