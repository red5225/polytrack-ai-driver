# AI adapter contract

The agent is gated on a supported telemetry/control bridge to avoid random inputs or falsely claiming success.

Expected bridge:

```js
window.__POLYTRACK_AI_BRIDGE__ = {
  getState() { return { speed: 0, lateralError: 0, headingError: 0, curvature: 0, crashed: false, finished: false }; },
  setControls({ steer, throttle, brake }) { /* connect to game controls */ }
};
```

The website does not document this API. A game-specific adapter must be reverse-engineered and revalidated whenever PolyTrack changes. The included linear policy performs bounded online updates from observed state/reward samples; it is a small adaptive controller, not a pretrained neural network.
