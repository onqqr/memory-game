import { el } from "./dom.js";

export function createHeader({ onNewGame, onLeaderboard }) {
  const newGameBtn = el(
    "button",
    {
      type: "button",
      className: "btn btn--accent",
      onclick: onNewGame,
    },
    ["New Game"],
  );

  const leaderboardBtn = el(
    "button",
    {
      type: "button",
      className: "btn",
      onclick: onLeaderboard,
    },
    ["Leaderboard"],
  );

  const root = el("header", { className: "header" }, [
    el("h1", { className: "header__title", text: "Memory Game" }),
    el("div", { className: "header__actions" }, [newGameBtn, leaderboardBtn]),
  ]);

  return { root };
}
