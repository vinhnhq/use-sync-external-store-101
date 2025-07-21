import { useSyncExternalStore } from "react";

// Generic store creator function
export function createStore<T extends object>(initialState: T) {
	// Store state
	let state = { ...initialState };

	// Listeners array
	let listeners: (() => void)[] = [];

	// Function to subscribe to store changes
	const subscribe = (listener: () => void) => {
		listeners.push(listener);

		// Return unsubscribe function
		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	};

	// Get current state
	const getState = () => state;

	// Set new state and notify listeners
	const setState = (newState: Partial<T>) => {
		state = { ...state, ...newState };
		listeners.forEach((listener) => listener());
	};

	// Hook to use the store in React components
	const useStore = <R>(
		selector: (state: T) => R = (s: T) => s as unknown as R,
	): R => {
		return useSyncExternalStore(
			subscribe,
			() => selector(state),
			() => selector(initialState),
		);
	};

	// Return store API
	return {
		getState,
		setState,
		subscribe,
		useStore,
	};
}
