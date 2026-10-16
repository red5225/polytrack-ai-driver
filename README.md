# PolyTrack AI Driver — lightweight Intel Mac build

A tiny native macOS wrapper for PolyTrack. It uses macOS's built-in WebKit rather than shipping Electron/Chromium and Node.js, so the app package should be dramatically smaller and may fit under 10 MB. The build logs report the actual app, ZIP, and DMG sizes; **under 10 MB is a target, not a verified result until Actions finishes**.

## Compatibility

- Intel Mac (x86_64)
- macOS Monterey 12 or later
- Internet connection required; the game is loaded from the official PolyTrack website and is not bundled.
- GitHub Actions targets macOS 12 deployment and packages a `.app`, `.zip`, and `.dmg`.

## Build

Run the **Build lightweight Intel Mac app** workflow from GitHub Actions or push to `main`. Download the artifact named `PolyTrack-AI-Driver-Intel-macOS-Monterey`.

## AI integration status

The existing small injected overlay is retained, but a real game-control adapter is still required. The current project checks for `window.__POLYTRACK_AI_BRIDGE__` with `getState()` and `setControls({steer, throttle, brake})`. PolyTrack does not document this bridge, so this repository does **not** claim that AI can currently drive every selected map. Package success does not prove the AI is controlling gameplay.

## Notes

- The app does not bundle or redistribute PolyTrack's assets.
- The wrapper uses Apple's built-in WebKit and system frameworks, avoiding Electron's bundled runtime.
- The app is not signed/notarized with an Apple Developer ID; macOS may require you to approve it before opening.
