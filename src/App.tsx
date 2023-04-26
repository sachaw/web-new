import { Component, Match, Show, Switch, createSignal } from "solid-js";
import { Dashboard } from "@components/Layout/Dashboard/Index.jsx";
import { DeviceSelector } from "@components/Layout/DeviceSelector/index.jsx";
import { MessagesPage } from "./Pages/Messages.jsx";
import "maplibre-gl/dist/maplibre-gl.css";
import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import { ChannelsPage } from "./Pages/Channels/index.jsx";
import { PeersPage } from "./Pages/Peers.jsx";
import { MapGL } from "@components/Map/MapGL.jsx";
import { Statusbar } from "@components/Layout/Statusbar/index.jsx";
import { Topbar } from "@components/Layout/Topbar/index.jsx";
import { MapWrapper } from "@components/Map/Warpper.jsx";
import { ESRI_Imagery } from "@components/Map/sources/esri:imagery.js";
import { ESRI_ImageryHybrid } from "@components/Map/sources/esri:imagery-hybrid.js";

export const App: Component = () => {
  const { activeDevice } = useDevice();

  return (
    <div class="flex flex-col h-screen overflow-hidden bg-slate-950 dark:text-gray-100">
      <Topbar />
      <div class="flex h-full">
        <DeviceSelector />
        <div class="flex flex-grow flex-col">
          <Show when={activeDevice()} fallback={<Dashboard />}>
            <div class="flex h-full gap-2 mb-8">
              <MapGL
                options={{
                  style: ESRI_ImageryHybrid,
                  center: [-76.53063297271729, 39.18174077994108],
                  zoom: 10,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {(container) => (
                  <>
                    <Switch>
                      <Match
                        when={activeDevice()?.UI.activePage === "messages"}
                      >
                        <MessagesPage />
                      </Match>
                      <Match when={activeDevice()?.UI.activePage === "config"}>
                        {/* <ConfigPage /> */}
                      </Match>
                      <Match
                        when={activeDevice()?.UI.activePage === "channels"}
                      >
                        <ChannelsPage />
                      </Match>
                      <Match when={activeDevice()?.UI.activePage === "peers"}>
                        <PeersPage />
                      </Match>
                    </Switch>
                    <MapWrapper>{container}</MapWrapper>
                  </>
                )}
              </MapGL>
            </div>
          </Show>
        </div>
      </div>
      <Statusbar />
    </div>
  );
};
