import { useSyncExternalStore } from "react";

export function useOnlineStatus() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

type Listener = () => void;

const listeners = new Set<Listener>();

function getSnapshot() {
	return navigator.onLine;
}

function getServerSnapshot() {
	// Assume online for SSR - will hydrate with actual status
	return true;
}

function subscribe(listener: Listener) {
	// Note: NO requestAnimationFrame here!
	// online/offline events are infrequent and need immediate feedback
	function handleOnline() {
		// Notify all listeners immediately - no rAF batching
		for (const listener of listeners) {
			listener();
		}
	}

	function handleOffline() {
		// Notify all listeners immediately - no rAF batching
		for (const listener of listeners) {
			listener();
		}
	}

	if (listeners.size === 0) {
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
	}

	listeners.add(listener);

	return () => {
		listeners.delete(listener);
		if (listeners.size === 0) {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		}
	};
}
