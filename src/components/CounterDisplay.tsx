"use client";

import { counterStore } from "@/store/counterStore";

export function CounterDisplay() {
	// Use the same counter store
	const count = counterStore.useStore((state) => state.count);

	// Calculate properties based on count
	const isEven = count % 2 === 0;
	const isPositive = count > 0;
	const isNegative = count < 0;

	return (
		<div className="p-6 max-w-md mx-auto mt-8 bg-gray-100 rounded-xl shadow-md">
			<h3 className="text-xl font-semibold mb-4">Counter Display</h3>

			<div className="space-y-2">
				<p className="text-lg">
					Current count: <span className="font-bold">{count}</span>
				</p>

				<p>
					This number is:
					<span className={`ml-2 px-2 py-1 rounded ${isEven ? "bg-blue-200" : "bg-purple-200"}`}>
						{isEven ? "Even" : "Odd"}
					</span>
				</p>

				<p>
					Value is:
					<span
						className={`ml-2 px-2 py-1 rounded ${
							isPositive ? "bg-green-200" : isNegative ? "bg-red-200" : "bg-gray-200"
						}`}
					>
						{isPositive ? "Positive" : isNegative ? "Negative" : "Zero"}
					</span>
				</p>
			</div>
		</div>
	);
}
