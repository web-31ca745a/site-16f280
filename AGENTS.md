# ApologyVite - Agent Guidelines

## Build/Test Commands
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (no warnings allowed)
- No test suite configured

## Repo Remotes
- **Local Git Server**: `origin` at `http://192.168.50.117:30008/imakesound/bella-apology-site.git` (master branch)
- **GitHub (Public Hosting)**: `github` at `https://github.com/web-31ca745a/site-16f280.git` (master branch)
  - Live site: `https://web-31ca745a.github.io/site-16f280/`
  - Uses GitHub Pages (served from `gh-pages` branch)
  - **Random repo/username for privacy** - virtually unfindable

## Deployment Workflow

### Development
```bash
npm run dev  # Local development server
```

### Deploy to GitHub Pages
1. **Build and Deploy**:
   ```bash
   npm run build
   npx gh-pages -d dist --repo https://TOKEN@github.com/web-31ca745a/site-16f280.git
   ```
   - **Ask user for GitHub Personal Access Token** (do not store in repo)
   - This deploys to `gh-pages` branch (what GitHub Pages serves)

2. **Commit Source Changes**:
   ```bash
   git add -A
   git commit -m "Your commit message"
   git push https://TOKEN@github.com/web-31ca745a/site-16f280.git master
   ```
   - This updates the `master` branch source code

3. **Wait 1-2 minutes** for GitHub Pages to rebuild and deploy

### Important Notes
- **Asset Paths**: All paths must be relative (`./images/...`, `./audio/...`) not absolute (`/images/...`)
  - This is because the site is hosted at `/site-16f280/` subdirectory
  - `vite.config.js` has `base: './'` for relative path support
- **File Size Limits**: 
  - GitHub has 100 MB file limit per file (soft limit 50 MB with warnings)
  - Current videos: `coqueta_63mb.mp4` (63 MB), `perla_40mb.mp4` (40 MB)
  - Total repo size should stay under 1 GB
- **Hard Refresh**: Users may need Ctrl+Shift+R after deployments to clear cache

## Environment Variables
- `VITE_HIDE_TEXT` - Set to `'true'` in `.env` to hide personal text content (for sharing preview)
  - Affects: `FormattedText` component and `TabFuture` paragraphs
  - Replaces text with block characters (████)
  - Restart dev server after changing
  - `.env` is gitignored - safe to toggle locally

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

## DrawTogether Component - Collaborative Drawing Plan

The `DrawTogether` component in `TabFuture` allows for collaborative drawing between you and Bella.

### Workflow:
1. **You draw a base image** - Draw half of something meaningful (e.g., half a butterfly, half a heart, etc.)
2. **Download your drawing** - Use the Download button to save it as PNG
3. **Add to project** - Place the downloaded image in `/public/images/` (e.g., `base-drawing.png`)
4. **Set as base image** - In `TabFuture.jsx`, pass it to DrawTogether:
   ```jsx
   <DrawTogether baseImage="/images/base-drawing.png" />
   ```
5. **She completes it** - When Bella visits the site, your drawing loads as the background and she can add to it or complete it

### Technical Details:
- Canvas dimensions fixed at 800x600 internally for cross-device consistency
- Displays responsively with 4:3 aspect ratio (max-width: 4xl)
- Coordinates scale properly between mobile and desktop
- Drawing persists in localStorage (saved automatically)
- Features: Undo, Save, Download, Clear, 10 colors, pen/eraser tools
- Touch-enabled for mobile drawing

### Suggested Ideas:
- Half a blue morpho butterfly (ties into constellation game theme)
- Two hands reaching toward each other
- A landscape she can add to
- Half a heart or constellation pattern

## AestheticPlayer Component - Audio Waveform Visualizer

The `AestheticPlayer` component displays an audio player with reactive waveforms that respond to the audio in real-time.

### Current Usage:
- Currently used in `TabMemories` ("Our Moments") with test track
- Audio file: `/audio/Syd Matters - Obstacles.mp3`

### How to Add to Other Tabs:
1. **Import the component** in the tab file:
   ```jsx
   import AestheticPlayer from '../interactive/AestheticPlayer';
   ```

2. **Add state management** (if you want a close button):
   ```jsx
   const [showPlayer, setShowPlayer] = useState(true);
   ```

3. **Place the player** in the JSX:
   ```jsx
   {showPlayer && (
       <div className="max-w-4xl mx-auto mb-6">
           <AestheticPlayer 
               track={{ src: '/audio/Your-Audio-File.mp3' }}
               onClose={() => setShowPlayer(false)}
           />
       </div>
   )}
   ```

4. **Without close button** (player always visible):
   ```jsx
   <div className="max-w-4xl mx-auto mb-6">
       <AestheticPlayer 
           track={{ src: '/audio/Your-Audio-File.mp3' }}
       />
   </div>
   ```

### Technical Details:
- Uses Howler.js with Web Audio API for real-time frequency analysis
- Reactive waveform (64 frequency bins) with pastel pink/purple gradient
- Background starfield animation matching site aesthetic
- Features: Play/pause, seek by clicking waveform, time display
- Mobile responsive with proper scaling
- Dark background (`#2a2535`) with white sketchy border
- Handwriting font for time display

### To Replace Audio:
1. Place new audio file in `/public/audio/`
2. Update the `src` prop in the `track` object:
   ```jsx
   track={{ src: '/audio/New-Song.mp3' }}
   ```

### Styling Notes:
- Max width: `max-w-3xl` (adjustable per tab)
- Waveform colors: `#f9a8d4` (pastel pink) to `#d8b4fe` (pastel lavender)
- Amplitude sensitivity: `0.7` (prevents clipping while staying reactive)
- Border: `3px` white with `70%` opacity
