import { useSyncExternalStore } from "react";

type Listener = () => void;

let x = 0;
let y = 0;

export default function useMousePosition() {
	return [useX(), useY()] as const;
}

function useX() {
	return useSyncExternalStore(
		subscribe,
		() => x,
		() => x,
	);
}

function useY() {
	return useSyncExternalStore(
		subscribe,
		() => y,
		() => y,
	);
}

const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
	function handleMouseMove(event: MouseEvent) {
		x = event.clientX;
		y = event.clientY;
		requestAnimationFrame(() => {
			for (const listener of listeners) {
				listener();
			}
		});
	}

	if (listeners.size === 0) {
		window.addEventListener("mousemove", handleMouseMove);
	}

	listeners.add(listener);

	return () => {
		listeners.delete(listener);
		if (listeners.size === 0) {
			window.removeEventListener("mousemove", handleMouseMove);
		}
	};
}
