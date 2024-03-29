import { Button as ButtonPrimitive } from "@kobalte/core";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@core/Utils/cn.js";
import { Component } from "solid-js";

const buttonVariants = cva(
  " inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 text-white hover:bg-slate-700 bg-slate-50 shadow-highlight",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const Button: Component<
  ButtonPrimitive.ButtonRootProps & VariantProps<typeof buttonVariants>
> = (props) => (
  <ButtonPrimitive.Root
    {...props}
    class={cn(
      buttonVariants({
        variant: props.variant,
        size: props.size,
        className: props.class,
      }),
    )}
  />
);
