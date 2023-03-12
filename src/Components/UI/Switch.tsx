import {Switch as SwitchPrimitive} from '@kobalte/core'

import { cn } from "@core/Utils/cn.js";
import { Component } from 'solid-js';



export const Switch: Component<SwitchPrimitive.SwitchRootProps> = (props) => (
  <SwitchPrimitive.Root class={cn(
    "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-slate-200 data-[state=checked]:bg-slate-900 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=unchecked]:bg-slate-700 dark:data-[state=checked]:bg-slate-400",
    props.class
  )} {...props}>
    <SwitchPrimitive.Label >Label</SwitchPrimitive.Label>
      <SwitchPrimitive.Input  />
      <SwitchPrimitive.Control >
        <SwitchPrimitive.Thumb class={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5"
      )} />
      </SwitchPrimitive.Control>
    </SwitchPrimitive.Root>
);