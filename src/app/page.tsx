import { Counter } from "@/components/Counter";
import { CounterDisplay } from "@/components/CounterDisplay";
import { MediaQueryDemo } from "@/components/MediaQueryDemo";
import { SimpleMediaQueryTest } from "@/components/SimpleMediaQueryTest";

export default function Home() {
	return (
		<main className="min-h-screen p-8 bg-gray-50">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-8">useSyncExternalStore Examples</h1>

				<p className="text-center mb-8 text-gray-600">
					Examples of using React's <code className="bg-gray-100 px-1 rounded">useSyncExternalStore</code> hook to
					create external stores. This includes a simple counter store and a media query store that uses the browser's{" "}
					<code className="bg-gray-100 px-1 rounded">matchMedia</code> API.
				</p>

				<div className="space-y-8">
					<Counter />
					<CounterDisplay />

					{/* rAF Test Section with Multiple Media Query Components */}
					<div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
						<h3 className="text-xl font-semibold mb-4 text-orange-900">🚀 requestAnimationFrame Test</h3>
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

					<MediaQueryDemo />

					<div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
						<h3 className="text-lg font-semibold mb-2">How it works</h3>
						<p>
							The <code className="bg-gray-100 p-1 rounded">useSyncExternalStore</code> hook from React allows
							components to subscribe to an external data store. The hook takes three arguments:
						</p>
						<ul className="list-disc pl-6 mt-2 space-y-1">
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
					</div>
				</div>
			</div>
		</main>
	);
}
