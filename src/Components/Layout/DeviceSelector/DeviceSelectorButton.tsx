import { Component, JSX } from "solid-js";

export interface DeviceSelectorButtonProps {
	active: boolean;
	onClick: () => void;
	children: JSX.Element;
}

export const DeviceSelectorButton: Component<DeviceSelectorButtonProps> = (
	props,
) => (
	<li class="aspect-w-1 aspect-h-1 relative w-full" onClick={props.onClick}>
		{props.active && (
			<div class="absolute -left-2 h-10 w-1.5 rounded-full bg-accent" />
		)}
		<div class="flex aspect-square cursor-pointer flex-col items-center justify-center">
			{props.children}
		</div>
	</li>
);
