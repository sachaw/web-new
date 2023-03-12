import { Component, JSX } from "solid-js";
import { H4 } from "@ui/Typography/H4.jsx";

export interface SidebarSectionProps {
  label: string;
  subheader?: string;
  children: JSX.Element;
}

export const SidebarSection: Component<SidebarSectionProps> = (props) => (
  <div class="px-4 py-2">
    <H4 class="mb-2 ml-2">{props.label}</H4>
    <div class="space-y-1">{props.children}</div>
  </div>
);
