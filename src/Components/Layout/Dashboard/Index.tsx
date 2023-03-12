import { Button } from "@ui/Button.jsx";
import {
  PlusIcon,
  ListPlusIcon,
  UsersIcon,
  MapPinIcon,
  CalendarIcon,
  BluetoothIcon,
  UsbIcon,
  NetworkIcon,
} from "lucide-solid";
import { Subtle } from "@ui/Typography/Subtle.js";
import { H3 } from "@ui/Typography/H3.jsx";
import { Separator } from "@ui/Separator.jsx";
import { Show, createSignal } from "solid-js";

export const Dashboard = () => {
  interface Device {
    id: number;
    name: string;
    hardware: {
      myNodeNum: number;
    };
    nodes: Map<
      number,
      {
        user: {
          longName: string;
        };
      }
    >;
    connection: {
      connType: "ble" | "serial" | "http";
    };
  }

  const devices: Device[] = [];
  const [connectDialogOpen, setConnectDialogOpen] = createSignal(false);

  return (
    <div class="flex flex-col gap-3 p-3">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <H3>Connected Devices</H3>
          <Subtle>Manage, connect and disconnect devices</Subtle>
        </div>
      </div>

      <Separator orientation="horizontal" />

      <div class="flex h-[450px] rounded-md border border-dashed border-slate-200 p-3 dark:border-slate-700">
        <Show
          when={devices.length}
          fallback={
            <div class="m-auto flex flex-col gap-3 text-center">
              <ListPlusIcon size={48} class="mx-auto text-textSecondary" />
              <H3>No Devices</H3>
              <Subtle>Connect atleast one device to get started</Subtle>
              <Button class="gap-2" onClick={() => setConnectDialogOpen(true)}>
                <PlusIcon size={16} />
                New Connection
              </Button>
            </div>
          }
        >
          <ul role="list" class="grow divide-y divide-gray-200">
            {devices.map((device) => {
              return (
                <li>
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="truncate text-sm font-medium text-accent">
                        {device.nodes.get(device.hardware.myNodeNum)?.user
                          ?.longName ?? "UNK"}
                      </p>
                      <div class="inline-flex w-24 justify-center gap-2 rounded-full bg-slate-100 py-1 text-xs font-semibold text-slate-900 transition-colors hover:bg-slate-700 hover:text-slate-50">
                        {device.connection?.connType === "ble" && (
                          <>
                            <BluetoothIcon size={16} />
                            BLE
                          </>
                        )}
                        {device.connection?.connType === "serial" && (
                          <>
                            <UsbIcon size={16} />
                            Serial
                          </>
                        )}
                        {device.connection?.connType === "http" && (
                          <>
                            <NetworkIcon size={16} />
                            Network
                          </>
                        )}
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="flex gap-2 text-sm text-gray-500">
                        <UsersIcon
                          size={20}
                          class="text-gray-400"
                          aria-hidden="true"
                        />
                        {device.nodes.size === 0 ? 0 : device.nodes.size - 1}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Show>
      </div>
    </div>
  );
};
