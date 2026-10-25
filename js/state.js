import { createDeck } from "./cards-data.js";
import { shuffle } from "./shuffle.js";

export const TOTAL_PAIRS = 8;
export const MISMATCH_DELAY_MS = 1000;

export function createInitialState() {
  return {
    cards: shuffle(createDeck()),
    moves: 0,
    pairsFound: 0,
    firstIndex: null,
    secondIndex: null,
    locked: false,
    finished: false,
    mismatchTimerId: null,
    scoreSaved: false,
  };
}

export function resetState(state) {
  if (state.mismatchTimerId != null) {
    clearTimeout(state.mismatchTimerId);
  }

  const next = createInitialState();
  state.cards = next.cards;
  state.moves = next.moves;
  state.pairsFound = next.pairsFound;
  state.firstIndex = next.firstIndex;
  state.secondIndex = next.secondIndex;
  state.locked = next.locked;
  state.finished = next.finished;
  state.mismatchTimerId = next.mismatchTimerId;
  state.scoreSaved = next.scoreSaved;
}
