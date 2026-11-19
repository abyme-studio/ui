import type { SlotFactory } from "../../foundation/kernel/primitive-types.js";
import type { ColorPickerApi, State } from "./color-picker-api.js";
import type { ColorPickerAreaProps, ColorPickerChannelInputProps, ColorPickerSliderProps, ColorPickerSliderState, ColorPickerState, ColorPickerSwatchItemProps, ColorPickerSwatchItemState } from "./color-picker.js";
declare function colorPickerSlots(slot: SlotFactory<State, ColorPickerApi>): {
    root: import("../../index.js").SlotDefinition<State, ColorPickerApi, import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerState>>;
    area: import("../../index.js").SlotDefinition<State, ColorPickerApi, NoInfer<ColorPickerAreaProps> & import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerState>>;
    "area-thumb": import("../../index.js").SlotDefinition<State, ColorPickerApi, NoInfer<ColorPickerAreaProps> & import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerState>>;
    "area-canvas": import("../../index.js").SlotDefinition<State, ColorPickerApi, NoInfer<ColorPickerAreaProps> & import("../../renderer.js").BaseSlotProps, {}>;
    slider: import("../../index.js").SlotDefinition<State, ColorPickerApi, NoInfer<ColorPickerSliderProps> & import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerSliderState>>;
    "slider-thumb": import("../../index.js").SlotDefinition<State, ColorPickerApi, NoInfer<ColorPickerSliderProps> & import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerSliderState>>;
    input: import("../../index.js").SlotDefinition<State, ColorPickerApi, import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerState>>;
    "channel-input": import("../../index.js").SlotDefinition<State, ColorPickerApi, NoInfer<ColorPickerChannelInputProps> & import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerState>>;
    swatch: import("../../index.js").SlotDefinition<State, ColorPickerApi, import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerState>>;
    "eye-dropper": import("../../index.js").SlotDefinition<State, ColorPickerApi, import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerState>>;
    swatches: import("../../index.js").SlotDefinition<State, ColorPickerApi, import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerState>>;
    "swatch-item": import("../../index.js").SlotDefinition<State, ColorPickerApi, NoInfer<ColorPickerSwatchItemProps> & import("../../renderer.js").BaseSlotProps, NoInfer<ColorPickerSwatchItemState>>;
    "hidden-input": import("../../index.js").SlotDefinition<State, ColorPickerApi, import("../../renderer.js").BaseSlotProps, {}>;
};
export { colorPickerSlots };
