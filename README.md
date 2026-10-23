# Anoop Dubey × ᥫ᭡ 𝘼𝘿𝘿𝙔

A cinematic, single-page personal identity website with a procedural Liquid Glass look. Built with plain HTML, CSS and JavaScript. No build step, no dependencies, no backend.

## Preview flow

Black screen → glass forms fade in → "Designed by." → "ᥫ᭡ 𝘼𝘿𝘿𝙔" → blur-zoom dissolve → main page.

The intro lasts about 4 seconds and plays automatically. It is skipped on reload within the same browser session, and it respects `prefers-reduced-motion`.

## Files

```
index.html   # structure, intro, hero, social dock
style.css    # glass styling, typography, layout, motion
script.js    # intro timing, canvas liquid glass, pointer parallax, magnetic dock
```

## Features

- Cinematic intro with a failsafe, so it never gets stuck
- Liquid glass forms drawn on Canvas 2D: fresnel rims, specular streaks, chromatic dispersion, inner shading
- Glass badge, name and dock using layered translucency and `backdrop-filter`
- Floating social dock with keyboard focus states and a magnetic hover (desktop only)
- Mobile friendly: safe-area insets, capped pixel ratio, reduced frame rate on small screens, no cursor effects on touch devices
- Paused rendering when the tab is hidden
- Works even if the Google Font fails to load (fallback fonts are set)
- The ADDY signature uses separate font stacks for the symbol and the letters to avoid missing-glyph boxes on Android

## Links

| Item | URL |
|---|---|
| Portfolio | https://anoopdubey.vercel.app |
| CodeNova | https://codenova-tech.vercel.app |
| GitHub | https://github.com/Anoopkumard12220 |
| LinkedIn | https://www.linkedin.com/in/anoop-dubey-4a52a5380/ |
| Instagram | https://www.instagram.com/heyy.anoop_/ |
| Email | mailto:Anoop.dev56@gmail.com |

## Deploy

### Vercel
1. Push the three files to the root of a GitHub repo.
2. Go to vercel.com, then New Project, and import the repo.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty.
4. Deploy.

### Netlify
1. Add new site, then Import from Git, and pick the repo.
2. Leave Build command empty. Set Publish directory to `/`.
3. Deploy.

## Run locally

Open `index.html` in a browser. Or serve the folder:

```
npx serve .
```

## Customize

- **Intro timing:** the `setTimeout` values in the Intro section of `script.js`
- **Glass blobs:** the `blobs` array in `script.js` (position `x`/`y` as screen fractions, size `r`)
- **Colors:** gradients on `.name .d`, `.addy` and `.dock .contact` in `style.css`
- **Reset the intro in dev:** clear `addy-intro` from sessionStorage, or open in a new tab

## Browser support

Modern Chrome, Edge, Safari and Firefox, on desktop and mobile. Without `backdrop-filter` support, the glass panels fall back to a translucent gradient.

## Credits

Design and code: Anoop Dubey (ADDY), Founder @CodeNova.

© 2026 Anoop Dubey. All rights reserved.
