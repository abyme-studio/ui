# abyme-studio's fork of UI SDK: `@ui-sdk/core` 0.1.0-beta.10, built

Branch `core-dist`: the package as published to npm (first commit), and each fix on top of its
`dist`, so a package manager can pin it by commit. The same fixes in source, against the release
tag, are on branch `abyme`. Each fix and where upstream tracks it, so the fork can go once upstream
takes them:

- A popup's trigger that a press opens (Dialog, Popover) says `role="button"` when it is rendered as
  another element, as Menu's trigger already does; it already wires Enter and Space for it.
  Upstream: no issue yet.

Used by abyme's tessera spike (`spikes/tessera-bench`, the tests by role), whose kit renders every
part as a `<box>`.
