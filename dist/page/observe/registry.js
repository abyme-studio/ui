// src/page/observe/registry.ts
import { watchEarlier, watchers } from "../../foundation/kernel/watchers.js";
import { accessibleName } from "../../foundation/text/accessible-name.js";
import { checkMarks, isOffLimits, isSecret, textOf } from "./marks.js";
var entries = /* @__PURE__ */ new Map();
var byId = /* @__PURE__ */ new Map();
var retired = /* @__PURE__ */ new Map();
var retiredLimit = 500;
var offPage = /* @__PURE__ */ new Map();
var partsOf = /* @__PURE__ */ new WeakMap();
var count = 0;
var listeners = /* @__PURE__ */ new Map();
function watch(instance, parts, {
  controlled,
  commits,
  agent,
  options
}) {
  const entry = {
    ref: `c${++count}`,
    id: instance.id,
    component: instance.name,
    agent,
    options,
    controlled,
    commits,
    started: /* @__PURE__ */ new Map(),
    instance: new WeakRef(instance),
    secret: agent?.secret
  };
  entries.set(entry.ref, entry);
  byId.set(entry.id, entry);
  partsOf.set(instance, parts);
  return () => retire(entry);
}
function retire(entry) {
  if (entries.get(entry.ref) !== entry) {
    return;
  }
  entries.delete(entry.ref);
  if (byId.get(entry.id) === entry) {
    byId.delete(entry.id);
  }
  if (!entry.key || entry.secret || entry.offLimits) {
    return;
  }
  const queued = retired.get(entry.key);
  if (queued?.at === count) {
    queued.refs.push(entry.ref);
  } else {
    retired.delete(entry.key);
    retired.set(entry.key, { at: count, refs: [entry.ref] });
    if (retired.size > retiredLimit) {
      retired.delete(retired.keys().next().value);
    }
  }
  const state = entry.instance.deref()?.get();
  const keys = stateKeys(entry, state ?? {}).filter((key) => key !== "open");
  if (!state || !keys.length) {
    return;
  }
  const last = {
    ref: entry.ref,
    component: entry.component,
    offPage: true,
    actions: []
  };
  if (entry.label) {
    last.label = entry.label;
  }
  if (entry.row) {
    last.row = entry.row;
  }
  for (const key of keys) {
    if (key === "value" || state[key] !== "") {
      last[key] = state[key] ?? null;
    }
  }
  offPage.delete(entry.ref);
  offPage.set(entry.ref, last);
  if (offPage.size > 50) {
    offPage.delete(offPage.keys().next().value);
  }
}
var secret = /\b(password|current-password|new-password|one-time-code|cc-[a-z-]+)\b/i;
var stateKeys = (entry, state) => entry.controlled ?? ["open", "value", "checked"].filter((key) => key in state);
var setterOf = (key) => `set${key[0].toUpperCase()}${key.slice(1)}`;
function remember(entry, parts) {
  const first = !entry.key;
  const elements = parts.map((part) => part.el);
  checkMarks(elements);
  entry.label = componentLabel(parts);
  entry.row = rowOf(parts);
  entry.secret ||= isSecret(elements) || parts.some(
    ({ el }) => secret.test(
      `${el.getAttribute("type")} ${el.getAttribute("autocomplete")}`
    )
  );
  entry.offLimits = isOffLimits(elements) || elements.every((el) => el.type === "hidden");
  entry.key = `${entry.component}|${entry.label}|${entry.row}`;
  if (!first) {
    return;
  }
  const queue = retired.get(entry.key)?.refs;
  const ref = queue?.shift();
  if (!ref) {
    return;
  }
  if (!queue.length) {
    retired.delete(entry.key);
  }
  offPage.delete(ref);
  entries.delete(entry.ref);
  entry.ref = ref;
  entries.set(ref, entry);
}
function bound(instance) {
  return [...partsOf.get(instance)?.values() ?? []].filter(
    (part) => part.el?.isConnected
  );
}
function componentLabel(parts) {
  const keyless = (slot) => parts.find((part) => part.slot === slot && !part.key)?.el;
  const first = (slot) => {
    const found = parts.filter((part) => part.slot === slot);
    return new Set(found.map((part) => part.key)).size === 1 ? found[0].el : found.find((part) => !part.key)?.el;
  };
  const text = (el) => el && textOf(el).slice(0, 80) || void 0;
  const label = text(first("label"));
  if (label) {
    return label;
  }
  const group = keyless("group") ?? keyless("root");
  const name = group && accessibleName(group);
  if (name) {
    return name;
  }
  const input = parts.find(
    (part) => part.slot === "input" || part.slot === "control" && part.el.matches("input, textarea")
  )?.el;
  const popup = parts.find((part) => part.slot === "content")?.el;
  const field = input && !popup?.contains(input) && accessibleName(input);
  if (field) {
    return field;
  }
  const root = keyless("root");
  const button = root && (root.tagName === "BUTTON" || root.getAttribute("role") === "button") ? root : void 0;
  const named = (el) => el && accessibleName(el) || text(el);
  const shown = named(first("title")) ?? named(first("heading")) ?? named(first("trigger")) ?? named(button);
  if (shown) {
    return shown;
  }
  const keys = new Set(parts.map((part) => part.key).filter(Boolean));
  const keyed = keys.size === 1 ? parts.filter((part) => part.key) : [];
  for (const part of [...parts.filter((part2) => !part2.key), ...keyed]) {
    const name2 = accessibleName(part.el);
    if (name2) {
      return name2;
    }
  }
}
function rowOf(parts) {
  const el = (parts.find((part) => part.slot === "trigger" || part.slot === "root") ?? parts[0])?.el;
  const row = el?.closest("li, tr, [role=row], [role=listitem]");
  if (!row || parts.some((part) => part.el.contains(row))) {
    return;
  }
  const own = parts.flatMap(({ el: el2 }) => [
    el2,
    ...el2.labels ?? []
  ]);
  const words = [];
  const walker = row.ownerDocument.createTreeWalker(row, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!own.some((el2) => el2.contains(node)) && !isOffLimits([node.parentElement]) && node.textContent?.trim()) {
      words.push(node.textContent.trim());
    }
  }
  return words.join(" ").slice(0, 80) || void 0;
}
function report(id, key, value, details, previous) {
  const entry = byId.get(id);
  if (!listeners.size || !entry) {
    return;
  }
  const { source } = details;
  const held = !!entry.commits?.includes(key) && source !== "programmatic" && source !== "agent";
  if (entry.started.has(key) !== held) {
    entry.started.set(key, held ? previous : value);
  }
  send(entry, key, value, details, previous, held || void 0);
}
function settle(id, key, value, details) {
  const entry = byId.get(id);
  if (!listeners.size || !entry?.started.has(key)) {
    return;
  }
  send(entry, key, value, details, entry.started.get(key), false);
  entry.started.delete(key);
}
function send(entry, key, value, details, previous, live) {
  const instance = entry.instance.deref();
  if (!instance) {
    return;
  }
  const parts = bound(instance);
  if (parts.length) {
    remember(entry, parts);
  }
  const change = {
    ref: entry.ref,
    component: entry.component,
    id: entry.id,
    key,
    value: entry.secret ? "[redacted]" : value,
    previous: entry.secret ? "[redacted]" : previous,
    reason: details.reason,
    source: details.source
  };
  if (entry.label) {
    change.label = entry.label;
  }
  if (entry.row) {
    change.row = entry.row;
  }
  listeners.forEach(
    (hearsSteps, listener) => (live ?? hearsSteps) === hearsSteps && listener(change, parts)
  );
}
function install() {
  if (typeof document === "undefined") {
    return;
  }
  if (watchers.add) {
    return;
  }
  watchers.add = watch;
  watchers.change = report;
  watchers.commit = settle;
  watchEarlier();
}
function listen(listener, live = false) {
  install();
  listeners.set(listener, live);
  return () => {
    listeners.delete(listener);
  };
}
function elementsOf(ref) {
  const instance = entries.get(ref)?.instance.deref();
  return instance ? bound(instance).map((part) => part.el) : [];
}
export {
  bound,
  componentLabel,
  elementsOf,
  entries,
  install,
  listen,
  offPage,
  remember,
  retire,
  rowOf,
  setterOf,
  stateKeys
};
