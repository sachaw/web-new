import {
  MapIcon,
  MessageSquareIcon,
  SettingsIcon,
  LayersIcon,
  UsersIcon,
  EditIcon,
  LayoutGrid,
} from "lucide-solid";
import { Subtle } from "@components/UI/Typography/Subtle.js";
import { Component, JSX, createSignal } from "solid-js";
import { SidebarSection } from "@components/Layout/Sidebar/SidebarSection.jsx";
import { SidebarButton } from "@components/Layout/Sidebar//SidebarButton.jsx";
import { LucideIcon } from "src/types.js";
import { useDialog } from "@core/Providers/DialogProvider.jsx";
import { Page, useDevice } from "@core/Providers/DeviceProvider.jsx";

export interface SidebarProps {
  children?: JSX.Element;
}

export const Sidebar: Component<SidebarProps> = (props) => {
  const { setDialog } = useDialog();
  const { UISetters, activeDevice } = useDevice();

  const myNode = {
    user: {
      shortName: "test",
      longName: "test",
    },
  };

  interface NavLink {
    name: string;
    icon: LucideIcon;
    page: Page;
  }

  const pages: NavLink[] = [
    {
      name: "Messages",
      icon: MessageSquareIcon,
      page: "messages",
    },
    {
      name: "Map",
      icon: MapIcon,
      page: "map",
    },
    {
      name: "Config",
      icon: SettingsIcon,
      page: "config",
    },
    {
      name: "Channels",
      icon: LayersIcon,
      page: "channels",
    },
    {
      name: "Peers",
      icon: UsersIcon,
      page: "peers",
    },
  ];

  return (
    <div class="min-w-[280px] max-w-min flex-col border-r-[0.5px] border-slate-300 bg-transparent dark:border-slate-700 dark:bg-slate-950">
      <div class="flex justify-between px-8 py-6">
        <div>
          <span class="text-lg font-medium">
            {myNode?.user?.shortName ?? "UNK"}
          </span>
          <Subtle>{myNode?.user?.longName ?? "UNK"}</Subtle>
        </div>
        <button
          class="transition-all hover:text-accent-500"
          onClick={() => setDialog("deviceName", true)}
        >
          <EditIcon size={16} />
        </button>
      </div>

      <SidebarSection label="Navigation">
        {pages.map((link, index) => (
          <SidebarButton
            label={link.name}
            icon={link.icon}
            onClick={() => {
              UISetters.setActivePage(link.page);
            }}
            active={activeDevice()?.UI.activePage === link.page}
          />
        ))}
      </SidebarSection>
      {props.children}
    </div>
  );
};
