let events = [];

function capture(e) {
  const t = [...e.touches].map(t => ({ x: t.clientX, y: t.clientY }));
  events.push({
    type: e.type,
    touches: t,
    time: performance.now()
  });
}

["touchstart", "touchmove", "touchend", "touchcancel"].forEach(evt =>
  document.addEventListener(evt, capture, { passive: false })
);

console.log("Recording touch events...");
