import { Checkbox as CheckboxPrimitive } from "@kobalte/core";
import { CheckIcon } from "solid-phosphor/regular";

import { cn } from "@core/Utils/cn.js";
import { Component } from "solid-js";

export const Checkbox: Component<CheckboxPrimitive.CheckboxRootProps> = (
  props,
) => (
  <CheckboxPrimitive.Root
    class={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
      props.class,
    )}
    {...props}
  >
    <CheckboxPrimitive.Input />
    <CheckboxPrimitive.Control>
      <CheckboxPrimitive.Indicator class="flex items-center justify-center">
        <CheckIcon class="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Control>
    <CheckboxPrimitive.Label />
  </CheckboxPrimitive.Root>
);
