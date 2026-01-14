# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A weather forecast web application built with Vue 2.7, TypeScript, and Webpack. Uses the AMap (高德地图) API for IP location, geocoding, and weather data. The app displays weather forecasts with charts (ECharts) and allows users to search cities and manage favorites.

## Key Commands

### Development
```bash
pnpm dev              # Start development server
pnpm build            # Production build
pnpm build:analyze    # Build with bundle analyzer
pnpm build:profile    # Build with performance profiling
pnpm build:gzip       # Build with gzip compression
pnpm preview          # Preview production build
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix ESLint issues
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting
pnpm type-check       # TypeScript type checking (no emit)
```

### Git Hooks
- **Pre-commit**: Runs `lint-staged` which formats and lints staged files
- **Commit message**: Uses commitlint with conventional commits format

## Architecture

### State Management (Vuex)
The store is modular with two main modules:
- **IP module** (`src/store/modules/IP.ts`): Manages user's local location via IP lookup and geocoding. Initializes with fallback to `VUE_APP_LOCAL_LOCATION` env var (defaults to "北京市")
- **City module** (`src/store/modules/City.ts`): Manages favorite cities stored in localStorage

Both modules are namespaced. Access via `this.$store.getters['IP/localLocation']` or use `mapGetters`.

### Routing
Two main routes defined in `src/router/router.ts`:
- `/` - Home page with search and favorites
- `/city/:adcode` - City detail page (lazy loaded)

Hash mode routing is used.

### API Layer
All API calls go through `src/api/gmap.ts`:
- `getIpLocation()` - IP-based location detection
- `getGeocode(address)` - Convert city name to geographic data (adcode)
- `getWeather(adcode, extensions)` - Get weather data (base=current, all=forecast)

The `http` utility (`src/utils/http/index.ts`) is an Axios wrapper with:
- Base URL from `process.env.VUE_APP_AMAP_API`
- 10s timeout
- Custom Toast notifications for errors
- Automatic response data unwrapping

### Utility Modules
- **Toast** (`src/utils/toast/`): Programmatic toast notifications via TSX component. Use `Toast.success(msg)` or `Toast.error(msg)`. Only one toast visible at a time.
- **Storage** (`src/utils/localstorage/`): Type-safe localStorage wrapper with JSON serialization. Methods: `set<T>`, `get<T>`, `remove`, `clear`.
- **Performance** (`src/utils/performance/`): Web Vitals monitoring (LCP, FCP, TTFB) that logs to console in production mode.
- **Git Info** (`src/utils/git/`): Logs git version info in production using `git-revision-webpack-plugin`.
- **Weather Icon** (`src/utils/weather-icon/`): Maps weather conditions to icon identifiers.

### Component Architecture
- **Header.vue**: Shows current location, favorite button, and weather info. Manages favorite state synchronization.
- **WeatherChart.vue**: ECharts-based line chart for temperature/weather forecast with custom styling and skeleton loading.
- **SvgIcon.vue**: Generic SVG icon wrapper using `vue-svg-loader`.
- **SkeletonItem.vue**: Loading skeleton component.

### Build Configuration
Webpack configuration is split across `webpack/` directory:
- `module.config.js` - Loaders (Vue, TypeScript, Sass, SVG)
- `plugin.config.js` - Plugins including HtmlWebpackPlugin, MiniCssExtractPlugin, code-inspector-plugin (dev), BundleAnalyzer (optional)
- `optimization.config.js` - Code splitting and minification
- `server.config.js` - Dev server settings
- `performance.config.js` - Bundle size hints

The main `webpack.config.js` orchestrates these based on environment flags.

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- Warn on `any` types (avoid where possible)
- Unused vars/params starting with `_` are allowed
- All Vue files should use `<script lang="ts">`

### Vue
- Vue 2.7 with Composition API support (though currently using Options API)
- Multi-word component names not required
- Script and style tags in `.vue` files are NOT indented
- Props should have types defined

### Formatting
- 2 spaces indentation, no tabs
- Semicolons required
- Single quotes for strings (except JSX attributes)
- 120 character line limit
- Arrow functions: omit parens for single param
- Trailing commas in objects/arrays (ES5 style)

### Commit Messages
Follow conventional commits:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Build/tooling changes
- `revert`: Revert previous commit
- `build`: Build system changes

Message format: `type: description` (in Chinese based on git history)

## Environment Variables

Set in `.env`, `.env.development`, or `.env.production`:
- `VUE_APP_AMAP_API` - AMap API base URL
- `VUE_APP_LOCAL_LOCATION` - Fallback location (default: "北京市")

Access via `process.env.VUE_APP_*` in code.

## Important Patterns

### Adding a New View
1. Create component in `src/views/`
2. Add route to `src/router/router.ts`
3. Use lazy loading for non-critical routes: `component: () => import('@/views/NewView.vue')`

### Using the Store
```typescript
// In component
import { mapGetters } from 'vuex';

computed: {
  ...mapGetters('IP', ['localLocation', 'localGeocode']),
}

// Dispatch actions
this.$store.dispatch('IP/initLocation');
```

### API Calls with Types
```typescript
import { getWeather } from '@/api/gmap';
import type { WeatherResponseType } from '@/types/gmap';

const data = await getWeather(adcode, 'all');
// data is strongly typed as WeatherResponseType
```

### Working with LocalStorage
```typescript
import storage from '@/utils/localstorage';
import type { FavoriteCity } from '@/types/storage';

const favorites = storage.get<FavoriteCity[]>('favoriteCities', []);
storage.set('favoriteCities', [...favorites, newCity]);
```

## Development Notes

- The project uses **pnpm** as package manager
- Use `@/` alias for imports from `src/` directory
- SVG icons in `src/assets/svgs/` are loaded via `vue-svg-loader` and can be imported as Vue components
- The app includes code-inspector-plugin in dev mode for debugging (check plugin config)
- Performance monitoring (Web Vitals) only runs in production
- Git version info is injected into builds via GitRevisionPlugin
