import type { SlotFactory } from "../../foundation/kernel/primitive-types.js";
import type { TriggerMenuContentProps, TriggerMenuContentState, TriggerMenuEmptyState, TriggerMenuHintState, TriggerMenuInputState, TriggerMenuItemProps, TriggerMenuItemState, TriggerMenuStatusState } from "./trigger-menu.js";
import type { TriggerMenuApi, TriggerMenuState } from "./trigger-menu-api.js";
type ItemProps = TriggerMenuItemProps<unknown> & {
    /** @internal The group the item is in. */
    group?: string;
};
type EmptyProps = {
    /** @internal Hides the message while items match, for web components that can't skip rendering it. */
    stash?: boolean;
};
type TextProps = {
    /** @internal Writes the default text, for parts rendered without content of their own. */
    text?: boolean;
};
declare const triggerMenuSlots: (slot: SlotFactory<TriggerMenuState, TriggerMenuApi>) => {
    input: import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, import("../../renderer.js").BaseSlotProps, NoInfer<TriggerMenuInputState>>;
    content: import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, NoInfer<TriggerMenuContentProps> & import("../../renderer.js").BaseSlotProps, NoInfer<TriggerMenuContentState>>;
    list: import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, import("../../renderer.js").BaseSlotProps, NoInfer<TriggerMenuContentState>>;
    item: import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, NoInfer<ItemProps> & import("../../renderer.js").BaseSlotProps, NoInfer<TriggerMenuItemState>>;
    "item-icon": import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, NoInfer<import("../../renderer.js").ItemIconProps & {
        item?: string;
    }> & import("../../renderer.js").BaseSlotProps, NoInfer<{
        mirror: boolean;
    }>>;
    group: import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, import("../../renderer.js").BaseSlotProps, {}>;
    "group-label": import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, NoInfer<{
        group?: string;
    }> & import("../../renderer.js").BaseSlotProps, {}>;
    separator: import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, import("../../renderer.js").BaseSlotProps, {}>;
    empty: import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, NoInfer<EmptyProps> & import("../../renderer.js").BaseSlotProps, NoInfer<TriggerMenuEmptyState>>;
    status: import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, NoInfer<TextProps> & import("../../renderer.js").BaseSlotProps, NoInfer<TriggerMenuStatusState>>;
    hint: import("../../index.js").SlotDefinition<TriggerMenuState, TriggerMenuApi, NoInfer<TextProps> & import("../../renderer.js").BaseSlotProps, NoInfer<TriggerMenuHintState>>;
};
export { triggerMenuSlots, type TextProps };
