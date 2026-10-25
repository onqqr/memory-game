import { createBoard, FLIP_DURATION_MS, renderBoard, syncBoard } from "./board.js";
import { createCounters } from "./counters.js";
import { el } from "./dom.js";
import { createFooter } from "./footer.js";
import { createHeader } from "./header.js";
import { addScore, createLeaderboardContent, LEADERBOARD_TITLE_ID } from "./leaderboard.js";
import { createModal } from "./modal.js";
import { createInitialState, MISMATCH_DELAY_MS, resetState, TOTAL_PAIRS } from "./state.js";
import { createVictoryContent, VICTORY_TITLE_ID } from "./victory.js";

const state = createInitialState();
const modal = createModal();

let boardEl = null;
let counters = null;
let mismatchIndexes = [];

function refreshBoard(options = {}) {
  if (!boardEl) {
    return;
  }

  const opts = { mismatchIndexes, animate: options.animate };

  if (options.rebuild) {
    renderBoard(boardEl, state.cards, handleCardClick, opts);
    return;
  }

  syncBoard(boardEl, state.cards, handleCardClick, opts);
}

function refreshCounters() {
  counters?.update(state.moves, state.pairsFound);
}

function startNewGame() {
  modal.close();
  mismatchIndexes = [];
  resetState(state);
  refreshCounters();
  refreshBoard({ rebuild: true, animate: false });
}

function openLeaderboard() {
  const content = createLeaderboardContent({
    onClose: () => modal.close(),
  });
  modal.open(content, { labelledBy: LEADERBOARD_TITLE_ID });
}

function openVictory() {
  if (!state.scoreSaved) {
    addScore(state.moves);
    state.scoreSaved = true;
  }

  const content = createVictoryContent({
    moves: state.moves,
    onNewGame: startNewGame,
    onClose: () => modal.close(),
  });
  modal.open(content, { labelledBy: VICTORY_TITLE_ID });
}

function handleCardClick(index) {
  if (state.finished || state.locked) {
    return;
  }

  const card = state.cards[index];
  if (!card || card.isOpen || card.isMatched) {
    return;
  }

  card.isOpen = true;

  if (state.firstIndex == null) {
    state.firstIndex = index;
    refreshBoard();
    return;
  }

  if (state.firstIndex === index) {
    return;
  }

  state.secondIndex = index;
  state.moves += 1;
  refreshCounters();

  const firstCard = state.cards[state.firstIndex];
  const secondCard = state.cards[state.secondIndex];

  if (firstCard.pairId === secondCard.pairId) {
    firstCard.isMatched = true;
    secondCard.isMatched = true;
    firstCard.isOpen = true;
    secondCard.isOpen = true;
    state.pairsFound += 1;
    state.firstIndex = null;
    state.secondIndex = null;
    mismatchIndexes = [];
    refreshCounters();
    refreshBoard();

    if (state.pairsFound >= TOTAL_PAIRS) {
      state.finished = true;
      openVictory();
    }
    return;
  }

  state.locked = true;
  mismatchIndexes = [state.firstIndex, state.secondIndex];
  refreshBoard();

  const firstIndex = state.firstIndex;
  const secondIndex = state.secondIndex;

  state.mismatchTimerId = setTimeout(() => {
    const a = state.cards[firstIndex];
    const b = state.cards[secondIndex];

    if (a && !a.isMatched) {
      a.isOpen = false;
    }
    if (b && !b.isMatched) {
      b.isOpen = false;
    }

    state.firstIndex = null;
    state.secondIndex = null;
    mismatchIndexes = [];
    refreshBoard();

    state.mismatchTimerId = setTimeout(() => {
      state.mismatchTimerId = null;
      state.locked = false;
    }, FLIP_DURATION_MS);
  }, MISMATCH_DELAY_MS);
}

function mountApp() {
  counters = createCounters();

  const { root: header } = createHeader({
    onNewGame: startNewGame,
    onLeaderboard: openLeaderboard,
  });

  boardEl = createBoard({
    cards: state.cards,
    onCardClick: handleCardClick,
  });

  const main = el("main", { className: "main" }, [counters.root, boardEl]);
  const footer = createFooter();
  const app = el("div", { className: "app" }, [header, main, footer]);

  document.body.append(app, modal.root);
  refreshCounters();
}

mountApp();
