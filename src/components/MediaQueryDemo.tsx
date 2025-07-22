"use client";

import {
	useCurrentBreakpoint,
	useIsDark,
	useIsDesktop,
	useIsLarge,
	useIsMobile,
	useIsTablet,
	useMediaQueryState,
	useReducedMotion,
} from "@/hooks/useMediaQuery";

export function MediaQueryDemo() {
	// Use individual hooks for specific breakpoints
	const isMobile = useIsMobile();
	const isTablet = useIsTablet();
	const isDesktop = useIsDesktop();
	const isLarge = useIsLarge();
	const isDark = useIsDark();
	const reducedMotion = useReducedMotion();
	const currentBreakpoint = useCurrentBreakpoint();

	// Use the full store state
	const fullState = useMediaQueryState();

	return (
		<div className="space-y-6">
			{/* Media Query Demo Section */}
			<div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
				<h3 className="text-xl font-semibold mb-4 text-blue-900">📱 Media Query Demo</h3>

				{/* Current Breakpoint */}
				<div className="mb-4">
					<h4 className="font-medium text-blue-800 mb-2">Current Breakpoint:</h4>
					<div className="inline-block px-3 py-1 bg-blue-100 rounded-md text-sm font-medium">
						{currentBreakpoint.toUpperCase()}
					</div>
				</div>

				{/* Responsive Message */}
				<div className="mb-4 p-3 bg-white rounded border-l-4 border-blue-500">
					{isMobile && (
						<p className="text-sm">
							📱 <strong>Mobile view</strong> - You're on a small screen (≤767px)
						</p>
					)}
					{isTablet && (
						<p className="text-sm">
							📟 <strong>Tablet view</strong> - You're on a medium screen (768px-1023px)
						</p>
					)}
					{isDesktop && !isLarge && (
						<p className="text-sm">
							💻 <strong>Desktop view</strong> - You're on a large screen (1024px-1439px)
						</p>
					)}
					{isLarge && (
						<p className="text-sm">
							🖥️ <strong>Large view</strong> - You're on an extra large screen (≥1440px)
						</p>
					)}
				</div>

				{/* All Media Query States */}
				<div>
					<h4 className="font-medium text-blue-800 mb-3">All Media Query States:</h4>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
						<StateCard label="Mobile" active={fullState.isMobile} />
						<StateCard label="Tablet" active={fullState.isTablet} />
						<StateCard label="Desktop" active={fullState.isDesktop} />
						<StateCard label="Large" active={fullState.isLarge} />
						<StateCard label="Dark Mode" active={fullState.isDark} />
						<StateCard label="Reduced Motion" active={fullState.isReducedMotion} />
					</div>
				</div>
			</div>

			{/* Responsive Grid Demo */}
			<div className="p-6 bg-green-50 rounded-lg border border-green-200">
				<h3 className="text-xl font-semibold mb-4 text-green-900">🎨 Responsive Layout Demo</h3>

				<div
					className={`
						grid gap-4
						${isMobile ? "grid-cols-1" : ""}
						${isTablet ? "grid-cols-2" : ""}
						${isDesktop && !isLarge ? "grid-cols-3" : ""}
						${isLarge ? "grid-cols-4" : ""}
					`}
				>
					{["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta"].map((id, i) => (
						<div
							key={id}
							className="h-20 bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex items-center justify-center font-medium text-green-800"
						>
							Item {i + 1}
						</div>
					))}
				</div>

				<p className="text-sm text-green-700 mt-3">
					This grid adapts based on screen size:
					{isMobile && " 1 column on mobile"}
					{isTablet && " 2 columns on tablet"}
					{isDesktop && !isLarge && " 3 columns on desktop"}
					{isLarge && " 4 columns on large screens"}
				</p>
			</div>

			{/* Accessibility Demo */}
			<div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
				<h3 className="text-xl font-semibold mb-4 text-purple-900">♿ Accessibility Demo</h3>

				<div className="space-y-3">
					<div className="flex items-center gap-3">
						<span className="text-sm font-medium">Dark Mode Preference:</span>
						<StatusBadge active={isDark} />
					</div>

					<div className="flex items-center gap-3">
						<span className="text-sm font-medium">Reduced Motion Preference:</span>
						<StatusBadge active={reducedMotion} />
					</div>

					<div
						className={`
							mt-4 p-3 rounded transition-all duration-300
							${reducedMotion ? "transform-none" : "hover:scale-105"}
							${isDark ? "bg-gray-800 text-white" : "bg-white border"}
						`}
					>
						<p className="text-sm">
							This element respects your system preferences:
							{isDark && " 🌙 Using dark theme"}
							{reducedMotion && " 🚫 Motion preferences respected"}
							{!reducedMotion && " ✨ Animation preferences enabled"}
						</p>
					</div>
				</div>
			</div>

			{/* Instructions */}
			<div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
				<h3 className="text-lg font-semibold mb-2 text-yellow-900">🧪 Try This:</h3>
				<ul className="text-sm text-yellow-800 space-y-1 list-disc pl-5">
					<li>Resize your browser window to see breakpoint changes</li>
					<li>Toggle your system's dark mode to see the preference</li>
					<li>Change your system's motion preferences (if available)</li>
					<li>Open developer tools and use device simulation</li>
				</ul>
			</div>
		</div>
	);
}

// Helper component for displaying state
function StateCard({ label, active }: { label: string; active: boolean }) {
	return (
		<div
			className={`
				p-3 rounded-lg border text-center text-sm
				${active ? "bg-green-100 border-green-300 text-green-800" : "bg-gray-100 border-gray-300 text-gray-600"}
			`}
		>
			<div className="font-medium">{label}</div>
			<div className="text-xs mt-1">{active ? "✅ Active" : "❌ Inactive"}</div>
		</div>
	);
}

// Helper component for status badges
function StatusBadge({ active }: { active: boolean }) {
	return (
		<span
			className={`
				px-2 py-1 rounded-full text-xs font-medium
				${active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
			`}
		>
			{active ? "Enabled" : "Disabled"}
		</span>
	);
}
