import { Select as SelectPrimitive } from "@kobalte/core";
import { CheckIcon, CaretUpDownIcon } from "solid-phosphor/regular";

import { cn } from "@core/Utils/cn.js";
import { Component } from "solid-js";

export interface SelectProps {
  value: string;
  options: SelectOption[];
  placeholder: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled: boolean;
}
export const Select: Component<SelectProps> = (props) => (
  <SelectPrimitive.Root
    options={props.options}
    value={props.value}
    optionValue="value"
    optionTextValue="label"
    optionDisabled="disabled"
    placeholder={props.placeholder}
    valueComponent={(items) => items.item.rawValue.label}
    itemComponent={(items) => (
      <SelectPrimitive.Item
        class={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        )}
        item={items.item}
      >
        <SelectPrimitive.ItemLabel
          class={cn("py-1.5 pl-8 pr-2 text-sm font-semibold")}
        >
          {items.item.rawValue.label}
        </SelectPrimitive.ItemLabel>
        <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <CheckIcon class="h-4 w-4" />
          </SelectPrimitive.ItemIndicator>
        </span>
      </SelectPrimitive.Item>
    )}
  >
    <SelectPrimitive.Trigger class="flex w-full items-center justify-between rounded-md shadow-highlight bg-gray-900 bg-transparent px-2 py-0.5 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 gap-1">
      <SelectPrimitive.Value />
      <SelectPrimitive.Icon>
        <CaretUpDownIcon class="h-3 w-3 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    {/*  */}
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        class={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
          // position === "popper" && "translate-y-1",
        )}
      >
        <SelectPrimitive.Listbox
          class={cn(
            "p-1",
            // position === "popper" &&
            //   "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);

// // SelectSeparator
// <SelectPrimitive.Separator
//     ref={ref}
//     className={cn("-mx-1 my-1 h-px bg-muted", className)}
//     {...props}
//   />
