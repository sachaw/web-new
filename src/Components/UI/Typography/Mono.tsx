import { cn } from "@core/Utils/cn.js";
import { Component, JSX } from "solid-js";

export interface MonoProps {
  class?: string;
  children: JSX.Element;
}

export const Mono: Component<MonoProps> = (props) => (
  <span
    class={cn("font-mono text-sm text-textSecondary", props.class)}
  >
    {props.children}
  </span>
);
