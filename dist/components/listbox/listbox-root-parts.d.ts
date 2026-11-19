import type { ListboxItemIndicatorProps, ListboxItemIndicatorState, ListboxItemProps, ListboxItemState, ListboxState } from "./listbox-root.js";
import type { ListboxApi, ListboxStore } from "./listbox-root-api.js";
import type { SlotFactory } from "../../foundation/kernel/primitive-types.js";
type ItemProps = ListboxItemProps<unknown> & {
    /** @internal The group the item is in. */
    group?: string;
};
type IndicatorProps = ListboxItemIndicatorProps & {
    /** @internal The key of the item the indicator is in. */
    item?: string;
};
declare const listboxSlots: (slot: SlotFactory<ListboxStore, ListboxApi>) => {
    root: import("../../index.js").SlotDefinition<ListboxStore, ListboxApi, import("../../renderer.js").BaseSlotProps, NoInfer<ListboxState>>;
    item: import("../../index.js").SlotDefinition<ListboxStore, ListboxApi, NoInfer<ItemProps> & import("../../renderer.js").BaseSlotProps, NoInfer<ListboxItemState>>;
    "item-indicator": import("../../index.js").SlotDefinition<ListboxStore, ListboxApi, NoInfer<IndicatorProps> & import("../../renderer.js").BaseSlotProps, NoInfer<ListboxItemIndicatorState>>;
    "item-icon": import("../../index.js").SlotDefinition<ListboxStore, ListboxApi, NoInfer<import("../../renderer.js").ItemIconProps & {
        item?: string;
    }> & import("../../renderer.js").BaseSlotProps, NoInfer<{
        mirror: boolean;
    }>>;
    group: import("../../index.js").SlotDefinition<ListboxStore, ListboxApi, import("../../renderer.js").BaseSlotProps, {}>;
    "group-label": import("../../index.js").SlotDefinition<ListboxStore, ListboxApi, NoInfer<{
        group?: string;
    }> & import("../../renderer.js").BaseSlotProps, {}>;
    separator: import("../../index.js").SlotDefinition<ListboxStore, ListboxApi, import("../../renderer.js").BaseSlotProps, {}>;
    "form-input": import("../../index.js").SlotDefinition<ListboxStore, ListboxApi, import("../../renderer.js").BaseSlotProps, {}>;
    "value-input": import("../../index.js").SlotDefinition<ListboxStore, ListboxApi, NoInfer<{
        value: string;
    }> & import("../../renderer.js").BaseSlotProps, {}>;
};
export { listboxSlots };
