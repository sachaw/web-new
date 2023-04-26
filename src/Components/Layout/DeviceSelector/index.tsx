import {
  PlusIcon,
  HouseIcon,
  UsersIcon,
  StackIcon,
  GearIcon,
  ChatTeardropTextIcon,
  TranslateIcon,
  TerminalIcon,
  SunIcon,
  MoonIcon,
  CircleNotchIcon,
} from "solid-phosphor/regular";
// import { Code } from "@components/UI/Typography/Code.js";
// import { DeviceSelectorButton } from "./DeviceSelectorButton.js";
import { Hashicon } from "@components/Hashicon.jsx";
import { Separator } from "@ui/Separator.jsx";
import { Component, For, Show, createSignal } from "solid-js";
import { DeviceSelectorButton } from "@components/Layout/DeviceSelector/DeviceSelectorButton.jsx";
import { Code } from "@ui/Typography/Code.jsx";
import { useTheme } from "@core/Providers/ThemeProvider.jsx";
import { useDialog } from "@core/Providers/DialogProvider.jsx";
import { Page, useDevice } from "@core/Providers/DeviceProvider.jsx";
import { useConnection } from "@core/Providers/ConnectionProvider.jsx";
import type { PhosphorIcon } from "solid-phosphor";

export const DeviceSelector: Component = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = createSignal(false);
  const { setDialog } = useDialog();
  const { theme, setTheme } = useTheme();
  const { UISetters, activeDevice, setActiveDevice } = useDevice();
  const { connections } = useConnection();

  interface NavLink {
    icon: Component<PhosphorIcon>;
    page: Page;
  }

  const pages: NavLink[] = [
    {
      icon: ChatTeardropTextIcon,
      page: "messages",
    },
    {
      icon: GearIcon,
      page: "config",
    },
    {
      icon: StackIcon,
      page: "channels",
    },
    {
      icon: UsersIcon,
      page: "peers",
    },
  ];

  return (
    <nav class="flex flex-col justify-between pt-2 dark:border-slate-700">
      <div class="flex flex-col overflow-y-hidden">
        <ul class="flex w-20 grow flex-col items-center space-y-4 bg-transparent py-4 px-5">
          <DeviceSelectorButton
            active={!activeDevice()}
            onClick={() => {
              setActiveDevice(undefined);
            }}
          >
            <HouseIcon />
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
                fallback={<CircleNotchIcon class="animate-spin" />}
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

          <For each={pages}>
            {(page) => (
              <DeviceSelectorButton
                active={activeDevice()?.UI.activePage === page.page}
                onClick={() => {
                  UISetters.setActivePage(page.page);
                }}
              >
                <page.icon />
              </DeviceSelectorButton>
            )}
          </For>
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
          <TranslateIcon />
        </button>
      </div>
    </nav>
  );
};
