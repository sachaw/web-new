import { Component, JSXElement } from "solid-js";
import type { PhosphorIcon } from "solid-phosphor";

export interface PageLayoutProps {
  label: string;
  labelElement?: JSXElement;
  noPadding?: boolean;
  children: JSXElement;
  actions?: {
    icon: Component<PhosphorIcon>;
    onClick: () => void;
  }[];
}

export const PageLayout: Component<PageLayoutProps> = (props) => {
  return (
    <div class="relative flex h-full w-1/3 flex-col">
      <div class="flex h-8">
        <span class="flex tracking-tight font-mono gap-1">
          {props.label}
          {props.labelElement}
        </span>
        <div class="flex ml-auto">
          {props.actions?.map((action, index) => (
            <button
              class="transition-all hover:text-accent-500 hover:bg-gray-900 px-2"
              onClick={action.onClick}
            >
              <action.icon class="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
      <div class="flex grow overflow-y-auto">{props.children}</div>
    </div>
  );
};
