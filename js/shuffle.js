export function shuffle(array) {
  array.sort(function () {
    return Math.random() - 0.5;
  });
  return array;
}
