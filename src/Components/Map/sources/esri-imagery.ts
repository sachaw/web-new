import { StyleSpecification } from "maplibre-gl";

export const ESRI_Imagery: StyleSpecification = {
  version: 8,
  sources: {
    mapTiles: {
      type: "raster",
      minzoom: 0,
      maxzoom: 22,
      tileSize: 256,
      tiles: [
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
      ],
      attribution:
        "Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community",
    },
  },
  layers: [
    {
      id: "tiles",
      type: "raster",
      source: "mapTiles",
    },
  ],
};
