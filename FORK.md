# abyme-studio's fork of UI SDK: `@ui-sdk/core` 0.1.0-beta.10, built

Branch `core-dist`: the package as published to npm (first commit), and each fix on top of its
`dist`, so a package manager can pin it by commit. The fixes are in `dist` only: written in source,
the trigger fix needs a field in `PopupState` that every popup's `selects` must then list. Each fix
and where upstream tracks it, so the fork can go once upstream takes them:

- A popup's trigger that a press opens (Dialog, Popover) says `role="button"` when it is rendered as
  another element, as Menu's trigger already does; it already wires Enter and Space for it.
  Upstream: no issue yet.

- An element's own document, not the page's global one, for `activeElement`, focus checks and the
  typeahead's tree walker; and `globalThis.__uiSdkDocument`, where a kit on the page names its own
  document for modality listeners and `activeElement()`. Moved here from abyme's former pnpm patch
  (`patches/@ui-sdk__core@0.1.0-beta.10.patch`, from abyme's ts-gpu-kit commits ae81562fbc and
  50793b345a). The `ownerDocument` hunks are upstream material; `__uiSdkDocument` is a hook of
  abyme's own. Upstream: no issue yet.

Used by abyme's tessera spike (`spikes/tessera-bench`, the tests by role), whose kit renders every
part as a `<box>`.
