export const CARD_BACK_IMAGE = "./assets/default-item.svg";

export const CARD_FACES = [
  { id: "item-1", image: "./assets/item-1.svg", alt: "monitor" },
  { id: "item-2", image: "./assets/item-2.svg", alt: "handheld console" },
  { id: "item-3", image: "./assets/item-3.svg", alt: "twin boothss" },
  { id: "item-4", image: "./assets/item-4.svg", alt: "desk setup" },
  { id: "item-5", image: "./assets/item-5.svg", alt: "phone" },
  { id: "item-6", image: "./assets/item-6.svg", alt: "space invader" },
  { id: "item-7", image: "./assets/item-7.svg", alt: "trophy" },
  { id: "item-8", image: "./assets/item-8.svg", alt: "arcade bug" },
];

export function createDeck() {
  const deck = [];

  for (const face of CARD_FACES) {
    for (let copy = 0; copy < 2; copy += 1) {
      deck.push({
        pairId: face.id,
        image: face.image,
        alt: face.alt,
        isOpen: false,
        isMatched: false,
      });
    }
  }

  return deck;
}
