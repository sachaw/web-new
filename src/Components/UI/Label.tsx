import { cn } from "@core/Utils/cn.js";
import { Component, JSXElement } from "solid-js";

interface LabelProps {
  class?: string;
  children?: JSXElement;
}

export const Label: Component<LabelProps> = (props) => (
  <span
    class={cn(
      "dark:text-slate-100 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      props.class,
    )}
    {...props}
  />
);
