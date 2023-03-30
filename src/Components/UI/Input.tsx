import { cn } from "@core/Utils/cn.js";
import { Component, JSX } from "solid-js";

export const Input: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (
  props,
) => (
  <input
    class={cn(
      "flex h-10 w-full rounded-md bg-transparent dark:bg-slate-950 shadow-inner py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-50",
      props.class,
    )}
    {...props}
  />
);
