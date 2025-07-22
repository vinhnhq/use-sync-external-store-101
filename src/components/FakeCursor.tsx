"use client";

import createGlobalPresence from "@/hooks/useGlobalPresence";
import useMousePosition from "@/hooks/useMousePosition";

const useFakeCursorPresence = createGlobalPresence({
	onMount: () => {
		document.documentElement.classList.add("cursor-none");
	},
	onUnmount: () => {
		document.documentElement.classList.remove("cursor-none");
	},
});

export default function FakeCursor() {
	const [x, y] = useMousePosition();
	useFakeCursorPresence();

	return (
		<div className="fixed inset-0 pointer-events-none z-50" style={{ left: x, top: y }}>
			<div className="w-4 h-4 bg-black rounded-full -translate-x-1/2 -translate-y-1/2">&nbsp;</div>
		</div>
	);
}
