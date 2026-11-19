declare function confirmOf(elements: Element[]): string | undefined;
declare const isOffLimits: (elements: Element[]) => boolean;
declare const isSecret: (elements: Element[]) => boolean;
declare function textOf(el: Element, skip?: Element[]): string;
declare const checkMarks: (elements: Element[]) => void;
export { checkMarks, confirmOf, isOffLimits, isSecret, textOf };
