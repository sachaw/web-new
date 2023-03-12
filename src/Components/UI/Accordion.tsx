import { Accordion as AccordionPrimitive } from "@kobalte/core";
import { ChevronDown } from "lucide-solid";
import { Component, Ref } from "solid-js";

import { cn } from "@core/Utils/cn.js";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem: Component<AccordionPrimitive.AccordionItemProps> =
	({ ...props }) => (
		<AccordionPrimitive.Item
			class={cn(
				"border-b border-b-slate-200 dark:border-b-slate-700",
				props.class,
			)}
			{...props}
		/>
	);

export const AccordionTrigger: Component<
	AccordionPrimitive.AccordionTriggerProps
> = ({ ...props }) => (
	<AccordionPrimitive.Header class="flex">
		<AccordionPrimitive.Trigger
			class={cn(
				"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
				props.class,
			)}
			{...props}
		>
			{props.children}
			<ChevronDown class="h-4 w-4 transition-transform duration-200" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
);

export const AccordionContent: Component<
	AccordionPrimitive.AccordionContentProps
> = ({ ...props }) => (
	<AccordionPrimitive.Content
		class={cn(
			"data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden text-sm transition-all",
			props.class,
		)}
		{...props}
	>
		<div class="pt-0 pb-4">{props.children}</div>
	</AccordionPrimitive.Content>
);
