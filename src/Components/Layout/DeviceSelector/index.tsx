import {
  PlusIcon,
  HomeIcon,
  LanguagesIcon,
  SunIcon,
  MoonIcon,
  TerminalIcon,
} from "lucide-solid";
// import { Code } from "@components/UI/Typography/Code.js";
// import { DeviceSelectorButton } from "./DeviceSelectorButton.js";
import { Hashicon } from "@components/Hashicon.jsx";
import { Separator } from "@ui/Separator.jsx";
import { Component, Show, createSignal } from "solid-js";
import { DeviceSelectorButton } from "@components/Layout/DeviceSelector/DeviceSelectorButton.jsx";
import { Code } from "@ui/Typography/Code.jsx";
import { useTheme } from "@core/Providers/ThemeProvider.jsx";

export const DeviceSelector: Component = () => {
  const [selectedDevice, setSelectedDevice] = createSignal(0);
  const [connectDialogOpen, setConnectDialogOpen] = createSignal(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = createSignal(false);

  const [theme, setTheme] = useTheme();

  const getDevices = () => {
    return [
      {
        id: 1,
        name: "MyNode",
        hardware: {
          myNodeNum: 1,
        },
      },
      {
        id: 2,
        name: "MyNode 2",
        hardware: {
          myNodeNum: 2,
        },
      },
      {
        id: 3,
        name: "MyNode 3",
        hardware: {
          myNodeNum: 3,
        },
      },
    ];
  };

  return (
    <nav class="flex flex-col justify-between border-r-[0.5px] border-slate-300 bg-transparent pt-2 dark:border-slate-700">
      <div class="flex flex-col overflow-y-hidden">
        <ul class="flex w-20 grow flex-col items-center space-y-4 bg-transparent py-4 px-5">
          <DeviceSelectorButton
            active={selectedDevice() === 0}
            onClick={() => {
              setSelectedDevice(0);
            }}
          >
            <HomeIcon />
          </DeviceSelectorButton>
          {getDevices().map((device) => (
            <DeviceSelectorButton
              onClick={() => {
                setSelectedDevice(device.id);
              }}
              active={selectedDevice() === device.id}
            >
              <Hashicon
                options={{
                  size: 24,
                }}
                hash={device.hardware.myNodeNum}
              />
            </DeviceSelectorButton>
          ))}
          <Separator orientation="horizontal" />
          <button
            onClick={() => setConnectDialogOpen(true)}
            class="transition-all duration-300 hover:text-accent"
          >
            <PlusIcon />
          </button>
        </ul>
      </div>
      <div class="flex w-20 flex-col items-center space-y-5 bg-transparent px-5 pb-5">
        <button
          class="transition-all hover:text-accent"
          onClick={() =>
            theme() === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <Show when={theme() === "light"} fallback={<MoonIcon />}>
            <SunIcon />
          </Show>
        </button>
        <button
          class="transition-all hover:text-accent"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <TerminalIcon />
        </button>
        <button class="transition-all hover:text-accent">
          <LanguagesIcon />
        </button>
        <Separator orientation="horizontal" />
        {/* <Code>{process.env.COMMIT_HASH}</Code> */}
      </div>
    </nav>
  );
};
