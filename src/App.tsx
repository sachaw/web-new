import { Component, Show, createSignal } from "solid-js";
import { Dashboard } from "@components/Layout/Dashboard/Index.jsx";
import { DeviceSelector } from "@components/Layout/DeviceSelector/index.jsx";
import { ThemeProvider } from "@core/Providers/ThemeProvider.jsx";
import { MessagesPage } from "./Pages/Messages.jsx";
import { ConnectionProvider } from "@core/Providers/ConnectionProvider.jsx";
import { DialogProvider } from "@core/Providers/DialogProvider.jsx";
import { MapPage } from "./Pages/Map.jsx";

export const App: Component = () => {
  const page: "messages" | "map" | "config" | "channels" | "peers" = "map";
  const device = true;
  return (
    <ConnectionProvider>
      <ThemeProvider>
        <DialogProvider>
          <div class="flex h-screen flex-col overflow-hidden bg-backgroundPrimary text-textPrimary">
            <div class="flex flex-grow">
              <DeviceSelector />
              <div class="flex flex-grow flex-col">
                <Show when={device} fallback={<Dashboard />}>
                  <div class="flex h-screen">
                    {/*
                    <CommandPalette />
                    <PageRouter /> */}
                    {/* {page === "messages" && <MessagesPage />} */}
                    {page === "map" && <MapPage />}
                    {/* {page === "config" && <ConfigPage />}
                  {page === "channels" && <ChannelsPage />}
                  {page === "peers" && <PeersPage />} */}
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </DialogProvider>
      </ThemeProvider>
    </ConnectionProvider>
  );
};
