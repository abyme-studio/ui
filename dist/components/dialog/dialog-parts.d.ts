import type { SlotFactory } from "../../foundation/kernel/primitive-types.js";
import { type DialogApi, type DialogState } from "./dialog-api.js";
import type { DialogBackdropState, DialogCloseState, DialogContentState, DialogTriggerProps, DialogTriggerState } from "./dialog.js";
type TriggerProps = Omit<DialogTriggerProps, "controller">;
declare function dialogSlots(slot: SlotFactory<DialogState, DialogApi>, { name }: {
    name: string;
}): {
    trigger: import("../../index.js").SlotDefinition<DialogState, DialogApi, NoInfer<TriggerProps> & import("../../renderer.js").BaseSlotProps, NoInfer<DialogTriggerState>>;
    backdrop: import("../../index.js").SlotDefinition<DialogState, DialogApi, import("../../renderer.js").BaseSlotProps, NoInfer<DialogBackdropState>>;
    content: import("../../index.js").SlotDefinition<DialogState, DialogApi, NoInfer<import("../../index.js").PortalProps & {
        initialFocus?: import("./dialog.js").DialogInitialFocus;
        finalFocus?: import("./dialog.js").DialogFinalFocus;
        keepMounted?: boolean;
        inline?: boolean;
    }> & import("../../renderer.js").BaseSlotProps, NoInfer<DialogContentState>>;
    title: import("../../index.js").SlotDefinition<DialogState, DialogApi, import("../../renderer.js").BaseSlotProps, {}>;
    description: import("../../index.js").SlotDefinition<DialogState, DialogApi, import("../../renderer.js").BaseSlotProps, {}>;
    close: import("../../index.js").SlotDefinition<DialogState, DialogApi, NoInfer<{
        value?: string;
        action?: (event: Event | undefined, details: import("../../index.js").ActionDetails) => unknown;
    }> & import("../../renderer.js").BaseSlotProps, NoInfer<DialogCloseState>>;
    shortcut: import("../../index.js").SlotDefinition<DialogState, DialogApi, NoInfer<{
        shortcut?: string;
    }> & import("../../renderer.js").BaseSlotProps, NoInfer<{
        text: string;
    }>>;
};
export { dialogSlots };
