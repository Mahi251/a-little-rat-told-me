# A Little Rat Told Me...

A mobile-first interactive rat-sized adventure built with React, TypeScript, Vite, Motion, and original SVG/CSS artwork. It includes six collectible rooms, two mini-games, synthesized optional sound effects, hidden interactions, persistent progress, rat delivery chaos, and a downloadable certificate.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify the project:

```bash
npm test
npm run typecheck
npm run build
npm run preview
```

## Customize it

Edit `src/config/personalization.ts`:

- `friendName`: optional; the finished site works without it.
- `boyfriendName`: defaults to `Cole`.
- `creatorName`: optional.
- `coleMessage`: leave blank unless Cole provided a real message.
- `openingMessage` and `finalMessage`: the personal copy.
- `enableAudio` and `enableEasterEggs`: feature switches.
- `themeColors`: the central color values. Detailed room styling is in `src/styles.css`.

Character art lives in `src/components/Pip.tsx`; room content is organized in `src/rooms/`.

## Publish on GitHub Pages

1. Create a new empty repository on GitHub, for example `a-little-rat-told-me`. Do not add starter files on GitHub because this project already has them.
2. From this project folder, run:

   ```bash
   git init
   git add .
   git commit -m "Build Pip's rat adventure"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/a-little-rat-told-me.git
   git push -u origin main
   ```

3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Open **Actions** and wait for “Deploy to GitHub Pages” to finish.
6. The live address appears in the deploy job and under **Settings → Pages**. It is normally:

   `https://YOUR-USERNAME.github.io/a-little-rat-told-me/`

The workflow derives the repository base path, runs tests and TypeScript checks, builds `dist`, uploads it with the official Pages artifact action, and deploys it with the official Pages action. For root hosting, build with `VITE_BASE_PATH=/`.

## Progress and replay

Progress is stored only in the visitor's browser using `localStorage`. The restart button in Emergency Rat Delivery clears it. There is no backend, tracking, authentication, or external runtime API.
