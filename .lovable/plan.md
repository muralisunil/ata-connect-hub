

# Add Blue and Emerald Color Themes (alongside existing Gold)

## Approach

Add a theme switcher with three color themes: **Gold** (current), **Blue**, and **Emerald**. Themes are applied via CSS class on `<html>` (e.g., `theme-blue`, `theme-emerald`), stored in `localStorage`, and toggled from the Navbar.

## Changes

### 1. `src/index.css` — Add two new theme classes
Add `.theme-blue` and `.theme-emerald` blocks that override the same CSS custom properties (`--primary`, `--secondary`, `--saffron`, `--gold`, `--saffron-dark`, `--ring`, etc.):

- **Blue**: Primary `210 90% 50%`, secondary `230 60% 45%`, gradient tones in blue/sky
- **Emerald**: Primary `160 80% 38%`, secondary `170 60% 30%`, gradient tones in green/teal

Each theme class overrides only the color tokens — layout, fonts, radius stay the same.

### 2. `src/hooks/use-color-theme.ts` — New hook
- Reads/writes theme to `localStorage` key `color-theme`
- Applies class to `document.documentElement` (`theme-gold` | `theme-blue` | `theme-emerald`)
- Returns `{ theme, setTheme, themes }` 

### 3. `src/components/ThemeSwitcher.tsx` — New component
- Small dropdown or segmented button group with three colored circles (gold, blue, emerald)
- Uses `use-color-theme` hook
- Placed in the Navbar next to the "Join Us" button

### 4. `src/components/Navbar.tsx` — Add ThemeSwitcher
- Import and render `<ThemeSwitcher />` in desktop nav and mobile nav

### 5. `src/index.css` utilities — Make gradient utilities theme-aware
The existing `.gradient-saffron`, `.gradient-hero`, `.text-gradient-saffron` already reference CSS variables (`--saffron`, `--gold`, `--saffron-dark`), so they'll automatically adapt when the theme class overrides those variables. No changes needed to page components.

