import {
  PlusIcon,
  HomeIcon,
  LanguagesIcon,
  SunIcon,
  MoonIcon,
  TerminalIcon,
  LoaderIcon,
  Loader2,
  Loader2Icon,
} from "lucide-solid";
// import { Code } from "@components/UI/Typography/Code.js";
// import { DeviceSelectorButton } from "./DeviceSelectorButton.js";
import { Hashicon } from "@components/Hashicon.jsx";
import { Separator } from "@ui/Separator.jsx";
import { Component, Show, createSignal } from "solid-js";
import { DeviceSelectorButton } from "@components/Layout/DeviceSelector/DeviceSelectorButton.jsx";
import { Code } from "@ui/Typography/Code.jsx";
import { useTheme } from "@core/Providers/ThemeProvider.jsx";
import { useDialog } from "@core/Providers/DialogProvider.jsx";
import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import { useConnection } from "@core/Providers/ConnectionProvider.jsx";

export const DeviceSelector: Component = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = createSignal(false);
  const { setDialog } = useDialog();
  const [theme, setTheme] = useTheme();
  const { devices, activeDevice, setActiveDevice } = useDevice();
  const { connections } = useConnection();

  console.log(activeDevice());

  return (
    <nav class="flex flex-col justify-between border-r-[0.5px] border-slate-300 bg-transparent pt-2 dark:border-slate-700">
      <div class="flex flex-col overflow-y-hidden">
        <ul class="flex w-20 grow flex-col items-center space-y-4 bg-transparent py-4 px-5">
          <DeviceSelectorButton
            active={!activeDevice()}
            onClick={() => {
              setActiveDevice(undefined);
            }}
          >
            <HomeIcon />
          </DeviceSelectorButton>
          {connections.map((device) => (
            <DeviceSelectorButton
              onClick={() => {
                setActiveDevice(device.nodeNum);
              }}
              active={activeDevice()?.nodeNum === device.nodeNum}
            >
              <Show
                when={device.nodeNum}
                fallback={<Loader2Icon class="animate-spin" />}
              >
                <Hashicon hash={device.nodeNum} />
              </Show>
            </DeviceSelectorButton>
          ))}
          <Separator orientation="horizontal" />
          <button
            onClick={() => setDialog("newDevice", true)}
            class="transition-all duration-300 hover:text-accent-500"
          >
            <PlusIcon />
          </button>
        </ul>
      </div>
      <div class="flex w-20 flex-col items-center space-y-5 bg-transparent px-5 pb-5">
        <button
          class="transition-all hover:text-accent-500"
          onClick={() =>
            theme() === "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <Show when={theme() === "light"} fallback={<MoonIcon />}>
            <SunIcon />
          </Show>
        </button>
        <button
          class="transition-all hover:text-accent-500"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <TerminalIcon />
        </button>
        <button class="transition-all hover:text-accent-500">
          <LanguagesIcon />
        </button>
        <Separator orientation="horizontal" />
        <Code>{process.env.COMMIT_HASH}</Code>
      </div>
    </nav>
  );
};
