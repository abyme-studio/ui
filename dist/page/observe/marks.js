// src/page/observe/marks.ts
import { checkMarks as warnMarks } from "#dev";
import { composedClosest } from "../../foundation/platform/platform.js";
var marks = ["data-agent-confirm", "data-agent-hidden", "data-agent-secret"];
function confirmOf(elements) {
  const texts = /* @__PURE__ */ new Set();
  for (const el of elements) {
    const text = composedClosest(el, "[data-agent-confirm]")?.getAttribute(
      "data-agent-confirm"
    );
    if (text != null) {
      texts.add(text.trim().slice(0, 200) || "This needs a person.");
    }
  }
  return texts.size ? [...texts].join("; ") : void 0;
}
var isOffLimits = (elements) => elements.some((el) => composedClosest(el, "[data-agent-hidden]"));
var isSecret = (elements) => elements.some((el) => composedClosest(el, "[data-agent-secret]"));
function textOf(el, skip = []) {
  let text = "";
  const walk = (node) => {
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent;
      } else if (child instanceof Element && !skip.includes(child) && !child.hasAttribute("data-agent-hidden") && child.getAttribute("aria-hidden") !== "true") {
        walk(child);
      }
    }
  };
  walk(el);
  return text.replace(/\s+/g, " ").trim();
}
var checkMarks = (elements) => warnMarks(elements, marks);
export {
  checkMarks,
  confirmOf,
  isOffLimits,
  isSecret,
  textOf
};
