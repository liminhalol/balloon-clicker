const balloonGrid = document.querySelector(".balloon-grid");
let currentballoonsAmount = 0;
let maxballoonsAmount = 100;

//prettier-ignore
const balloonAscii = [`
  _____
 /     \\
|       |
|       |
 \\     /
  -----
    |
   |
    |
    0
`, `
  _____
 /     \\
|       |
|       |
 \\     /
  -----
    |
     |
    |
    0
`];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(
    0,
    255
  )})`;
}

for (let i = 0; i <= maxballoonsAmount; i++) {
  const balloonHtml = `
    <pre class="balloon" style="color: ${randomColor()}" data-hp="${randomNumber(
    10,
    15
  )}">${balloonAscii[randomNumber(0, balloonAscii.length - 1)]}</pre>
    `;

  balloonGrid.insertAdjacentHTML("afterbegin", balloonHtml);
}

// |======[ CLICKING BALLOONS ]======|
balloonGrid.addEventListener("click", function (e) {
  // |======[ SELECT BALLOON HTML ]======|
  const balloon = e.target;
  if (!balloon.classList.contains("balloon")) return;

  // |======[ DAMAGE BALLOON ]======|
  balloon.dataset.hp--;

  balloon.classList.add("balloon--active");
});
