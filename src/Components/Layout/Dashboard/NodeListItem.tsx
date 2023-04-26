import { Hashicon } from "@components/Hashicon.jsx";
import { useConnection } from "@core/Providers/ConnectionProvider.jsx";
import { DeviceState } from "@core/Providers/DeviceProvider.jsx";
import {
  BluetoothIcon,
  UsbIcon,
  WifiHighIcon,
  CaretRightIcon,
  UsersIcon,
} from "solid-phosphor/regular";
import { base16 } from "rfc4648";
import { Component, Match, Switch, createMemo } from "solid-js";

export interface NodeListItemProps {
  device: DeviceState;
}

export const NodeListItem: Component<NodeListItemProps> = (props) => {
  const { connections } = useConnection();

  const connection = createMemo(() =>
    connections.find((conn) => conn.nodeNum === props.device.nodeNum),
  );
  const node = createMemo(() =>
    props.device.nodes.find((node) => node.num === props.device.nodeNum),
  );

  return (
    <div class="flex gap-3 w-full pt-3">
      <div class="h-14 aspect-square bg-slate-800 rounded-md shadow-highlight p-2.5">
        <Hashicon hash={props.device.nodeNum} />
      </div>
      <div>
        <div class="flex gap-2">
          <div class="my-auto rounded-full bg-green-700 w-5 aspect-square flex bg-opacity-50">
            <div class="m-auto w-3 aspect-square rounded-full bg-green-500" />
          </div>
          <div class="flex gap-1">
            <span class="m-auto text-sm font-medium">
              {node()?.user?.longName ?? "UNK"}
            </span>
            <span class="m-auto text-slate-500 text-lg">/</span>
            <span class="my-auto text-sm font-medium">
              {base16
                .stringify(node()?.user?.macaddr ?? [])
                .match(/.{1,2}/g)
                ?.join(":") ?? "UNK"}
            </span>
          </div>
        </div>
        <div class="flex gap-2">
          <div class="mt-1 flex bg-accent-900 text-slate-200 rounded-md shadow-highlight gap-1 px-1">
            <Switch>
              <Match when={connection()?.connection?.connType === "ble"}>
                <>
                  <BluetoothIcon class="p-1" />
                  <span class="m-auto">BLE</span>
                </>
              </Match>
              <Match when={connection()?.connection?.connType === "serial"}>
                <>
                  <UsbIcon class="p-1" />
                  <span class="m-auto">Serial</span>
                </>
              </Match>
              <Match when={connection()?.connection?.connType === "http"}>
                <>
                  <WifiHighIcon class="p-1" />
                  <span class="m-auto">Network</span>
                </>
              </Match>
            </Switch>
          </div>
          <div class="mt-1 flex bg-accent-900 text-slate-200 rounded-md shadow-highlight gap-1 px-1">
            <UsersIcon class="p-1" />
            {props.device.nodes.length === 0
              ? 0
              : props.device.nodes.length ?? 1 - 1}
          </div>
        </div>
      </div>
      <div class="my-auto ml-auto">
        <CaretRightIcon class="text-slate-500" />
      </div>
    </div>
  );
};
