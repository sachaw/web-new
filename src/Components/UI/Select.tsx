import { Select as SelectPrimitive } from "@kobalte/core";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-solid";

import { cn } from "@core/Utils/cn.js";
import { Component } from "solid-js";

export const Select = <T, V>(props: SelectPrimitive.SelectRootProps<T, V>) => (
  <SelectPrimitive.Root {...props}>
    <SelectPrimitive.Trigger
      class="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
      {...props}
    >
      <SelectPrimitive.Value />
      <SelectPrimitive.Icon>
        <ChevronsUpDownIcon class="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        class="animate-in fade-in-80 relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-100 bg-white text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400"
        {...props}
      >
        <SelectPrimitive.Listbox />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);

export const SelectLabel: Component<SelectPrimitive.SelectLabelProps> = (
  props,
) => (
  <SelectPrimitive.Label
    class={cn(
      "py-1.5 pr-2 pl-8 text-sm font-semibold text-slate-900 dark:text-slate-300",
      props.class,
    )}
    {...props}
  />
);

export const SelectDescription: Component<
  SelectPrimitive.SelectDescriptionProps
> = (props) => (
  <SelectPrimitive.Description class={cn("", props.class)} {...props} />
);

export const SelectErrorMessage: Component<
  SelectPrimitive.SelectErrorMessageProps
> = (props) => (
  <SelectPrimitive.ErrorMessage class={cn("", props.class)} {...props} />
);

export const SelectSection: Component<SelectPrimitive.SelectSectionProps> = (
  props,
) => <SelectPrimitive.Section class={cn("", props.class)} {...props} />;

export const SelectItem: Component<SelectPrimitive.SelectItemProps> = (
  props,
) => (
  <SelectPrimitive.Item
    class={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm font-medium outline-none focus:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-700",
      props.class,
    )}
    {...props}
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon class="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemLabel>{props.children}</SelectPrimitive.ItemLabel>
  </SelectPrimitive.Item>
);

export const ItemDescription: Component<
  SelectPrimitive.SelectItemDescriptionProps
> = (props) => (
  <SelectPrimitive.ItemDescription class={cn("", props.class)} {...props} />
);
