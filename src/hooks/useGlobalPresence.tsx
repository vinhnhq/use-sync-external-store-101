import { useEffect } from "react";

type GlobalPresenceOptions = {
	onMount: () => void;
	onUnmount: () => void;
};

export default function createGlobalPresence({ onMount, onUnmount }: GlobalPresenceOptions) {
	let count = 0;

	function add() {
		if (count === 0) {
			onMount();
		}
		count++;
	}

	function remove() {
		count--;
		if (count === 0) {
			onUnmount();
		}
	}

	return function useGlobalPresence() {
		useEffect(() => {
			add();

			return remove;
		}, []);
	};
}
