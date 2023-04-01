import { Button } from "@ui/Button.js";
import { TvIcon } from "lucide-solid";
import { LucideProps } from "lucide-solid/dist/types/types.js";
import { Component, JSX } from "solid-js";
import { LucideIcon } from "src/types.js";

export interface SidebarButtonProps {
  label: string;
  active?: boolean;
  icon?: LucideIcon;
  children?: JSX.Element;
  badgeCount?: number;
  onClick?: () => void;
}

export const SidebarButton: Component<SidebarButtonProps> = (props) => (
  <Button
    onClick={props.onClick}
    variant={props.active ? "default" : "ghost"}
    size="sm"
    class="w-full justify-start gap-2"
  >
    {props.icon && <props.icon size={16} />}
    {props.children}
    {props.label}
    {!!props.badgeCount && (
      <span class="ml-auto h-4 w-4 rounded-full bg-accent-500 text-xs text-textPrimary">
        {props.badgeCount}
      </span>
    )}
  </Button>
);
