import { el } from "./dom.js";

const STORAGE_KEY = "memory-game-scores";
const MAX_SCORES = 10;

export function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item) =>
        item &&
        typeof item.moves === "number" &&
        typeof item.date === "string",
    );
  } catch {
    return [];
  }
}

function saveScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

export function addScore(moves, playedAt = new Date()) {
  const scores = loadScores();
  scores.push({
    moves,
    date: playedAt.toISOString(),
  });

  scores.sort((a, b) => {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const top = scores.slice(0, MAX_SCORES);
  saveScores(top);
  return top;
}

export function formatScoreDate(isoDate) {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function createLeaderboardContent({ onClose }) {
  const titleId = "leaderboard-title";
  const scores = loadScores();
  const children = [
    el("h2", {
      id: titleId,
      className: "modal__title",
      text: "Leaderboard",
    }),
  ];

  if (scores.length === 0) {
    children.push(
      el("p", {
        className: "leaderboard-empty",
        text: "No results yet",
      }),
    );
  } else {
    const thead = el("thead", {}, [
      el("tr", {}, [
        el("th", { text: "Place" }),
        el("th", { text: "Moves" }),
        el("th", { text: "Date" }),
      ]),
    ]);

    const tbody = el(
      "tbody",
      {},
      scores.map((score, index) =>
        el("tr", {}, [
          el("td", { text: String(index + 1) }),
          el("td", { text: String(score.moves) }),
          el("td", { text: formatScoreDate(score.date) }),
        ]),
      ),
    );

    children.push(
      el("table", { className: "leaderboard-table" }, [thead, tbody]),
    );
  }

  children.push(
    el("div", { className: "modal__actions" }, [
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
  );

  return el("div", { className: "leaderboard" }, children);
}

export const LEADERBOARD_TITLE_ID = "leaderboard-title";
