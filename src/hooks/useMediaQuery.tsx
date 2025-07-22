import { useSyncExternalStore } from "react";

// Media query breakpoints
export const mediaQueries = {
	mobile: "(max-width: 767px)",
	tablet: "(min-width: 768px) and (max-width: 1023px)",
	desktop: "(min-width: 1024px)",
	large: "(min-width: 1440px)",
	dark: "(prefers-color-scheme: dark)",
	reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

type MediaQueryStore = {
	on: (query: string, listener: () => void) => void;
	off: (query: string, listener: () => void) => void;
	get: (query: string) => boolean;
};

type MediaQuerySubscription = {
	mediaQuery: MediaQueryList;
	listeners: Set<() => void>;
	cleanup: () => void;
};

function createMediaQueryStore(): MediaQueryStore {
	const subscriptions = new Map<string, MediaQuerySubscription>();

	return {
		on(query: string, listener: () => void) {
			// SSR safety check
			if (typeof window === "undefined") return;

			// First time seeing this query? Set up browser listener
			if (!subscriptions.has(query)) {
				// Get browser's MediaQueryList object for this query
				const mediaQuery = window.matchMedia(query);

				// Set to track all components listening to this query
				const listeners = new Set<() => void>();

				/**
				 * Notification function called when browser detects query change
				 * Uses requestAnimationFrame for performance optimization:
				 * - Batches multiple rapid changes (e.g., during window drag)
				 * - Ensures updates happen at optimal rendering time
				 * - Prevents layout thrashing
				 */
				const notifyListeners = () => {
					requestAnimationFrame(() => {
						// Notify all components subscribed to this query
						for (const listener of listeners) {
							listener();
						}
					});
				};

				// Set up browser listener for this media query
				mediaQuery.addEventListener("change", notifyListeners);

				// Store everything needed for this query
				subscriptions.set(query, {
					mediaQuery, // Browser's MediaQueryList object
					listeners, // Set of component callbacks
					cleanup: () => {
						// Remove browser listener and clear from store
						mediaQuery.removeEventListener("change", notifyListeners);
						subscriptions.delete(query);
					},
				});
			}

			// Add this component's listener to the shared set
			const subscription = subscriptions.get(query);
			if (subscription) {
				subscription.listeners.add(listener);
			}
		},

		off(query: string, listener: () => void) {
			const subscription = subscriptions.get(query);
			if (subscription) {
				// Remove this component's listener
				subscription.listeners.delete(listener);

				// No more components listening? Clean up browser listener
				if (subscription.listeners.size === 0) {
					subscription.cleanup();
				}
			}
		},

		get(query: string) {
			if (typeof window === "undefined") {
				// Return default values for SSR
				if (query === mediaQueries.desktop) return true;
				return false;
			}
			return window.matchMedia(query).matches;
		},
	};
}

// Create single store instance that all components will share
// This ensures we have shared listeners and don't duplicate browser subscriptions
const MediaQueryStore: MediaQueryStore = createMediaQueryStore();

/**
 * Custom hook to subscribe to a media query
 * @param query - CSS media query string
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
	return useSyncExternalStore(
		(listener) => {
			// Subscribe to changes
			MediaQueryStore.on(query, listener);

			// Return cleanup function
			return () => {
				MediaQueryStore.off(query, listener);
			};
		},
		() => MediaQueryStore.get(query), // Client snapshot
		() => {
			// Server snapshot - return default values
			if (query === mediaQueries.desktop) return true;
			return false;
		},
	);
}

// Convenience hooks for common breakpoints
export const useIsMobile = () => useMediaQuery(mediaQueries.mobile);
export const useIsTablet = () => useMediaQuery(mediaQueries.tablet);
export const useIsDesktop = () => useMediaQuery(mediaQueries.desktop);
export const useIsLarge = () => useMediaQuery(mediaQueries.large);
export const useIsDark = () => useMediaQuery(mediaQueries.dark);
export const useReducedMotion = () => useMediaQuery(mediaQueries.reducedMotion);

// Hook to get current breakpoint name
export const useCurrentBreakpoint = () => {
	const isMobile = useIsMobile();
	const isTablet = useIsTablet();
	const isDesktop = useIsDesktop();
	const isLarge = useIsLarge();

	if (isLarge) return "large";
	if (isDesktop) return "desktop";
	if (isTablet) return "tablet";
	if (isMobile) return "mobile";
	return "unknown";
};

// Hook to get all media query states
export const useMediaQueryState = () => {
	const isMobile = useIsMobile();
	const isTablet = useIsTablet();
	const isDesktop = useIsDesktop();
	const isLarge = useIsLarge();
	const isDark = useIsDark();
	const isReducedMotion = useReducedMotion();

	return {
		isMobile,
		isTablet,
		isDesktop,
		isLarge,
		isDark,
		isReducedMotion,
	};
};

// Export the store instance for advanced usage
export { MediaQueryStore };
