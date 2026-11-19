// src/foundation/selection/indicator.ts
import { layoutBox } from "../platform/layout.js";
function bindIndicator(options) {
  const update = () => {
    const list = options.list();
    const item = options.active();
    options.write(item && list ? layoutBox(item, list) : void 0);
  };
  const observer = typeof ResizeObserver === "undefined" ? void 0 : new ResizeObserver(update);
  const observed = /* @__PURE__ */ new Set();
  const remeasure = () => {
    const list = options.list();
    const targets = new Set(
      list ? [list, ...list.querySelectorAll(options.itemSelector)] : []
    );
    for (const target of observed) {
      if (!targets.has(target)) {
        observed.delete(target);
        observer?.unobserve(target);
      }
    }
    for (const target of targets) {
      if (observed.has(target)) {
        continue;
      }
      observed.add(target);
      observer?.observe(target);
    }
    update();
  };
  const unsubscribe = options.subscribe(remeasure);
  queueMicrotask(remeasure);
  return () => {
    unsubscribe();
    observer?.disconnect();
  };
}
function directionBetween(from, to, orientation) {
  if (!from || !to) {
    return "none";
  }
  const [a, b] = orientation === "vertical" ? [from.top, to.top] : [from.left, to.left];
  if (b === a) {
    return "none";
  }
  if (orientation === "vertical") {
    return b > a ? "down" : "up";
  }
  return b > a ? "right" : "left";
}
export {
  bindIndicator,
  directionBetween
};
