import { Button } from "@ui/Button.jsx";
import { FileAPISource, PMTiles, Protocol } from "pmtiles";
import MapLibre, { LayerSpecification } from "maplibre-gl";
import { Component, For, createEffect, createSignal } from "solid-js";
import { useMap } from "@components/Map/MapGL.jsx";
import { Source } from "@components/Map/Source.jsx";
import { Layer } from "@components/Map/Layer.jsx";

export interface TileJson {
  tilejson: "3.0.0";
  name?: string;
  description?: string;
  version?: "1.0.0";
  attribution?: string;
  scheme?: "xyz";
  tiles: string[];
  minzoom?: number;
  maxzoom?: number;
  bounds?: [number, number, number, number];
  center?: [number, number, number];
  data?: string[];
  fillzoom?: number;
  grids?: string[];
  legend?: string;
  template?: string;
  geometrytype?: string;
  vector_layers: {
    id: string;
    fields: { [key: string]: string };
    description?: string;
    minzoom?: number;
    maxzoom?: number;
  }[];
}

export const Tmp: Component = () => {
  const [fileHandles, setFileHandles] = createSignal<FileSystemFileHandle[]>();

  const [metadata, setMetadata] = createSignal<TileJson>();

  const protocol = new Protocol();
  const map = useMap();
  MapLibre.addProtocol("pmtiles", protocol.tile);

  createEffect(() => {
    fileHandles()?.forEach((fileHandle) => {
      fileHandle?.getFile().then((file) => {
        const mapFile = new PMTiles(new FileAPISource(file));
        protocol.add(mapFile);
        mapFile.getMetadata().then((data) => setMetadata(data));

        // map()?.addSource("pmtiles", {
        //   type: "vector",
        //   tiles: [`pmtiles://${file.name}`],
        // });

        map()?.setStyle({
          version: 8,
          sources: {
            [file.name.split(".")[0]]: {
              type: "vector",
              url: `pmtiles://${file.name}`,
            },
          },
          layers: [
            // ...(metadata()?.vector_layers
            //   ? metadata().vector_layers.map<LayerSpecification>((layer) => {
            //       return {
            //         id: `${layer.id}-${file.name.split(".")[0]}`,
            //         type: "fill",
            //         source: file.name.split(".")[0],
            //         "source-layer": layer.id,
            //         paint: {
            //           "fill-color": "steelblue",
            //         },
            //       };
            //     })
            //   : []),
            {
              id: `earth-${file.name.split(".")[0]}`,
              source: file.name.split(".")[0],
              "source-layer": "earth",
              type: "fill",
              paint: {
                "fill-color": "green",
              },
            },

            {
              id: `buildings-${file.name.split(".")[0]}`,
              source: file.name.split(".")[0],
              "source-layer": "landuse",
              type: "fill",
              paint: {
                "fill-color": "steelblue",
              },
            },
            {
              id: `roads-${file.name.split(".")[0]}`,
              source: file.name.split(".")[0],
              "source-layer": "roads",
              type: "line",
              paint: {
                "line-color": "black",
              },
            },
            {
              id: `mask-${file.name.split(".")[0]}`,
              source: file.name.split(".")[0],
              "source-layer": "mask",
              type: "fill",
              paint: {
                "fill-color": "white",
              },
            },
          ],
        });
      });
    });
  });

  return (
    <div>
      <For each={fileHandles()}>
        {(handle) => (
          <>
            <Source
              source={{
                type: "vector",
                tiles: [`pmtiles://${handle.name}`],
              }}
            />
            <p>{metadata()?.name}</p>
            <div class="flex gap-2">
              {metadata()?.vector_layers.map((layer) => (
                <div class="bg-gray-700 p-2 rounded-md">{layer.id}</div>
              ))}
            </div>
          </>
        )}
      </For>
      <Button
        onClick={async () => {
          await window
            .showOpenFilePicker({
              types: [
                {
                  description: "PMTiles",
                  accept: {
                    "application/x-pmtiles": [".pmtiles"],
                  },
                },
              ],
              multiple: true,
            })
            .then((handles) => setFileHandles(handles));
        }}
      >
        FS Access
      </Button>

      {/* {map()
        ?.getStyle()
        .layers.map((layer) => (
          <div class="bg-gray-700 p-2 rounded-md">{layer.id}</div>
        ))} */}
    </div>
  );
};
