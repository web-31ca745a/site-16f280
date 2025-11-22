# ApologyVite - Agent Guidelines

## Build/Test Commands
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (no warnings allowed)
- No test suite configured

## Tech Stack
React 18.2 + Vite 5 + Tailwind CSS 3.4 + Framer Motion + Howler.js

## Code Style

### Imports
- React hooks first, then external libraries, then local components/data
- Group by: React → external libs → components → data/utils

### Components
- Use function declarations: `const ComponentName = () => {}`
- Export default at end of file
- JSX uses double quotes, JavaScript uses single quotes
- Props destructured in function params when simple

### Styling
- Tailwind utility classes, custom colors in `lis-*` and `brutal-*` namespaces
- Use `clsx` for conditional classes
- Custom shadows: `shadow-brutal`, `shadow-brutal-lg`, `shadow-soft`
- Rounded corners: use `rounded-soft` (8px) instead of default
- Life is Strange inspired pastel palette - maintain aesthetic consistency
- Polaroids in margins live in `MarginDoodles` (per-tab image lists and position maps); keep them out of main content and preserve natural aspect ratios.

### State & Effects
- `useState` for local state, no global state management
- Clean up effects (especially Howler sounds) in return functions
- Dependencies arrays must be complete (ESLint enforced)

### Naming
- Components: PascalCase, files: PascalCase.jsx
- Event handlers: `handle*` or `toggle*`
- Boolean state: `is*` or `has*`

### Error Handling
- Defensive checks before DOM/audio operations (`if (!sound) return`)
- No formal error boundaries, rely on React defaults
