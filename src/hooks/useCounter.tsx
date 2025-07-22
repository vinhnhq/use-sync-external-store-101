import { useSyncExternalStore } from "react";

type Listener = () => void;

function createCounter() {
	let value = 0;
	const listeners = new Set<Listener>();

	return {
		get() {
			return value;
		},
		on(listener: Listener) {
			listeners.add(listener);
		},
		off(listener: Listener) {
			listeners.delete(listener);
		},
		increment() {
			value++;
			listeners.forEach((listener) => listener());
		},
		reset() {
			value = 0;
			listeners.forEach((listener) => listener());
		},
		decrement() {
			value--;
			listeners.forEach((listener) => listener());
		},
	};
}

export const Counter = createCounter();

function subscribe(listener: Listener) {
	Counter.on(listener);
	return () => Counter.off(listener);
}

function getSnapshot() {
	return Counter.get();
}

function getServerSnapshot() {
	return 0;
}

export default function useCounter() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
