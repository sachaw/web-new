import { Link as LinkPrimitive } from "@kobalte/core";
import { Component, JSXElement } from "solid-js";

export interface LinkProps {
  href: string;
  children: JSXElement;
}

export const Link: Component<LinkProps> = (props) => (
  <LinkPrimitive.Root
    href={props.href}
    target={"_blank"}
    rel="noopener noreferrer"
    class="font-medium text-slate-900 underline underline-offset-4 dark:text-slate-50"
  >
    {props.children}
  </LinkPrimitive.Root>
);
