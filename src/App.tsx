import { Component, Show, createSignal } from "solid-js";
import { Dashboard } from "@components/Layout/Dashboard/Index.jsx";
import { Test } from "./Test.jsx";
import { UI } from "./Pages/UI.jsx";
import { DeviceSelector } from "@components/Layout/DeviceSelector/index.jsx";
import { ThemeProvider } from "@core/Providers/ThemeProvider.jsx";
import { MessagesPage } from "./Pages/Messages.jsx";
import { ConnectionProvider } from "@core/Data/ConnectionProvider.jsx";
import { NewDeviceDialog } from "@components/Dialog/NewDeviceDialog.jsx";

export const App: Component = () => {
  const page: "messages" | "map" | "config" | "channels" | "peers" = "messages";
  const [connectDialogOpen, setConnectDialogOpen] = createSignal(true);
  const device = false;
  return (
    <ConnectionProvider>
      <ThemeProvider>
        <NewDeviceDialog
          isOpen={connectDialogOpen()}
          onOpenChange={(open) => {
            setConnectDialogOpen(open);
          }}
          // open={connectDialogOpen}
          // onOpenChange={(open) => {
          //   setConnectDialogOpen(open);
          // }}
        />
        <div class="flex h-screen flex-col overflow-hidden bg-backgroundPrimary text-textPrimary">
          <div class="flex flex-grow">
            <DeviceSelector />
            <div class="flex flex-grow flex-col">
              <Show when={device} fallback={<Dashboard />}>
                <div class="flex h-screen">
                  <Test />
                  {/* <DialogManager />
                    <CommandPalette />
                    <PageRouter /> */}
                  {page === "messages" && <MessagesPage />}
                  {/* {page === "map" && <MapPage />}
                  {page === "config" && <ConfigPage />}
                  {page === "channels" && <ChannelsPage />}
                  {page === "peers" && <PeersPage />} */}
                </div>
              </Show>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ConnectionProvider>
  );
};
