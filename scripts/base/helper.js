function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `rgb(${randomNumber(0, 240)}, ${randomNumber(0, 240)}, ${randomNumber(
    0,
    240
  )})`;
}
