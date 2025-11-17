function replay(events, containerId = "map") {

  const target = document.getElementById(containerId);

  if (!target) {
    console.error("Map container not found:", containerId);
    return;
  }

  let start = events[0].time;

  events.forEach((ev, i) => {
    const delay = ev.time - start;

    setTimeout(() => {

      const touches = ev.touches.map((t, idx) =>
        new Touch({
          identifier: idx,        // stable per finger
          target: target,         // IMPORTANT: Leaflet listens here
          clientX: t.x,
          clientY: t.y,
          pageX: t.x,
          pageY: t.y,
          radiusX: 10,
          radiusY: 10,
          rotationAngle: 0,
          force: 0.5
        })
      );

      const event = new TouchEvent(ev.type, {
        cancelable: true,
        bubbles: true,
        touches: touches,
        targetTouches: touches,
        changedTouches: touches
      });

      target.dispatchEvent(event);  // <-- MUST dispatch to map container

    }, delay);

  });

}
