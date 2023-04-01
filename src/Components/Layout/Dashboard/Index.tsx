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
import { For, Show, createMemo } from "solid-js";
import { useDialog } from "@core/Providers/DialogProvider.jsx";
import { Input } from "@ui/Input.jsx";
import { useConnection } from "@core/Providers/ConnectionProvider.jsx";
import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import { NodeListItem } from "./NodeListItem.jsx";
import { Separator } from "@ui/Separator.jsx";

export const Dashboard = () => {
  const { setDialog } = useDialog();
  const { connections } = useConnection();
  const { devices } = useDevice();

  return (
    <div class="flex flex-col gap-3 p-3">
      <div class="h-[450px] p-3">
        <Show
          when={connections.length}
          fallback={
            <div class="flex flex-col">
              <div class="flex items-center justify-between">
                <div class="space-y-1">
                  <H3>Connected Devices</H3>
                  <Subtle>Manage, connect and disconnect devices</Subtle>
                </div>
              </div>
              <div class="m-auto flex flex-col gap-3 text-center">
                <ListPlusIcon size={48} class="mx-auto text-textSecondary" />
                <H3>No Devices</H3>
                <Subtle>Connect atleast one device to get started</Subtle>
                <Input />
                <Button
                  class="gap-2"
                  onClick={() => setDialog("newDevice", true)}
                >
                  <PlusIcon size={16} />
                  New Connection
                </Button>
              </div>
            </div>
          }
        >
          <div class="font-medium">Devices</div>
          <div class="gap-3 flex flex-col divide-y divide-slate-800">
            <For each={devices}>
              {(device, index) => <NodeListItem device={device} />}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
};
