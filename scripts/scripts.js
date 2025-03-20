// |======[ HTML ELEMENTS ]======|
const balloonGrid = document.querySelector(".balloon-grid");
// |Stats|
const goldText = document.querySelector("#stats-gold");
const damageText = document.querySelector("#stats-damage");
const areaDamageText = document.querySelector("#stats-areaDamage");

// |======[ GAME RULES ]======|
let maxBalloonsAmount = 79;

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
  areaDamage: 0,
  gold: 1000,
};

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

function refillBalloons() {
  for (let i = game.maxBalloonsAmount; i >= 0; i--) {
    // |======[ GENERATE HTML ]======|
    const balloonHtml = `
    <pre class="balloon flex--center" style="color: ${randomColor()}" data-hp="${randomNumber(
      10,
      15
    )}" data-position="${i}">${
      balloonAscii[randomNumber(0, balloonAscii.length - 1)]
    }</pre>
    `;

    balloonGrid.insertAdjacentHTML("afterbegin", balloonHtml);
  }
}

function getGold(amount) {
  player.gold += amount;
  goldText.textContent = player.gold;
}

function damageBalloon(balloon, damage) {
  if (balloon.classList.contains("placeholder")) return;
  // |======[ DAMAGE BALLOON ]======|
  balloon.dataset.hp = (balloon.dataset.hp - damage).toFixed(1);
  balloon.classList.add("balloon--damaged");

  // |======[ KILL BALLOON ]======|
  if (balloon.dataset.hp <= 0) {
    // |======[ UPDATE GAME STATS ]======|
    game.currentBalloonsAmount--;
    game.balloonsPopped++;

    // |======[ UPDATE PLAYER STATS ]======|
    getGold(1);

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
}

function damageSurroundingBalloons(balloon) {
  if (player.areaDamage === 0) return;
  // |======[ SELECTING SURROUNDING BALLOONS ]======|
  const currentBalloonPosition = +balloon.dataset.position;
  const surroundingBalloonPositions = [-21, -20, -19, -1, 1, 19, 20, 21];

  // |======[ DAMAGING SURROUNDING BALLOONS ]======|
  for (position of surroundingBalloonPositions) {
    const surroundingBalloon =
      balloonGrid.children[currentBalloonPosition - position];

    surroundingBalloon &&
      !surroundingBalloon.classList.contains("placeholder") &&
      damageBalloon(surroundingBalloon, player.areaDamage);
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
  damageBalloon(balloon, player.damage);
  damageSurroundingBalloons(balloon);
});

refillBalloons();

// |======[ SETTING PLACEHOLDER HEIGHT ]======|
const firstBalloon = document.querySelector(".balloon");
const cssRules = [...document.styleSheets[0].cssRules];
cssRules.find((rule) => rule.selectorText === ".placeholder").style.height =
  getComputedStyle(firstBalloon).height;
