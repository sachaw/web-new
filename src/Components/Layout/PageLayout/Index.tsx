import { cn } from "@core/Utils/cn.js";
import { AlignLeftIcon } from "lucide-solid";
import { Component, JSX } from "solid-js";
import { LucideIcon } from "src/types.js";

export interface PageLayoutProps {
  label: string;
  noPadding?: boolean;
  children: JSX.Element;
  actions?: {
    icon: LucideIcon;
    onClick: () => void;
  }[];
}

export const PageLayout: Component<PageLayoutProps> = (props) => {
  return (
    <div class="relative flex h-full w-full flex-col">
      <div class="flex h-14 shrink-0 border-b-[0.5px] border-slate-300 dark:border-slate-700 md:h-16 md:px-4">
        <button class="pl-4 transition-all hover:text-accent md:hidden">
          <AlignLeftIcon />
        </button>
        <div class="flex flex-1 items-center justify-between px-4 md:px-0">
          <div class="flex w-full items-center">
            <span class="w-full text-lg font-medium">{props.label}</span>
            <div class="flex justify-end space-x-4">
              {props.actions?.map((action, index) => (
                <button
                  class="transition-all hover:text-accent"
                  onClick={action.onClick}
                >
                  <action.icon />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        class={cn(
          "flex h-full w-full flex-col overflow-y-auto",
          !props.noPadding && "p-3"
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
