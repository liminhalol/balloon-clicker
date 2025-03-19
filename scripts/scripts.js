// |======[ HTML ELEMENTS ]======|
const balloonGrid = document.querySelector(".balloon-grid");
const goldText = document.querySelector(".stats-gold");
const damageText = document.querySelector(".stats-damage");

// |======[ GAME RULES ]======|
let maxBalloonsAmount = 80;

const game = {
  // |======[ RULES ]======|
  maxBalloonsAmount: maxBalloonsAmount,
  currentBalloonsAmount: maxBalloonsAmount,

  // |======[ STATS ]======|
  balloonsPopped: 0,
  clicks: 0,
};

// |======[ PLAYER ]======|
const player = {
  damage: 1,
  gold: 0,
};

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
    <pre class="balloon flex--center" style="color: ${randomColor()}" data-hp="${randomNumber(
      10,
      15
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
  balloon.classList.add("balloon--damaged");

  // |======[ REMOVE HEALTHBAR ]======|
  /*
  setTimeout(() => {
    balloon.classList.remove("balloon--damaged");
  }, 3000);
  */

  // |======[ KILL BALLOON ]======|
  if (balloon.dataset.hp <= 0) {
    // |======[ UPDATE GAME STATS ]======|
    game.currentBalloonsAmount--;
    game.balloonsPopped++;
    // |======[ UPDATE PLAYER STATS ]======|
    player.gold++;
    goldText.textContent = player.gold;

    // |======[ INSERT PLACEHOLDER AND REMOVE BALLOON ]======|
    balloon.insertAdjacentHTML("afterend", `<div class="placeholder"></div>`);
    balloon.remove();
  }

  // |======[ REFIL BALLOONS AFTER CLEARING ]======|
  if (game.currentBalloonsAmount <= 0) {
    game.currentBalloonsAmount = maxBalloonsAmount;
    balloonGrid.innerHTML = "";
    refillBalloons();
  }
});

refillBalloons();
