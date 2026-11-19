import type { AutocompleteArrowState, AutocompleteClearProps, AutocompleteClearState, AutocompleteContentProps, AutocompleteContentState, AutocompleteInputState, AutocompleteItemState } from "./autocomplete.js";
import type { AutocompleteApi, AutocompleteItemMeta, AutocompleteState } from "./autocomplete-api.js";
import { type ListItemTextProps } from "../../foundation/lists/listbox-search.js";
import type { SlotFactory } from "../../foundation/kernel/primitive-types.js";
declare const autocompleteSlots: (slot: SlotFactory<AutocompleteState, AutocompleteApi>) => {
    label: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, {}>;
    input: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, NoInfer<AutocompleteInputState>>;
    trigger: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, NoInfer<AutocompleteInputState>>;
    clear: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, NoInfer<AutocompleteClearProps> & import("../../renderer.js").BaseSlotProps, NoInfer<AutocompleteClearState>>;
    content: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, NoInfer<AutocompleteContentProps> & import("../../renderer.js").BaseSlotProps, NoInfer<AutocompleteContentState>>;
    viewport: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, {}>;
    header: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, {}>;
    list: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, NoInfer<AutocompleteContentState>>;
    item: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, NoInfer<AutocompleteItemMeta> & import("../../renderer.js").BaseSlotProps, NoInfer<AutocompleteItemState>>;
    "item-text": import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, NoInfer<ListItemTextProps> & import("../../renderer.js").BaseSlotProps, NoInfer<import("../../renderer.js").ListItemTextState>>;
    "item-icon": import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, NoInfer<import("../../renderer.js").ItemIconProps & {
        item?: string;
    }> & import("../../renderer.js").BaseSlotProps, NoInfer<{
        mirror: boolean;
    }>>;
    group: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, {}>;
    "group-label": import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, NoInfer<{
        group?: string;
    }> & import("../../renderer.js").BaseSlotProps, {}>;
    separator: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, {}>;
    empty: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, NoInfer<{
        stash?: boolean;
    }> & import("../../renderer.js").BaseSlotProps, NoInfer<{
        loading: boolean;
        empty: boolean;
        query: string;
    }>>;
    status: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, NoInfer<{
        status: import("../../foundation/lists/index.js").AsyncOptionsStatus;
        loading: boolean;
        count: number;
    }>>;
    arrow: import("../../index.js").SlotDefinition<AutocompleteState, AutocompleteApi, import("../../renderer.js").BaseSlotProps, NoInfer<AutocompleteArrowState>>;
};
export { autocompleteSlots };
