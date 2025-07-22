# useSyncExternalStore 101

A comprehensive collection of React hooks built with `useSyncExternalStore` demonstrating external state management, browser API integration, and performance optimization patterns.

## 🎯 What This Project Demonstrates

This project showcases practical implementations of React's `useSyncExternalStore` hook for:
- **External state management** with shared stores
- **Browser API integration** (mouse, scroll, resize, media queries)
- **Performance optimization** using requestAnimationFrame batching
- **Preventing state tearing** in React's concurrent mode
- **SSR-safe implementations** for server-side rendering
- **Global presence tracking** for managing side effects

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

Open [http://localhost:3000](http://localhost:3000) to see all the interactive examples.

## 📦 Available Hooks

### 🔢 State Management

#### `useCounter`
**File:** `src/hooks/useCounter.tsx`

Simple external counter store with increment, decrement, and reset functionality.

```typescript
import useCounter, { Counter } from '@/hooks/useCounter';

function MyComponent() {
  const count = useCounter();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={Counter.increment}>+</button>
      <button onClick={Counter.decrement}>-</button>
      <button onClick={Counter.reset}>Reset</button>
    </div>
  );
}
```

#### `createGlobalPresence`
**File:** `src/hooks/useGlobalPresence.tsx`

Creates a hook that tracks when components are mounted/unmounted globally, useful for managing side effects.

```typescript
import createGlobalPresence from '@/hooks/useGlobalPresence';

const useFakeCursorPresence = createGlobalPresence({
  onMount: () => document.body.classList.add('cursor-none'),
  onUnmount: () => document.body.classList.remove('cursor-none'),
});

function FakeCursor() {
  useFakeCursorPresence(); // Automatically manages global state
  return <div className="custom-cursor" />;
}
```

### 🌐 Browser Events

#### `useMousePosition`
**File:** `src/hooks/useMousePosition.tsx`

Tracks real-time mouse coordinates with optimized performance using requestAnimationFrame.

```typescript
import useMousePosition from '@/hooks/useMousePosition';

function MouseTracker() {
  const [x, y] = useMousePosition();
  return <div>Mouse: {x}, {y}</div>;
}
```

#### `useScrollY` & `useScrollYFloored`
**File:** `src/hooks/useScrollY.tsx`

Track vertical scroll position with optional value transformation.

```typescript
import { useScrollY, useScrollYFloored } from '@/hooks/useScrollY';

function ScrollTracker() {
  const scrollY = useScrollY();
  const flooredScroll = useScrollYFloored(100); // Rounds to nearest 100px

  return (
    <div>
      <p>Scroll: {scrollY}px</p>
      <p>Floored: {flooredScroll}px</p>
    </div>
  );
}
```

#### `useWindowSize`
**File:** `src/hooks/useWindowSize.tsx`

Monitor window dimensions with optional selector functions for value transformation.

```typescript
import { useWindowSize } from '@/hooks/useWindowSize';

function WindowTracker() {
  const { width, height } = useWindowSize();
  const { width: roundedWidth } = useWindowSize({
    widthSelector: (w) => Math.round(w / 100) * 100
  });

  return <div>{width} × {height} (rounded: {roundedWidth})</div>;
}
```

### 📱 Media Queries

#### `useMediaQuery` & Convenience Hooks
**File:** `src/hooks/useMediaQuery.tsx`

Comprehensive media query system with built-in breakpoints and accessibility support.

```typescript
import {
  useMediaQuery,
  useIsMobile,
  useIsDesktop,
  useCurrentBreakpoint,
  useMediaQueryState
} from '@/hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const breakpoint = useCurrentBreakpoint();
  const mediaState = useMediaQueryState();

  return (
    <div>
      <p>Mobile: {isMobile ? 'Yes' : 'No'}</p>
      <p>Dark mode: {isDark ? 'Yes' : 'No'}</p>
      <p>Breakpoint: {breakpoint}</p>
    </div>
  );
}
```

**Built-in breakpoints:**
- `useIsMobile()` - ≤767px
- `useIsTablet()` - 768px-1023px
- `useIsDesktop()` - ≥1024px
- `useIsLarge()` - ≥1440px
- `useIsDark()` - Dark mode preference
- `useReducedMotion()` - Reduced motion preference

## 🧩 Components

### Interactive Demos

- **`CounterDispatcher`** - Counter controls with input field
- **`CounterDisplay`** - Read-only counter with computed properties
- **`FakeCursor`** - Custom cursor using global presence
- **`MediaQueryDemo`** - Comprehensive responsive demo
- **`SimpleMediaQueryTest`** - Performance testing component

## 🔧 Key Technical Features

### ⚡ RequestAnimationFrame Optimization

Media query and mouse position hooks use rAF for optimal performance:

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
- Eliminates layout thrashing during rapid changes
- Batches multiple updates into single render cycles
- Ensures updates happen at optimal rendering time
- Improves performance with many subscribing components

### 🛡️ SSR Safety

All hooks handle server-side rendering properly:

```typescript
return useSyncExternalStore(
  subscribe,
  () => getClientValue(), // Client snapshot
  () => getServerValue()  // Server snapshot - prevents hydration mismatches
);
```

### 🧹 Automatic Cleanup

Event listeners are automatically managed:
- Shared listeners across multiple component instances
- Automatic cleanup when no components are subscribed
- Memory leak prevention
- Optimal resource usage

### 🚫 State Tearing Prevention

All hooks prevent state tearing in React's concurrent mode by using `useSyncExternalStore`, ensuring consistent state across all components during concurrent renders.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Interactive demo showcase
│   ├── layout.tsx            # App layout
│   └── globals.css           # Global styles
├── components/
│   ├── CounterDispatcher.tsx # Counter with controls
│   ├── CounterDisplay.tsx    # Counter display
│   ├── FakeCursor.tsx        # Custom cursor demo
│   ├── MediaQueryDemo.tsx    # Media query examples
│   └── SimpleMediaQueryTest.tsx # Performance testing
└── hooks/
    ├── useCounter.tsx        # External counter store
    ├── useGlobalPresence.tsx # Global presence tracking
    ├── useMousePosition.tsx  # Mouse coordinate tracking
    ├── useScrollY.tsx        # Scroll position tracking
    ├── useWindowSize.tsx     # Window size tracking
    └── useMediaQuery.tsx     # Media query system
```

## 🎨 Tech Stack

- **React 18** with `useSyncExternalStore`
- **Next.js 14** with App Router
- **TypeScript** for complete type safety
- **Tailwind CSS** for responsive styling
- **Bun** for fast package management

## 🧪 Testing the Examples

The live demo includes several interactive tests:

### 1. **Counter Store**
- Multiple components sharing the same counter state
- Real-time synchronization across displays
- Demonstrates external state management

### 2. **Browser Events**
- **Mouse tracking** - Move your mouse to see coordinates
- **Scroll tracking** - Scroll the page to see position updates
- **Window resize** - Resize browser to see dimension changes

### 3. **Media Queries**
- **Responsive breakpoints** - Resize to see breakpoint changes
- **rAF performance test** - 12 components updating simultaneously
- **Accessibility support** - Dark mode and reduced motion detection

### 4. **Global Presence**
- **Fake cursor** - Toggle to see global presence management
- **Console logging** - Check browser console for presence events

## 💡 Performance Testing

The demo includes a **requestAnimationFrame batching test** with 12 components:

1. Resize your browser window rapidly
2. Watch the render timestamps in all colored components
3. Notice how all components update **simultaneously** with identical timestamps
4. Compare performance with traditional event handling approaches

## ⚡ Understanding State Tearing

State tearing occurs when different components render inconsistent views of external state during React's concurrent rendering. This project demonstrates prevention through:

### The Problem
```typescript
// Component A renders with: { count: 5 }
// External store updates to: { count: 6 }
// Component B renders with: { count: 6 }
// Result: UI shows inconsistent state (tearing)
```

### The Solution
`useSyncExternalStore` prevents tearing by:
- **Detecting inconsistencies** during concurrent renders
- **Forcing synchronous rendering** when tearing is detected
- **Ensuring consistent state snapshots** across all components
- **Maintaining performance** through intelligent batching

### Visual Demonstrations
- **[Tearable Dots Demo](https://tearabledots.com/)** - Interactive tearing visualization
- **[React UI Tearing](https://interbolt.org/blog/react-ui-tearing/)** - Comprehensive article

## 🎯 Use Cases & Patterns

### When to Use These Hooks

✅ **Perfect for:**
- Browser API integration (resize, scroll, media queries)
- Real-time data that changes frequently
- Performance-critical subscriptions
- Global state that needs to be SSR-safe
- External data sources (WebSockets, local storage)

❌ **Not ideal for:**
- Simple local component state (use `useState`)
- Server state (use libraries like TanStack Query)
- Complex client state graphs (consider Zustand, Redux)

### Advanced Patterns

The project demonstrates several advanced patterns:
- **Shared subscription management** - Multiple components, single listener
- **Selector functions** - Transform values before consumption
- **Global presence tracking** - Coordinate effects across components
- **Performance optimization** - rAF batching and cleanup
- **SSR compatibility** - Safe server/client rendering

## 📚 Learn More

### Core Documentation
- [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) - Official React docs
- [Next.js App Router](https://nextjs.org/docs/app) - App Router guide

### Understanding State Tearing
- [Tearable Dots Demo](https://tearabledots.com/) - Interactive visualization
- [React UI Tearing](https://interbolt.org/blog/react-ui-tearing/) - Detailed explanation

### Browser APIs
- [Window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) - Media query API
- [RequestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) - Animation optimization

---

**🎮 Try the interactive demos - resize your window, move your mouse, and scroll to see the magic! ✨**
