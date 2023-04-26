import { Component } from "solid-js";
import { PhosphorIcon } from "solid-phosphor";

export interface StatusbarProps {
  icon: Component<PhosphorIcon>;
  value: string;
}

export const StatusbarStat: Component<StatusbarProps> = (props) => {
  return (
    <div class="flex gap-1 hover:bg-gray-900 px-3 cursor-pointer select-none shrink-0 hover:text-accent-500">
      <props.icon class="h-3 w-3 my-auto" />
      <span class="my-auto text-sm text-gray-400 font-mono tracking-tight">
        {props.value}
      </span>
    </div>
  );
};
