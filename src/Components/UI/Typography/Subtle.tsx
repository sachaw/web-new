import { cn } from "@core/Utils/cn.js";
import { Component, JSXElement } from "solid-js";

export interface SubtleProps {
  class?: string;
  children: JSXElement;
}

export const Subtle: Component<SubtleProps> = (props) => (
  <p class={cn("text-sm text-slate-500 dark:text-slate-400", props.class)}>
    {props.children}
  </p>
);
