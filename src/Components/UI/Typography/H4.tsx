import { cn } from "@core/Utils/cn.js";
import { Component, JSXElement } from "solid-js";

export interface H4Props {
  class?: string;
  children: JSXElement;
}

export const H4: Component<H4Props> = (props) => (
  <h4
    class={cn("scroll-m-20 text-xl font-semibold tracking-tight", props.class)}
  >
    {props.children}
  </h4>
);
