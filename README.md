# PolyTrack AI Driver

An experimental Intel-macOS app that opens PolyTrack and adds an AI-driver overlay. The goal is to drive the map you select in the game, rather than hard-coding a single track.

## Important status

This is an **experimental integration scaffold**, not a verified winning AI yet. PolyTrack's game state and controls are internal to its changing game bundle. The injected adapter deliberately checks for a compatible state bridge and reports when it cannot find one; it does not pretend that a model is driving when it isn't. The included online-learning controller updates a small policy from telemetry once a valid adapter is connected. It is not a pretrained neural network.

The app loads the official PolyTrack website; it does not bundle or redistribute the game's copyrighted assets. Internet access is required. Respect the game's terms and use this only for personal gameplay.

## Target

- Intel Mac (`x64`) running macOS Monterey 12 or later
- Electron app packaged as `.dmg` and `.zip` by GitHub Actions
- PolyTrack map selection remains in the game: select a map, start a run, then enable AI Driver

## Run locally

Requires Node.js 20 and Xcode Command Line Tools on macOS.

```sh
npm install
npm start
```

## Build locally

```sh
npm install
npm run dist:mac:x64
```

Artifacts are written to `dist/`.

## GitHub Actions

Push to `main` or run **Build Intel Mac app** manually from Actions. The workflow builds x64 macOS packages and uploads them as an artifact. A GitHub-hosted build is not a test on a physical Monterey Mac; verify the downloaded app on your target machine.

## AI integration status / next step

Open DevTools from the app menu (`View → Toggle Developer Tools`). The overlay reports whether the game adapter found telemetry. The current adapter supports an explicit bridge contract (`window.__POLYTRACK_AI_BRIDGE__`) with `getState()` and `setControls({steer, throttle, brake})`. PolyTrack does not document this bridge, so it must be connected to the current game bundle before the driver can control a live run. Without valid telemetry, the AI remains safely disabled. See `src/ai/README.md`.

## Safety and compatibility

- The app does not modify game files on disk.
- Steering/throttle are sent only through the configured adapter.
- The Stop button disables the controller immediately.
- Online learning is local to the current session; no gameplay telemetry is uploaded.
- Compatibility with future PolyTrack site changes is not guaranteed.
