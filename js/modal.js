import { clearChildren, el } from "./dom.js";

export function createModal() {
  const contentSlot = el("div", { className: "modal__content" });
  const panel = el("div", { className: "modal__panel" }, [contentSlot]);
  const frame = el("div", { className: "modal__frame" }, [panel]);
  const root = el("dialog", { className: "modal" }, [frame]);

  function onClose() {
    document.body.classList.remove("is-modal-open");
    clearChildren(contentSlot);
  }

  function open(content, options = {}) {
    clearChildren(contentSlot);
    contentSlot.append(content);

    if (options.labelledBy) {
      root.setAttribute("aria-labelledby", options.labelledBy);
    } else {
      root.removeAttribute("aria-labelledby");
    }

    document.body.classList.add("is-modal-open");
    root.showModal();
  }

  function close() {
    if (!root.open) {
      return;
    }
    root.close();
  }

  root.addEventListener("close", onClose);

  root.addEventListener("click", (event) => {
    if (event.target === root) {
      close();
    }
  });

  frame.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  return {
    root,
    open,
    close,
    isOpen: () => root.open,
  };
}
