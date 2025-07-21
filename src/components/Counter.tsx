"use client";

import { useState } from "react";
import { counterActions, counterStore } from "@/store/counterStore";

export function Counter() {
	// Use the counter store
	const count = counterStore.useStore((state) => state.count);

	// Local state for input value
	const [inputValue, setInputValue] = useState("");

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	// Handle set count form submission
	const handleSetCount = (e: React.FormEvent) => {
		e.preventDefault();
		const newCount = parseInt(inputValue);
		if (!Number.isNaN(newCount)) {
			counterActions.setCount(newCount);
			setInputValue("");
		}
	};

	return (
		<div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-6">
			<h2 className="text-2xl font-bold text-center">Counter: {count}</h2>

			<div className="flex justify-center space-x-4">
				<button
					type="button"
					onClick={counterActions.decrement}
					className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
				>
					Decrement
				</button>

				<button
					type="button"
					onClick={counterActions.increment}
					className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
				>
					Increment
				</button>

				<button
					type="button"
					onClick={counterActions.reset}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
				>
					Reset
				</button>
			</div>

			<form onSubmit={handleSetCount} className="flex space-x-2">
				<input
					type="number"
					value={inputValue}
					onChange={handleInputChange}
					placeholder="Enter a number"
					className="flex-1 px-4 py-2 border rounded"
				/>
				<button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
					Set Count
				</button>
			</form>
		</div>
	);
}
