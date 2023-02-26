import type { Component } from 'solid-js';
import { Dashboard } from './Components/Dashboard.jsx';

export const App: Component = () => {
  const device = false;
  return (
    <div class="flex h-screen flex-col overflow-hidden bg-backgroundPrimary text-textPrimary">
            <div class="flex flex-grow">
              {/* <DeviceSelector /> */}
              <div class="flex flex-grow flex-col">
                {device ? (
                  <div class="flex h-screen">
                    {/* <DialogManager />
                    <CommandPalette />
                    <PageRouter /> */}
                  </div>
                ) : (
                  <Dashboard />
                )}
              </div>
            </div>
          </div>
  );
};

