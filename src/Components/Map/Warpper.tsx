import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  CornersOutIcon,
} from "solid-phosphor/regular";
import {} from "solid-phosphor/regular";
import { Component, JSXElement } from "solid-js";
import { useMap } from "./MapGL.jsx";

export interface MapWrapperProps {
  children: JSXElement;
}

export const MapWrapper: Component<MapWrapperProps> = (props) => {
  const map = useMap();

  return (
    <div class="w-2/3 h-full">
      <div class="h-8 flex font-mono">
        <div class="my-auto">Map</div>
        <div class="flex ml-auto mx-3">
          <button
            onClick={() => map()?.zoomIn()}
            type="button"
            class="transition-all hover:text-accent-500 hover:bg-gray-900 px-2"
          >
            <MagnifyingGlassPlusIcon class="h-5 w-5" />
          </button>
          <button
            onClick={() => map()?.zoomOut()}
            type="button"
            class="transition-all hover:text-accent-500 hover:bg-gray-900 px-2"
          >
            <MagnifyingGlassMinusIcon class="h-5 w-5" />
          </button>
          <button
            type="button"
            class="transition-all hover:text-accent-500 hover:bg-gray-900 px-2"
          >
            <CornersOutIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
      {props.children}
    </div>
  );
};
