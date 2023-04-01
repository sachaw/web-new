import maplibre, { SourceSpecification, Viewport } from "maplibre-gl";
import {
  ZoomInIcon,
  ZoomOutIcon,
  BoxSelectIcon,
  MapPinIcon,
  EyeOffIcon,
} from "lucide-solid";
import { bbox, lineString } from "@turf/turf";
// import MapGL, { Viewport } from "solid-map-gl";
import { cn } from "@core/Utils/cn.js";
import {
  Component,
  For,
  createEffect,
  createSignal,
  createUniqueId,
} from "solid-js";
import { Sidebar } from "@components/Layout/Sidebar/index.jsx";
import { SidebarSection } from "@components/Layout/Sidebar/SidebarSection.jsx";
import { SidebarButton } from "@components/Layout/Sidebar/SidebarButton.jsx";
import { PageLayout } from "@components/Layout/PageLayout/Index.jsx";
import { Button } from "@ui/Button.jsx";
import { FileAPISource, PMTiles, Protocol } from "pmtiles";
import { Tmp } from "../Tmp.js";
import { MapGL, useMap } from "@components/Map/MapGL.jsx";
import { ScaleControl } from "@components/Map/ScaleControl.jsx";
import { Source } from "@components/Map/Source.jsx";
import { Layer } from "@components/Map/Layer.jsx";

export interface MapPageProps {
  mapContainer: HTMLDivElement;
}

export const MapPage: Component<MapPageProps> = (props) => {
  const map = useMap();
  const [wmsSources, setWmsSources] = createSignal<SourceSpecification[]>([
    // {
    //   type: "raster",
    //   tiles: [
    //     "https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015",
    //   ],
    //   tileSize: 256,
    // },
    // {
    //   type: "raster",
    //   tiles: ["http://geology.data.nt.gov.au/geoserver/wms"],
    // },
  ]);

  createEffect(() => {
    if (map()) {
      wmsSources().forEach((source, index) => {
        // map()?.addSource(`wmsSource-${index}`, source);
        map()?.addLayer({
          id: `wmsLayer-${index}`,
          type: "raster",
          source: `wmsSource-${index}`,
          layout: {
            visibility: "visible",
          },
        });
      });
    }
  });

  // const [viewport, setViewport] = createSignal<Viewport>({

  //   center: [-122.45, 37.78],`
  //   zoom: 11,
  // });

  //   const allNodes = Array.from(nodes.values());

  //   const getBBox = () => {
  //     const nodesWithPosition = allNodes.filter(
  //       (node) => node.position?.latitudeI
  //     );
  //     if (!nodesWithPosition.length) return;
  //     const line = lineString(
  //       nodesWithPosition.map((n) => [
  //         (n.position?.latitudeI ?? 0) / 1e7,
  //         (n.position?.longitudeI ?? 0) / 1e7
  //       ])
  //     );
  //     const bounds = bbox(line);
  //     const center = map?.cameraForBounds(
  //       [
  //         [bounds[1], bounds[0]],
  //         [bounds[3], bounds[2]]
  //       ],
  //       { padding: { top: 10, bottom: 10, left: 10, right: 10 } }
  //     );
  //     if (center) map?.easeTo(center);
  //     else if (nodesWithPosition.length === 1)
  //       map?.easeTo({
  //         zoom: 12,
  //         center: [
  //           (nodesWithPosition[0].position?.longitudeI ?? 0) / 1e7,
  //           (nodesWithPosition[0].position?.latitudeI ?? 0) / 1e7
  //         ]
  //       });
  //   };

  //   useEffect(() => {
  //     map?.on("zoom", () => {
  //       setZoom(map?.getZoom() ?? 0);
  //     });
  //   }, [map, zoom]);

  return (
    <>
      <Sidebar>
        <SidebarSection label="Sources">
          {wmsSources().map((source, index) => (
            <SidebarButton
              active={true}
              onClick={() => {
                const state =
                  map().getLayoutProperty(`wmsLayer-${index}`, "visibility") ===
                  "visible";
                map().setLayoutProperty(
                  `wmsLayer-${index}`,
                  "visibility",
                  state ? "none" : "visible",
                );
              }}
              label={source.type}
              icon={EyeOffIcon}
            />
          ))}
        </SidebarSection>
      </Sidebar>
      <PageLayout
        label="Map"
        noPadding
        actions={[
          {
            icon: ZoomInIcon,
            onClick() {
              map()?.zoomIn();
            },
          },
          {
            icon: ZoomOutIcon,
            onClick() {
              map()?.zoomOut();
            },
          },
          {
            icon: BoxSelectIcon,
            onClick() {
              //   getBBox();
            },
          },
        ]}
      >
        <section>
          <Tmp />
          {props.mapContainer}
          <ScaleControl />
          <For each={wmsSources()}>
            {(source, index) => (
              <Source id={`wmsSource-${index}`} source={source} />
            )}
          </For>
          {/* <ScaleControl />
            <NavigationControl options={{ showCompass: false }} />

            <Source
              source={{
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      geometry: {
                        type: "Point",
                        coordinates: [-76.53063297271729, 39.18174077994108],
                      },
                    },
                  ],
                },
              }}
            >
              <Layer
                layer={{
                  type: "circle",
                  paint: {
                    "circle-color": "#ff0000",
                    "circle-radius": 4,
                    "circle-stroke-color": "#ffffff",
                    "circle-stroke-width": 1,
                  },
                }}
              />
            </Source>
            <Marker position={[-76.53063297271729, 39.18174077994108]} />
            <Popup
              anchor="top"
              offset={12}
              closeOnMove={false}
              closeOnClick={false}
              closeButton={false}
              position={[-76.53063297271729, 39.18174077994108]}
              content="Popup"
            /> */}
        </section>
        {/* <div class="z-10">
          <MapGL
            mapLib={maplibre}
            options={{
              style:
                "https://raw.githubusercontent.com/hc-oss/maplibre-gl-styles/master/styles/osm-mapnik/v8/default.json",
            }}
            viewport={viewport()}
            onViewportChange={(evt: Viewport) => setViewport(evt)}
            
          ><Tmp /></MapGL>
        </div> */}
      </PageLayout>
    </>
  );
};
