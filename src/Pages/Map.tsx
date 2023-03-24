import maplibre from "maplibre-gl";
import {
  ZoomInIcon,
  ZoomOutIcon,
  BoxSelectIcon,
  MapPinIcon,
} from "lucide-solid";
import { bbox, lineString } from "@turf/turf";
import MapGL, { Viewport } from "solid-map-gl";
import { cn } from "@core/Utils/cn.js";
import { Component, createSignal } from "solid-js";
import { Sidebar } from "@components/Layout/Sidebar/index.jsx";
import { SidebarSection } from "@components/Layout/Sidebar/SidebarSection.jsx";
import { SidebarButton } from "@components/Layout/Sidebar/SidebarButton.jsx";
import { PageLayout } from "@components/Layout/PageLayout/Index.jsx";

export const MapPage: Component = () => {
  const [viewport, setViewport] = createSignal<Viewport>({
    center: [-122.45, 37.78],
    zoom: 11,
  });

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
          {/* {rasterSources.map((source, index) => (
            <SidebarButton label={source.title} />
          ))} */}
        </SidebarSection>
      </Sidebar>
      <PageLayout
        label="Map"
        noPadding
        actions={[
          {
            icon: ZoomInIcon,
            onClick() {
              //   map?.zoomIn();
            },
          },
          {
            icon: ZoomOutIcon,
            onClick() {
              //   map?.zoomOut();
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
        <div class="z-10">
          <MapGL
            mapLib={maplibre}
            options={{
              style:
                "https://raw.githubusercontent.com/hc-oss/maplibre-gl-styles/master/styles/osm-mapnik/v8/default.json",
            }}
            viewport={viewport()}
            onViewportChange={(evt: Viewport) => setViewport(evt)}
          />
        </div>
      </PageLayout>
    </>
  );
};
