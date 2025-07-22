import { useSyncExternalStore } from "react";

export function useScrollY() {
	return useSyncExternalStore(
		subscribe,
		() => getScrollYSnapshot(),
		() => undefined,
	);
}

export function useScrollYFloored(to: number) {
	return useSyncExternalStore(
		subscribe,
		() => getScrollYSnapshot((y) => (y ? Math.floor(y / to) * to : 1)),
		() => undefined,
	);
}

type Listener = () => void;
type Selector = (y: number) => number;

const listeners = new Set<Listener>();

function getScrollY() {
	return global.window?.scrollY;
}

function getScrollYSnapshot(selector?: Selector) {
	return selector ? selector(getScrollY()) : getScrollY();
}

function subscribe(listener: Listener) {
	function handleScroll() {
		requestAnimationFrame(() => {
			for (const listener of listeners) {
				listener();
			}
		});
	}

	if (listeners.size === 0) {
		global.window?.addEventListener("scroll", handleScroll);
	}

	listeners.add(listener);

	return () => {
		listeners.delete(listener);
		if (listeners.size === 0) {
			global.window?.removeEventListener("scroll", handleScroll);
		}
	};
}
