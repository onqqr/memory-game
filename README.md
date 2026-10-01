# Memory Game

pixel-style memory matching game built with vanilla HTML, CSS, and JS (ES modules).  
flip cards to find 8 pairs. moves and pairs are counted. after a win, the score is saved to a local leaderboard (top 10 in `localStorage`).

## Features

- 4×4 board, 8 image pairs
- shuffle on load and New Game
- victory and leaderboard modals (`<dialog>`)
- results persist in the browser

## Run locally

ES modules need a local HTTP server (`file://` may block scripts).

```bash
npx --yes serve .
```
open URL from terminal (usually `http://localhost:3000`).
you can also use Live Server in VS Code or any static file server.

## Project structure

- `index.html` — empty `<body>` with a module script, UI is built via `document.createElement`
- `css/` — styles
- `js/` — game modules
- `assets/` — card images and icons

## Task

https://github.com/rolling-scopes-school/tasks/tree/master/tasks/memory-game
