import { cn } from "@core/Utils/cn.js";
import { Component, JSXElement } from "solid-js";

export interface MonoProps {
  class?: string;
  children: JSXElement;
}

export const Mono: Component<MonoProps> = (props) => (
  <span class={cn("font-mono text-sm text-gray-400", props.class)}>
    {props.children}
  </span>
);
