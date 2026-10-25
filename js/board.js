import { CARD_BACK_IMAGE } from "./cards-data.js";
import { clearChildren, el } from "./dom.js";

export const FLIP_DURATION_MS = 240;

export function createBoard({ cards, onCardClick }) {
  const board = el("div", {
    className: "board",
    role: "grid",
    "aria-label": "Memory card board",
  });

  renderBoard(board, cards, onCardClick);
  return board;
}

export function renderBoard(board, cards, onCardClick, options = {}) {
  clearChildren(board);

  cards.forEach((card, index) => {
    board.append(createCardElement(card, index, onCardClick, options));
  });
}

export function syncBoard(board, cards, onCardClick, options = {}) {
  const animate = options.animate !== false;
  const buttons = [...board.querySelectorAll(".card")];

  if (buttons.length !== cards.length) {
    renderBoard(board, cards, onCardClick, options);
    return;
  }

  cards.forEach((card, index) => {
    const button = buttons[index];
    const wasFlipped = button.classList.contains("is-flipped");
    const isFlipped = card.isOpen || card.isMatched;
    const willOpen = animate && !wasFlipped && isFlipped;
    const willClose = animate && wasFlipped && !isFlipped;

    if (willOpen) {
      button.classList.remove("is-flip-close");
      button.classList.remove("is-flip-open");
      void button.offsetWidth;
      button.classList.add("is-flip-open");
      applyCardState(button, card, index, options);
      bindFlipEnd(button, "is-flip-open");
      return;
    }

    if (willClose) {
      applyCardState(button, card, index, {
        ...options,
        forceFlipped: true,
      });
      playFlipAnimation(button, "close", () => {
        applyCardState(button, card, index, options);
      });
      return;
    }

    applyCardState(button, card, index, options);
  });
}

function createCardElement(card, index, onCardClick, options = {}) {
  const button = el(
    "button",
    {
      type: "button",
      className: "card",
      dataset: { index: String(index) },
      onclick: () => onCardClick(index),
    },
    [
      el("span", { className: "card__inner", "aria-hidden": "true" }, [
        el("span", { className: "card__face card__face--back" }, [
          el("img", {
            className: "card__image card__image--back",
            src: CARD_BACK_IMAGE,
            alt: "",
            draggable: false,
          }),
        ]),
        el("span", { className: "card__face card__face--front" }, [
          el("img", {
            className: "card__image card__image--front",
            src: card.image,
            alt: "",
            draggable: false,
          }),
        ]),
      ]),
    ],
  );

  applyCardState(button, card, index, options);
  return button;
}

function applyCardState(button, card, index, options = {}) {
  const mismatchIndexes = new Set(options.mismatchIndexes ?? []);
  const isFlipped = options.forceFlipped || card.isOpen || card.isMatched;
  const classes = ["card"];

  if (isFlipped) {
    classes.push("is-flipped");
  }
  if (card.isMatched) {
    classes.push("is-matched");
  }
  if (mismatchIndexes.has(index)) {
    classes.push("is-mismatch");
  }

  if (button.classList.contains("is-flip-open")) {
    classes.push("is-flip-open");
  }
  if (button.classList.contains("is-flip-close")) {
    classes.push("is-flip-close");
  }

  button.className = classes.join(" ");
  button.setAttribute(
    "aria-label",
    card.isMatched
      ? `Matched pair: ${card.alt}`
      : card.isOpen || options.forceFlipped
        ? `Open card: ${card.alt}`
        : "Closed card",
  );
  button.disabled = card.isMatched;
}

function playFlipAnimation(button, direction, onComplete) {
  const openClass = "is-flip-open";
  const closeClass = "is-flip-close";
  const nextClass = direction === "open" ? openClass : closeClass;
  const otherClass = direction === "open" ? closeClass : openClass;

  button.classList.remove(otherClass);
  button.classList.remove(nextClass);
  void button.offsetWidth;
  button.classList.add(nextClass);
  bindFlipEnd(button, nextClass, onComplete);
}

function bindFlipEnd(button, animClass, onComplete) {
  const onEnd = (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }
    if (!event.target.classList.contains("card__inner")) {
      return;
    }

    button.classList.remove(animClass);
    button.removeEventListener("animationend", onEnd);
    onComplete?.();
  };

  button.addEventListener("animationend", onEnd);
}
