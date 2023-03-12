import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@ui/Accordion";
import { Accordion as AccordionPrimitive } from "@kobalte/core";
import { Component } from "solid-js";
import { Input } from "@ui/Input.jsx";
import { Select } from "@ui/Select.jsx";
import { SelectItem } from "@ui/Select.jsx";
import { CheckIcon, CigaretteIcon } from "lucide-solid";

export const UI: Component = () => {
	return (
		<div class="w-96">
			<Select<string, string>
				options={["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]}
				placeholder="Select a fruit…"
				renderValue={(selectedOption) => selectedOption()}
				renderItem={(item) => (
					<SelectItem item={item()}>{item().rawValue}</SelectItem>
				)}
			/>
		</div>
	);
};
