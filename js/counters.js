import { el } from "./dom.js";
import { TOTAL_PAIRS } from "./state.js";

export function createCounters() {
  const movesValue = el("span", {
    className: "stat__value",
    text: "0",
    "aria-live": "polite",
  });

  const pairsValue = el("span", {
    className: "stat__value",
    text: `0 / ${TOTAL_PAIRS}`,
    "aria-live": "polite",
  });

  const root = el("section", { className: "stats", "aria-label": "Game stats" }, [
    el("div", { className: "stat" }, [
      el("span", { className: "stat__label", text: "Moves" }),
      movesValue,
    ]),
    el("div", { className: "stat" }, [
      el("span", { className: "stat__label", text: "Pairs" }),
      pairsValue,
    ]),
  ]);

  function update(moves, pairsFound) {
    movesValue.textContent = String(moves);
    pairsValue.textContent = `${pairsFound} / ${TOTAL_PAIRS}`;
  }

  return { root, update };
}
