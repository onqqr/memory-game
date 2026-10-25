import { el } from "./dom.js";

export function createFooter() {
  const year = String(new Date().getFullYear());

  const githubLink = el(
    "a",
    {
      className: "footer__link footer__link--github",
      href: "https://github.com/onqqr",
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "GitHub profile onqqr",
    },
    [
      el("img", {
        className: "footer__icon",
        src: "./assets/github.svg",
        alt: "",
        width: 32,
        height: 32,
        draggable: false,
      }),
      el("span", { className: "footer__nick", text: "onqqr" }),
    ],
  );

  const yearEl = el("span", {
    className: "footer__year",
    text: year,
  });

  const schoolLink = el(
    "a",
    {
      className: "footer__link",
      href: "https://rs.school",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    ["rsschool"],
  );

  return el("footer", { className: "footer" }, [
    el("div", { className: "footer__cell footer__cell--start" }, [githubLink]),
    el("div", { className: "footer__cell footer__cell--center" }, [yearEl]),
    el("div", { className: "footer__cell footer__cell--end" }, [schoolLink]),
  ]);
}
