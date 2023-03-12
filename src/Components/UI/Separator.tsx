import { Separator as SeparatorPrimitive } from "@kobalte/core";
import { cn } from "@core/Utils/cn.js";
import { Component } from "solid-js";

export const Separator: Component<SeparatorPrimitive.SeparatorRootProps> = (
  props,
) => (
  <SeparatorPrimitive.Root
    class={cn(
      "bg-slate-200 dark:bg-slate-700",
      props.orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      props.class,
    )}
    {...props}
  />
);
