import { Component, Match, Show, Switch, createSignal } from "solid-js";
import { Dashboard } from "@components/Layout/Dashboard/Index.jsx";
import { DeviceSelector } from "@components/Layout/DeviceSelector/index.jsx";
import { MessagesPage } from "./Pages/Messages.jsx";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapWrapper } from "./Pages/Map/MapWrapper.jsx";
import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import { attachDevtoolsOverlay } from "@solid-devtools/overlay";
import { ChannelsPage } from "./Pages/Channels/index.jsx";
import { PeersPage } from "./Pages/Peers.jsx";

export const App: Component = () => {
  const { activeDevice } = useDevice();
  attachDevtoolsOverlay();

  return (
    <div class="flex h-screen flex-col overflow-hidden bg-slate-950 text-textPrimary">
      <div class="flex flex-grow">
        <DeviceSelector />
        <div class="flex flex-grow flex-col bg-slate-900">
          <Show when={activeDevice()} fallback={<Dashboard />}>
            <div class="flex h-screen">
              <Switch>
                <Match when={activeDevice()?.UI.activePage === "messages"}>
                  <MessagesPage />
                </Match>
                <Match when={activeDevice()?.UI.activePage === "map"}>
                  <MapWrapper />
                </Match>
                <Match when={activeDevice()?.UI.activePage === "config"}>
                  {/* <ConfigPage /> */}
                </Match>
                <Match when={activeDevice()?.UI.activePage === "channels"}>
                  <ChannelsPage />
                </Match>
                <Match when={activeDevice()?.UI.activePage === "peers"}>
                  <PeersPage />
                </Match>
              </Switch>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};
