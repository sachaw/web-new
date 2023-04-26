import {
  BatteryChargingIcon,
  HexagonIcon,
  UsbIcon,
  MapPinIcon,
  GitBranchIcon,
} from "solid-phosphor/regular";
import { Component } from "solid-js";
import { StatusbarStat } from "./StatusbarStat.jsx";

export const Statusbar: Component = () => {
  return (
    <div class="h-8 w-full flex">
      <div class="flex gap-1 px-2 hover:bg-gray-900 shrink-0">
        <span class="h-3 w-3 rounded-full bg-green-500 my-auto" />
        <span class="flex my-auto text-sm text-gray-400 font-mono tracking-tight">
          Meshtastic d193 (<UsbIcon class="h-3 w-3 my-auto" />)
        </span>
      </div>
      <StatusbarStat icon={BatteryChargingIcon} value="Powered" />
      <StatusbarStat icon={HexagonIcon} value="4 Peers" />
      <StatusbarStat icon={MapPinIcon} value="No Fix" />
      <span class="w-full" />
      <StatusbarStat
        icon={GitBranchIcon}
        value={process.env.COMMIT_HASH ?? "Development"}
      />
    </div>
  );
};
