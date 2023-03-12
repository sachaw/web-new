import { cn } from "@core/Utils/cn.js";
import { Component, JSX } from "solid-js";

export const Input: Component<JSX.InputHTMLAttributes<HTMLInputElement>> = (
	props,
) => (
	<input
		class={cn(
			"flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
			props.class,
		)}
		{...props}
	/>
);
