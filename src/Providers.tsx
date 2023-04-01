import { ConnectionProvider } from "@core/Providers/ConnectionProvider.jsx";
import { DeviceProvider } from "@core/Providers/DeviceProvider.jsx";
import { DialogProvider } from "@core/Providers/DialogProvider.jsx";
import { ThemeProvider } from "@core/Providers/ThemeProvider.jsx";
import { Component } from "solid-js";
import { App } from "./App.jsx";

export const Providers: Component = () => {
  return (
    <DeviceProvider>
      <ConnectionProvider>
        <ThemeProvider>
          <DialogProvider>
            <App />
          </DialogProvider>
        </ThemeProvider>
      </ConnectionProvider>
    </DeviceProvider>
  );
};
