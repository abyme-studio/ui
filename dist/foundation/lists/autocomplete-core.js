// src/foundation/lists/autocomplete-core.ts
import "./async-options.js";
import { pressKeepsFocus } from "../focus/press-keeps-focus.js";
import { typedBeforeBind } from "../forms/form.js";
import { isApple } from "../platform/platform.js";
import { fuzzyFilter } from "../text/fuzzy.js";
import {
  createFilteredListbox
} from "./listbox.js";
import { listStep } from "./listbox-keyboard.js";
import { keepListing } from "./listbox-listing.js";
import { bindFieldName } from "./field-name.js";
import { listStepKeys, positionAttrs, registerItem } from "./listbox-parts.js";
import {
  announceResults,
  createLoadMore,
  matchMode
} from "./listbox-search.js";
import { idPart } from "../kernel/attrs.js";
import { direct, live } from "../kernel/live.js";
import { elements } from "../kernel/elements.js";
var engineFilter = (filter) => filter === "fuzzy" ? fuzzyFilter : filter;
function createAutocompleteCore(context, config) {
  const { id, store, options } = context;
  let mountsQueued = false;
  let cause = null;
  const loadMore = createLoadMore({
    count: () => listbox.count(),
    status: () => store.get().status,
    onLoadMore: () => options().onLoadMore
  });
  const listbox = createFilteredListbox({
    store,
    focus: () => store.get().focusInList ? "real" : "virtual",
    items: config.items,
    emptyItems: config.emptyItems,
    toKey: (value) => String(value ?? ""),
    filter: () => engineFilter(config.filter()),
    // Scores rank data items. Composed ones keep their order, since frameworks own theirs.
    rank: () => config.filter() === "fuzzy" || typeof config.filter() === "function",
    query: config.query,
    loop: () => options().loop ?? true,
    skipDisabled: true,
    active: () => store.get().open,
    onHighlight: config.onHighlight,
    onLastReached: loadMore.reached,
    container: config.container,
    scrollRoot: config.scrollRoot,
    onRegister() {
      if (mountsQueued) {
        return;
      }
      mountsQueued = true;
      queueMicrotask(() => {
        mountsQueued = false;
        store.set({ mounts: store.get().mounts + 1 });
      });
    }
  });
  keepListing(store, listbox);
  const itemProps = (key) => context.props("item", key);
  function settledHighlight(fresh) {
    const { highlighted, settled } = store.get();
    if (!config.items() && !settled) {
      return highlighted;
    }
    const mode = config.autoHighlight();
    const auto = mode === "always" || mode === "typing" && config.query() !== "";
    const kept = highlighted !== null && listbox.entries().some((entry) => entry.key === highlighted);
    const best = auto ? config.preferred?.(listbox) ?? listbox.firstEnabled() ?? null : null;
    return fresh && auto ? best : kept ? highlighted : best;
  }
  function settle(fresh, why) {
    const target = settledHighlight(fresh);
    if (target !== store.get().highlighted) {
      config.highlight(target, why);
    }
  }
  function navigate(event) {
    const step = listStep(event, { apple: isApple() });
    if (step === void 0 || event.altKey && event.key === "ArrowUp") {
      return false;
    }
    if (!store.get().open) {
      if (!config.open || step !== 1 && step !== -1) {
        return false;
      }
      event.preventDefault();
      config.open(event, step === -1 ? "last" : "first");
      return true;
    }
    event.preventDefault();
    const key = listbox.stepKey(step);
    if (key !== void 0) {
      config.highlight(key, { reason: "list-navigation", event });
    }
    return true;
  }
  let previousQuery = config.query();
  let previous = store.get();
  store.subscribe(() => {
    const state = store.get();
    const before = previous;
    previous = state;
    const query = config.query();
    if (query !== previousQuery) {
      previousQuery = query;
      const why = cause ?? { reason: "imperative" };
      cause = null;
      settle(true, why);
    } else if (state.mounts !== before.mounts && !config.settlesMount?.() || state.items !== before.items || state.settled !== before.settled) {
      const why = before.highlighted === null ? null : { reason: "item-removed" };
      if (state.highlighted !== before.highlighted) {
        config.highlight(state.highlighted, why);
      } else {
        settle(false, why);
      }
    }
  });
  let autoMode = config.autoHighlight();
  context.onOptions(() => {
    const mode = config.autoHighlight();
    if (mode === autoMode) {
      return;
    }
    autoMode = mode;
    queueMicrotask(() => settle(false, { reason: "imperative" }));
  });
  announceResults({
    store,
    query: config.query,
    count: () => listbox.count(),
    loading: () => store.get().status === "loading",
    shown: () => store.get().open,
    silent: () => elements(context, "status").length > 0,
    announcement: () => options().announcement
  });
  return {
    listbox,
    itemProps,
    settledHighlight,
    settle,
    navigate,
    loadMore,
    matchQuery: config.query,
    matchMode: () => matchMode(config.filter()),
    // Says what changes the text next, before it changes.
    cause(reason, event) {
      cause = { reason, event };
    },
    // The pointer highlights what it moves onto. Touch never does, since a
    // finger scrolling past isn't choosing.
    hover(key, event) {
      if (event.pointerType === "touch" || !store.get().open || itemProps(key)?.disabled) {
        return;
      }
      if (store.get().highlighted !== key) {
        config.highlight(key, { reason: "item-hover", event });
      }
    },
    // Whether nothing matches. Composed items register once the list binds, so until then it's not known.
    isEmpty: (state) => (!!config.items() || state.settled) && listbox.count() === 0,
    itemCount: () => listbox.count(),
    filterQuery: config.query,
    // The id aria-activedescendant points at, once that element is in the page.
    activeDescendant(state) {
      const { highlighted } = state;
      if (!state.open || state.focusInList || highlighted === null) {
        return void 0;
      }
      if (!listbox.element(highlighted)?.isConnected) {
        return void 0;
      }
      return `${id}-option-${idPart(highlighted)}`;
    }
  };
}
function fieldPart() {
  const text = (api, state) => api.internal.text(state);
  return {
    role: "combobox",
    focus: "native",
    keys: listStepKeys,
    attrs: (state, { id, api }) => ({
      id: `${id}-input`,
      value: text(api, state),
      autocomplete: "off",
      autocapitalize: "none",
      spellcheck: "false",
      "aria-expanded": String(state.open)
    }),
    live: live((state, { api }) => ({
      "aria-activedescendant": api.internal.activeDescendant(state)
    })),
    on: {
      input: (event, { api, el }) => api.internal.typed(el, event),
      keydown: (event, { api }) => api.internal.onInputKeyDown(event)
    },
    bind(el, { api, id, store }) {
      bindFieldName(el, store, id);
      const input = el;
      let shown;
      const write = () => {
        const value = text(api, store.get());
        if (value === shown) {
          return;
        }
        shown = value;
        if (input.value !== value) {
          input.value = value;
        }
      };
      if (typedBeforeBind(input, text(api, store.get()))) {
        api.internal.typed(input);
      }
      write();
      return store.subscribe(write);
    }
  };
}
function optionPart() {
  return {
    props: {
      value: "string",
      label: "string",
      keywords: "list",
      disabled: "boolean",
      index: "number",
      group: { kind: "string", from: "group.id" }
    },
    role: "option",
    focus: "active-descendant",
    attrs: (state, { id, key, props, api }) => ({
      id: `${id}-option-${idPart(key)}`,
      // Real focus reaches options only after a screen reader's tap moved it into the list.
      tabindex: state.focusInList ? "-1" : void 0,
      "aria-disabled": props.disabled ? "true" : void 0,
      // Written by `live`, so moving the highlight doesn't render every option.
      "aria-selected": void 0,
      ...positionAttrs(props.index, api.internal.listbox),
      hidden: api.internal.listbox.matches(key, props) ? void 0 : "",
      "data-disabled": props.disabled ? "" : void 0
    }),
    // Typing hides options without rendering them.
    direct: direct(["hidden"]),
    live: live((state, { key }) => ({
      "aria-selected": state.highlighted === key ? "true" : "false",
      "data-highlighted": state.highlighted === key ? "" : void 0
    })),
    on: {
      ...pressKeepsFocus,
      pointermove: (event, { api, key }) => api.internal.hover(key, event)
    },
    press: ({ api, key }, event) => api.internal.press(key, event),
    bind(el, { api, key, props }) {
      const unregister = registerItem(el, { api, key, props });
      return () => {
        unregister();
        el.removeAttribute("data-highlighted");
        el.setAttribute("aria-selected", "false");
      };
    }
  };
}
export {
  createAutocompleteCore,
  fieldPart,
  optionPart
};
