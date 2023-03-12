

import { cn } from "@core/Utils/cn.js";
import { Component, JSX } from "solid-js";

interface LabelProps {
  class?: string;
  children?: JSX.Element;
}

export const Label: Component<LabelProps> = (props) => (
  <span class={cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    props.class
  )}
  {...props} />
)