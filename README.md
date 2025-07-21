# useSyncExternalStore Examples

A comprehensive demonstration of React's `useSyncExternalStore` hook with practical examples including external stores, media queries, and requestAnimationFrame optimization.

## 🎯 What This Project Demonstrates

This project showcases how to use React's `useSyncExternalStore` hook to:
- Create external stores that work with React's concurrent features
- Build responsive media query hooks with browser API integration
- Optimize performance using requestAnimationFrame batching
- Handle server-side rendering (SSR) safely
- Share state across multiple components efficiently

## 🚀 Getting Started

```bash
# Clone and install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the examples in action.

## 📋 Examples Included

### 1. Counter Store
**Files:** `src/store/counterStore.ts`, `src/components/Counter.tsx`, `src/components/CounterDisplay.tsx`

- Simple external store with increment/decrement actions
- Demonstrates basic `useSyncExternalStore` usage
- Shows how multiple components can share the same store
- Includes SSR-safe implementation

### 2. Media Query Store with rAF Optimization
**Files:** `src/store/useMediaQuery.ts`, `src/components/MediaQueryDemo.tsx`, `src/components/SimpleMediaQueryTest.tsx`

- Responsive breakpoint detection using `window.matchMedia`
- **RequestAnimationFrame batching** for performance optimization
- Multiple convenience hooks (`useIsMobile`, `useIsTablet`, etc.)
- Accessibility support (dark mode, reduced motion preferences)
- Automatic cleanup of event listeners

### 3. RequestAnimationFrame Testing
**Components:** 12 instances of `SimpleMediaQueryTest`

- Tests rAF batching with multiple components
- Visual demonstration of synchronized updates
- Performance comparison showcase
- Real-time render timestamps

## 🔧 Key Technical Features

### RequestAnimationFrame Optimization

The media query store uses rAF to batch updates for optimal performance:

```typescript
const notifyListeners = () => {
    requestAnimationFrame(() => {
        // All components update in the same frame
        for (const listener of listeners) {
            listener();
        }
    });
};
```

**Benefits:**
- Eliminates layout thrashing during window resize
- Batches multiple rapid changes into single updates
- Ensures updates happen at optimal rendering time
- Improves performance with many subscribing components

### SSR Safety

Both stores handle server-side rendering properly:

```typescript
// Client snapshot
() => store.getState(),
// Server snapshot - prevents hydration mismatches
() => defaultValue
```

### Automatic Cleanup

Media query listeners are automatically managed:
- Shared listeners across components
- Automatic cleanup when no components are subscribed
- Memory leak prevention

## 🧪 Testing the RequestAnimationFrame Behavior

1. **Resize your browser window** and observe the rAF test section
2. Watch the "Render time" timestamps in all 12 colored components
3. Notice how all components update **simultaneously** with identical timestamps
4. Compare this to traditional approaches where updates might be staggered

## 📱 Responsive Breakpoints

The media query system includes these breakpoints:

- **Mobile:** ≤767px
- **Tablet:** 768px - 1023px  
- **Desktop:** 1024px - 1439px
- **Large:** ≥1440px

Plus accessibility preferences:
- **Dark mode:** `prefers-color-scheme: dark`
- **Reduced motion:** `prefers-reduced-motion: reduce`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main demo page
│   ├── layout.tsx            # App layout with Tailwind
│   └── globals.css           # Global styles
├── components/
│   ├── Counter.tsx           # Counter with controls
│   ├── CounterDisplay.tsx    # Read-only counter display
│   ├── MediaQueryDemo.tsx    # Comprehensive media query demo
│   └── SimpleMediaQueryTest.tsx # Simple component for rAF testing
└── store/
    ├── counterStore.ts       # External counter store
    ├── createStore.ts        # Generic store creator utility
    └── useMediaQuery.ts      # Media query store with rAF batching
```

## 🎨 Tech Stack

- **React 18** with `useSyncExternalStore`
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for responsive styling
- **Bun/npm** for package management

## 💡 Key Learnings

### When to Use useSyncExternalStore

- ✅ External data sources (browser APIs, global state)
- ✅ Performance-critical subscriptions
- ✅ When you need React concurrent feature compatibility
- ✅ SSR applications requiring hydration safety

### Performance Benefits

- **Batched updates** via requestAnimationFrame
- **Shared subscriptions** across components
- **Automatic cleanup** prevents memory leaks
- **Optimized re-renders** only when data actually changes

### Browser Integration

- Direct integration with `window.matchMedia`
- Respects user accessibility preferences
- Handles edge cases (SSR, rapid changes)
- Works seamlessly with React's rendering cycle

## 🔍 Advanced Usage

The project demonstrates advanced patterns like:
- Generic store creators (`createStore.ts`)
- Compound hooks (`useCurrentBreakpoint`, `useMediaQueryState`)
- Performance optimization techniques
- TypeScript integration with external stores

## 📚 Learn More

- [useSyncExternalStore Documentation](https://react.dev/reference/react/useSyncExternalStore)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Window.matchMedia API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
- [RequestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

---

**Try resizing your browser window to see the magic happen! ✨**
