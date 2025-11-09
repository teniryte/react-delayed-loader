[![npm version](https://img.shields.io/npm/v/react-delayed-loader.svg?color=blue)](https://www.npmjs.com/package/react-delayed-loader) [![npm downloads](https://img.shields.io/npm/dm/react-delayed-loader.svg?color=brightgreen)](https://www.npmjs.com/package/react-delayed-loader) [![GitHub stars](https://img.shields.io/github/stars/teniryte/react-delayed-loader?style=social)](https://github.com/teniryte/react-delayed-loader) [![License](https://img.shields.io/github/license/teniryte/react-delayed-loader)](LICENSE)

# react-delayed-loader

A React hook that delays the loader display to improve user experience by preventing flickering for quick operations.

If loading takes less than `options.after`, the hook returns `false`. If loading takes more than `options.after`, the hook returns `true` for at least `options.minDuration` milliseconds.

## Features

- **Prevents flickering**: Only shows loader for operations that take longer than the specified delay.
- **Minimum duration**: Ensures loader is visible for a minimum time to avoid jarring transitions.
- **Performance-optimized**: Uses `performance.now()` for precise timing.
- **TypeScript support**: Fully typed with TypeScript.

## Installation

```bash
npm install react-delayed-loader
# or
yarn add react-delayed-loader
# or
bun add react-delayed-loader
```

## Usage

```tsx
import { useDelayedLoader } from 'react-delayed-loader';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  // ...
  
  const showLoading = useDelayedLoader(isLoading, {
    after: 300,        // Show loader if loading takes longer than 300 milliseconds
    minDuration: 500   // Keep loader visible for at least 500ms
  });

  return (
    <div>
      {showLoading && <Spinner />}
      {/* Your content */}
    </div>
  );
}
```

## API

### `useDelayedLoader(isLoading, options)`

**Parameters:**
- `isLoading` (boolean): Current loading state.
- `options` (object):
  - `after` (number): Delay before showing loader (default: 300ms).
  - `minDuration` (number): Minimum time to keep loader visible (default: 500ms).

**Returns:**
- `boolean`: Whether to show the loader

## License

MIT
