import { Component, JSXElement } from "solid-js";

export interface CodeProps {
  children: JSXElement;
}

export const Code: Component<CodeProps> = (props) => (
  <code class="shadow-highlight relative rounded bg-slate-100 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400">
    {props.children}
  </code>
);
