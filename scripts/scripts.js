// |======[ HTML ELEMENTS ]======|
const balloonGrid = document.querySelector(".balloon-grid");
const storeBtn = document.querySelector(".store-btn");
const damageText = document.querySelector(".stats-damage");
const goldText = document.querySelector(".stats-gold");
const storePrice = document.querySelector(".store-price");

// |======[ GAME RULES ]======|
let maxBalloonsAmount = 80;

const game = {
  // |======[ RULES ]======|
  maxBalloonsAmount: maxBalloonsAmount,
  currentballoonsAmount: maxBalloonsAmount,

  // |======[ STATS ]======|
  balloonsPopped: 0,
  clicks: 0,
};

// |======[ PLAYER ]======|
const player = {
  damage: 1,
  gold: 0,
};

// |======[ HELPER FUNCTIONS ]======|
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `rgb(${randomNumber(0, 190)}, ${randomNumber(0, 190)}, ${randomNumber(
    0,
    190
  )})`;
}

// |======[ BALLOON ASCII ]======|
const balloonAscii = [
  `
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
`,
  `
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
`,
];

// |======[ GENERATE BALOONS ]======|
function refillBalloons() {
  for (let i = 0; i < game.maxBalloonsAmount; i++) {
    // |======[ GENERATE HTML ]======|
    const balloonHtml = `
    <pre class="balloon" style="color: ${randomColor()}" data-hp="${randomNumber(
      2,
      3
    )}">${balloonAscii[randomNumber(0, balloonAscii.length - 1)]}</pre>
    `;

    balloonGrid.insertAdjacentHTML("afterbegin", balloonHtml);
  }
}

// |======[ CLICKING BALLOONS ]======|
balloonGrid.addEventListener("click", function (e) {
  // |======[ SELECT BALLOON HTML ]======|
  const balloon = e.target;
  if (!balloon.classList.contains("balloon")) return;

  // |======[ UPDATE CLICKS ]======|
  game.clicks++;

  // |======[ DAMAGE BALLOON ]======|
  balloon.dataset.hp -= player.damage;
  balloon.classList.add("balloon--active");

  // |======[ REMOVE HEALTHBAR ]======|
  /*
  setTimeout(() => {
    balloon.classList.remove("balloon--active");
  }, 3000);
  */

  // |======[ KILL BALLOON ]======|
  if (balloon.dataset.hp <= 0) {
    // |======[ UPDATE STATS ]======|
    game.currentballoonsAmount--;
    game.balloonsPopped++;
    player.gold++;
    goldText.textContent = player.gold;

    // |======[ INSERT PLACEHOLDER AND REMOVE ]======|
    balloon.insertAdjacentHTML("afterend", `<div class="placeholder"></div>`);
    balloon.remove();
  }

  // |======[ REFIL BALLOONS AFTER CLEARUBG ]======|
  if (game.currentballoonsAmount <= 0) {
    game.currentballoonsAmount = maxBalloonsAmount;
    balloonGrid.innerHTML = "";
    refillBalloons();
  }
});

refillBalloons();
