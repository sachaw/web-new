import { Tabs as TabsPrimtive } from "@kobalte/core";
import { cn } from "@core/Utils/cn.js";
import { Component } from "solid-js";

export const Tabs: Component<TabsPrimtive.TabsRootProps> = (props) => (
  <TabsPrimtive.Root {...props} />
);

export const TabsList: Component<TabsPrimtive.TabsListProps> = (props) => (
  <TabsPrimtive.List
    class={cn(
      "inline-flex items-center justify-center rounded-md bg-slate-100 p-1 dark:bg-slate-800",
      props.class,
    )}
    {...props}
  >
    {props.children}
    <TabsPrimtive.Indicator />
  </TabsPrimtive.List>
);

export const TabsTrigger: Component<TabsPrimtive.TabsTriggerProps> = (
  props,
) => (
  <TabsPrimtive.Trigger
    class={cn(
      "inline-flex min-w-[100px] items-center justify-center rounded-[0.185rem] px-3 py-1.5  text-sm font-medium text-slate-700 transition-all  disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm dark:text-slate-200 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-slate-100",
      props.class,
    )}
    {...props}
  />
);

export const TabsContent: Component<TabsPrimtive.TabsContentProps> = (
  props,
) => (
  <TabsPrimtive.Content
    class={cn(
      "mt-2 rounded-md border border-slate-200 p-6 dark:border-slate-700",
      props.class,
    )}
    {...props}
  />
);
