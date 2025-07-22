"use client";

import { CounterDispatcher } from "@/components/CounterDispatcher";
import { CounterDisplay } from "@/components/CounterDisplay";
import { MediaQueryDemo } from "@/components/MediaQueryDemo";
import { SimpleMediaQueryTest } from "@/components/SimpleMediaQueryTest";
import FakeCursor from "@/components/FakeCursor";
import useMousePosition from "@/hooks/useMousePosition";
import { useScrollY, useScrollYFloored } from "@/hooks/useScrollY";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useCurrentBreakpoint, useMediaQueryState } from "@/hooks/useMediaQuery";
import createGlobalPresence from "@/hooks/useGlobalPresence";
import { useState } from "react";

// Create a global presence hook for demo
const useScrollDemoPresence = createGlobalPresence({
	onMount: () => console.log("Scroll demo mounted - started tracking scroll"),
	onUnmount: () => console.log("Scroll demo unmounted - stopped tracking scroll"),
});

// Mouse position demo component
function MousePositionDemo() {
	const [x, y] = useMousePosition();
	
	return (
		<div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
			<h3 className="text-xl font-semibold mb-4 text-blue-900">🖱️ Mouse Position</h3>
			<div className="space-y-2">
				<p className="text-blue-800">
					Mouse X: <span className="font-mono bg-white px-2 py-1 rounded">{x}px</span>
				</p>
				<p className="text-blue-800">
					Mouse Y: <span className="font-mono bg-white px-2 py-1 rounded">{y}px</span>
				</p>
				<p className="text-sm text-blue-600 mt-3">
					Move your mouse around to see real-time position updates using <code>useMousePosition</code>
				</p>
			</div>
		</div>
	);
}

// Scroll position demo component
function ScrollPositionDemo() {
	useScrollDemoPresence(); // Demo of global presence
	const scrollY = useScrollY();
	const flooredScrollY = useScrollYFloored(100);
	
	return (
		<div className="p-6 bg-green-50 rounded-lg border border-green-200">
			<h3 className="text-xl font-semibold mb-4 text-green-900">📜 Scroll Position</h3>
			<div className="space-y-2">
				<p className="text-green-800">
					Scroll Y: <span className="font-mono bg-white px-2 py-1 rounded">{scrollY}px</span>
				</p>
				<p className="text-green-800">
					Floored (100px): <span className="font-mono bg-white px-2 py-1 rounded">{flooredScrollY}px</span>
				</p>
				<p className="text-sm text-green-600 mt-3">
					Scroll the page to see updates using <code>useScrollY</code> and <code>useScrollYFloored</code>
				</p>
				<p className="text-xs text-green-500 mt-2">
					💡 Check console for global presence demo messages
				</p>
			</div>
		</div>
	);
}

// Window size demo component  
function WindowSizeDemo() {
	const { width, height } = useWindowSize();
	const { width: roundedWidth } = useWindowSize({ 
		widthSelector: (w) => Math.round(w / 100) * 100 
	});
	
	return (
		<div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
			<h3 className="text-xl font-semibold mb-4 text-purple-900">🖥️ Window Size</h3>
			<div className="space-y-2">
				<p className="text-purple-800">
					Width: <span className="font-mono bg-white px-2 py-1 rounded">{width}px</span>
				</p>
				<p className="text-purple-800">
					Height: <span className="font-mono bg-white px-2 py-1 rounded">{height}px</span>
				</p>
				<p className="text-purple-800">
					Rounded Width: <span className="font-mono bg-white px-2 py-1 rounded">{roundedWidth}px</span>
				</p>
				<p className="text-sm text-purple-600 mt-3">
					Resize your browser window to see updates using <code>useWindowSize</code>
				</p>
			</div>
		</div>
	);
}

// Enhanced media query demo
function EnhancedMediaQueryDemo() {
	const breakpoint = useCurrentBreakpoint();
	const mediaState = useMediaQueryState();
	
	return (
		<div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200">
			<h3 className="text-xl font-semibold mb-4 text-indigo-900">📱 Enhanced Media Queries</h3>
			<div className="space-y-3">
				<p className="text-indigo-800">
					Current Breakpoint: <span className="font-mono bg-white px-2 py-1 rounded">{breakpoint}</span>
				</p>
				<div className="grid grid-cols-2 gap-3 text-sm">
					{Object.entries(mediaState).map(([key, value]) => (
						<div key={key} className="flex justify-between">
							<span className="text-indigo-700">{key}:</span>
							<span className={`font-mono px-2 py-1 rounded text-xs ${
								value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
							}`}>
								{value ? 'true' : 'false'}
							</span>
						</div>
					))}
				</div>
				<p className="text-sm text-indigo-600 mt-3">
					All media query states using <code>useCurrentBreakpoint</code> and <code>useMediaQueryState</code>
				</p>
			</div>
		</div>
	);
}

