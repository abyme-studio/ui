import type { CommandInputState, CommandItemState, CommandListState, CommandPageProps, CommandState, CommandShortcutProps, CommandShortcutState } from "./command.js";
import { type CommandApi, type CommandItemMeta, type CommandStore } from "./command-api.js";
import { type ListItemTextProps } from "../../foundation/lists/listbox-search.js";
import type { SlotFactory } from "../../foundation/kernel/primitive-types.js";
declare const commandSlots: (slot: SlotFactory<CommandStore, CommandApi>) => {
    root: import("../../index.js").SlotDefinition<CommandStore, CommandApi, import("../../renderer.js").BaseSlotProps, NoInfer<CommandState>>;
    input: import("../../index.js").SlotDefinition<CommandStore, CommandApi, import("../../renderer.js").BaseSlotProps, NoInfer<CommandInputState>>;
    list: import("../../index.js").SlotDefinition<CommandStore, CommandApi, import("../../renderer.js").BaseSlotProps, NoInfer<CommandListState>>;
    item: import("../../index.js").SlotDefinition<CommandStore, CommandApi, NoInfer<CommandItemMeta> & import("../../renderer.js").BaseSlotProps, NoInfer<CommandItemState>>;
    "item-text": import("../../index.js").SlotDefinition<CommandStore, CommandApi, NoInfer<ListItemTextProps> & import("../../renderer.js").BaseSlotProps, NoInfer<import("../../renderer.js").ListItemTextState>>;
    "item-icon": import("../../index.js").SlotDefinition<CommandStore, CommandApi, NoInfer<import("../../renderer.js").ItemIconProps & {
        item?: string;
    }> & import("../../renderer.js").BaseSlotProps, NoInfer<{
        mirror: boolean;
    }>>;
    group: import("../../index.js").SlotDefinition<CommandStore, CommandApi, import("../../renderer.js").BaseSlotProps, {}>;
    "group-label": import("../../index.js").SlotDefinition<CommandStore, CommandApi, NoInfer<{
        group?: string;
    }> & import("../../renderer.js").BaseSlotProps, {}>;
    separator: import("../../index.js").SlotDefinition<CommandStore, CommandApi, import("../../renderer.js").BaseSlotProps, {}>;
    empty: import("../../index.js").SlotDefinition<CommandStore, CommandApi, NoInfer<{
        stash?: boolean;
    }> & import("../../renderer.js").BaseSlotProps, NoInfer<{
        loading: boolean;
        empty: boolean;
        query: string;
    }>>;
    status: import("../../index.js").SlotDefinition<CommandStore, CommandApi, import("../../renderer.js").BaseSlotProps, NoInfer<{
        status: import("../../foundation/lists/index.js").AsyncOptionsStatus;
        loading: boolean;
        count: number;
    }>>;
    page: import("../../index.js").SlotDefinition<CommandStore, CommandApi, NoInfer<CommandPageProps> & import("../../renderer.js").BaseSlotProps, {}>;
    shortcut: import("../../index.js").SlotDefinition<CommandStore, CommandApi, NoInfer<CommandShortcutProps> & import("../../renderer.js").BaseSlotProps, NoInfer<CommandShortcutState>>;
};
export { commandSlots };
