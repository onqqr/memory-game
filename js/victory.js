import { el } from "./dom.js";

export function createVictoryContent({ moves, onNewGame, onClose }) {
  const titleId = "victory-title";

  return el("div", { className: "victory" }, [
    el("h2", {
      id: titleId,
      className: "modal__title",
      text: "You win!",
    }),
    el("p", {
      className: "modal__text",
      text: `All pairs found in ${moves} moves.`,
    }),
    el("div", { className: "modal__actions" }, [
      el(
        "button",
        {
          type: "button",
          className: "btn btn--accent",
          onclick: onNewGame,
        },
        ["New Game"],
      ),
      el(
        "button",
        {
          type: "button",
          className: "btn",
          onclick: onClose,
        },
        ["Close"],
      ),
    ]),
  ]);
}

export const VICTORY_TITLE_ID = "victory-title";