// Fake cursor toggle component
function FakeCursorDemo() {
	const [enabled, setEnabled] = useState(false);
	
	return (
		<div className="p-6 bg-red-50 rounded-lg border border-red-200">
			<h3 className="text-xl font-semibold mb-4 text-red-900">🎯 Fake Cursor (Global Presence Demo)</h3>
			<div className="space-y-3">
				<p className="text-red-800">
					This demonstrates <code>createGlobalPresence</code> - when enabled, it hides the real cursor and shows a custom one.
				</p>
				<button
					type="button"
					onClick={() => setEnabled(!enabled)}
					className={`px-4 py-2 rounded font-medium transition ${
						enabled 
							? 'bg-red-500 text-white hover:bg-red-600' 
							: 'bg-red-200 text-red-800 hover:bg-red-300'
					}`}
				>
					{enabled ? 'Disable' : 'Enable'} Fake Cursor
				</button>
				<p className="text-sm text-red-600">
					The global presence hook ensures the cursor style is only applied when at least one FakeCursor component is mounted.
				</p>
			</div>
			{enabled && <FakeCursor />}
		</div>
	);
}

export default function Home() {
	return (
		<main className="min-h-screen p-8 bg-gray-50">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold text-center mb-4">useSyncExternalStore Examples</h1>
				<p className="text-center mb-8 text-gray-600 max-w-3xl mx-auto">
					Comprehensive examples of React's <code className="bg-gray-100 px-1 rounded">useSyncExternalStore</code> hook 
					for creating external stores. Each demo showcases different patterns and use cases.
				</p>

				<div className="space-y-8">
					{/* Counter Section */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-gray-800">🔢 Counter Store</h2>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<CounterDispatcher />
							<CounterDisplay />
						</div>
					</section>

					{/* Browser Events Section */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-gray-800">🌐 Browser Events</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
							<MousePositionDemo />
							<ScrollPositionDemo />
							<WindowSizeDemo />
						</div>
					</section>

					{/* Media Queries Section */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-gray-800">📱 Responsive Media Queries</h2>
						<div className="space-y-6">
							<EnhancedMediaQueryDemo />
							<MediaQueryDemo />
						</div>
					</section>

					{/* Global Presence Section */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-gray-800">🎭 Global Presence</h2>
						<FakeCursorDemo />
					</section>

					{/* Performance Test Section */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-gray-800">🚀 Performance Test</h2>
						<div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
							<h3 className="text-xl font-semibold mb-4 text-orange-900">requestAnimationFrame Batching</h3>
							<p className="text-sm text-orange-700 mb-4">
								These components all use the same media query store. When you resize the window, they should all update
								simultaneously via requestAnimationFrame batching for optimal performance.
							</p>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								<SimpleMediaQueryTest id="1" color="bg-red-500" />
								<SimpleMediaQueryTest id="2" color="bg-blue-500" />
								<SimpleMediaQueryTest id="3" color="bg-green-500" />
								<SimpleMediaQueryTest id="4" color="bg-purple-500" />
								<SimpleMediaQueryTest id="5" color="bg-pink-500" />
								<SimpleMediaQueryTest id="6" color="bg-indigo-500" />
								<SimpleMediaQueryTest id="7" color="bg-yellow-500" />
								<SimpleMediaQueryTest id="8" color="bg-teal-500" />
								<SimpleMediaQueryTest id="9" color="bg-gray-500" />
								<SimpleMediaQueryTest id="10" color="bg-orange-500" />
								<SimpleMediaQueryTest id="11" color="bg-cyan-500" />
								<SimpleMediaQueryTest id="12" color="bg-emerald-500" />
							</div>

							<div className="mt-4 p-3 bg-white rounded border-l-4 border-orange-500">
								<p className="text-sm text-orange-800">
									<strong>💡 How to test:</strong> Resize your browser window and watch the render times. All components
									should update together in the same frame thanks to rAF batching in the media query store.
								</p>
							</div>
						</div>
					</section>

					{/* Documentation Section */}
					<section>
						<h2 className="text-2xl font-semibold mb-4 text-gray-800">📚 How it Works</h2>
						<div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
							<h3 className="text-lg font-semibold mb-3 text-yellow-900">useSyncExternalStore API</h3>
							<p className="text-yellow-800 mb-3">
								The <code className="bg-gray-100 p-1 rounded">useSyncExternalStore</code> hook allows
								components to subscribe to an external data store. It takes three arguments:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-yellow-800">
								<li>
									<code className="bg-gray-100 p-1 rounded">subscribe</code>: Function to register a callback to be called
									when the store changes
								</li>
								<li>
									<code className="bg-gray-100 p-1 rounded">getSnapshot</code>: Function to get the current value from the
									store  
								</li>
								<li>
									<code className="bg-gray-100 p-1 rounded">getServerSnapshot</code>: Function to get the initial value
									for SSR (optional)
								</li>
							</ul>
							
							<h3 className="text-lg font-semibold mb-3 mt-6 text-yellow-900">Available Hooks</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
								<div>
									<h4 className="font-semibold text-yellow-800">State Management</h4>
									<ul className="list-disc list-inside text-yellow-700 ml-2">
										<li><code>useCounter</code> - Shared counter state</li>
										<li><code>createGlobalPresence</code> - Global mount tracking</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold text-yellow-800">Browser Events</h4>
									<ul className="list-disc list-inside text-yellow-700 ml-2">
										<li><code>useMousePosition</code> - Mouse coordinates</li>
										<li><code>useScrollY</code> - Scroll position</li>
										<li><code>useWindowSize</code> - Window dimensions</li>
										<li><code>useMediaQuery</code> - Responsive breakpoints</li>
									</ul>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
