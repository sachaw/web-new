import { Dialog as DialogPrimitive } from "@kobalte/core";
import { X } from "lucide-solid";

import { cn } from "@core/Utils/cn.js";
import { Component, JSX } from "solid-js";
import { ThemeProvider } from "@core/Providers/ThemeProvider.jsx";

export type DialogProps = DialogPrimitive.DialogRootProps;

export const Dialog: Component<DialogPrimitive.DialogRootProps> = (props) => (
  <DialogPrimitive.Root {...props}>
    <DialogPrimitive.Portal>
      <ThemeProvider>
        <div class="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
          <DialogPrimitive.Overlay
            class={cn(
              "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in",
            )}
          />
          <DialogPrimitive.Content
            class={cn(
              "fixed z-50 grid w-full scale-100 gap-4 bg-white p-6 opacity-100 animate-in fade-in-90 slide-in-from-bottom-10 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0",
              "dark:bg-slate-900",
            )}
          >
            <DialogPrimitive.CloseButton class="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800">
              <X class="h-4 w-4" />
              <span class="sr-only">Close</span>
            </DialogPrimitive.CloseButton>
            {props.children}
          </DialogPrimitive.Content>
        </div>
      </ThemeProvider>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);

export const DialogDescription: Component<
  DialogPrimitive.DialogDescriptionProps
> = (props) => (
  <DialogPrimitive.Description
    class={cn("text-sm text-slate-500 dark:text-slate-400", props.class)}
    {...props}
  />
);

export const DialogTitle: Component<DialogPrimitive.DialogTitleProps> = (
  props,
) => (
  <div class="flex flex-col space-y-2 text-center sm:text-left">
    <DialogPrimitive.Title
      {...props}
      class={cn(
        "text-lg font-semibold text-slate-900 dark:text-slate-50",
        props.class,
      )}
    />
  </div>
);

export interface DialogFooterProps {
  class?: string;
  children: JSX.Element;
}

export const DialogFooter: Component<DialogFooterProps> = (props) => (
  <div
    class={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      props.class,
    )}
    {...props}
  />
);
