import { Component, JSX } from "solid-js";

export interface H3Props {
	children: JSX.Element;
}

export const H3: Component<H3Props> = (props) => (
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
		{props.children}
	</h3>
);
