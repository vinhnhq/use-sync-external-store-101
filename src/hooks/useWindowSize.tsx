import { useSyncExternalStore } from "react";

type Listener = () => void;
type Selector = (w: number) => number;

type UseWindowSize = {
	widthSelector?: Selector;
	heightSelector?: Selector;
};

export function useWindowSize({ widthSelector, heightSelector }: UseWindowSize = {}) {
	const windowWidth = useWidth(widthSelector);
	const windowHeight = useHeight(heightSelector);

	return { width: windowWidth, height: windowHeight } as const;
}

function useWidth(selector: Selector = (w) => w) {
	return useSyncExternalStore(
		subscribe,
		() => windowWidthSnapshot(selector),
		() => 0,
	);
}

function useHeight(selector: Selector = (h) => h) {
	return useSyncExternalStore(
		subscribe,
		() => windowHeightSnapshot(selector),
		() => 0,
	);
}

function windowWidthSnapshot(selector: Selector = (w) => w): number {
	return selector(global.window?.innerWidth ?? 0);
}

function windowHeightSnapshot(selector: Selector = (h) => h): number {
	return selector(global.window?.innerHeight ?? 0);
}

const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
	function handleResize() {
		requestAnimationFrame(() => {
			for (const listener of listeners) {
				listener();
			}
		});
	}

	if (listeners.size === 0) {
		global.window?.addEventListener("resize", handleResize);
	}

	listeners.add(listener);

	return () => {
		listeners.delete(listener);
		if (listeners.size === 0) {
			global.window?.removeEventListener("resize", handleResize);
		}
	};
}
