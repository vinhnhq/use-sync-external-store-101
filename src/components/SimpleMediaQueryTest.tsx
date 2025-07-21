"use client";

import { useCurrentBreakpoint, useIsDesktop, useIsMobile, useIsTablet } from "@/store/useMediaQuery";

interface SimpleMediaQueryTestProps {
	id: string;
	color?: string;
}

export function SimpleMediaQueryTest({ id, color = "bg-blue-500" }: SimpleMediaQueryTestProps) {
	const isMobile = useIsMobile();
	const isTablet = useIsTablet();
	const isDesktop = useIsDesktop();
	const currentBreakpoint = useCurrentBreakpoint();

	// Simple timestamp to show when component renders
	const renderTime = new Date().toLocaleTimeString();

	return (
		<div className={`p-4 rounded-lg text-white ${color} transition-all duration-200`}>
			<div className="text-sm font-mono mb-2">Component #{id}</div>

			<div className="text-lg font-bold mb-1">
				{currentBreakpoint.toUpperCase()}
			</div>

			<div className="text-xs opacity-90 space-y-1">
				<div>Render time: {renderTime}</div>
				<div className="flex gap-1 mt-2">
					<span className={`px-1 rounded ${isMobile ? 'bg-white text-black' : 'bg-black bg-opacity-30'}`}>
						M
					</span>
					<span className={`px-1 rounded ${isTablet ? 'bg-white text-black' : 'bg-black bg-opacity-30'}`}>
						T
					</span>
					<span className={`px-1 rounded ${isDesktop ? 'bg-white text-black' : 'bg-black bg-opacity-30'}`}>
						D
					</span>
				</div>
			</div>
		</div>
	);
}
