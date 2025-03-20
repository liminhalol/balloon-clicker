// |======[ GAME RULES ]======|
let maxBalloonsAmount = 79;
const popSound = new Audio("../pop.mp3");

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
  allGold: 0,
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

// |======[ CLICKING BALLOONS ]======|
balloonGrid.addEventListener("click", function (e) {
  // |======[ SELECT BALLOON HTML ]======|
  const balloon = e.target;
  if (!balloon.classList.contains("balloon")) return;

  // |======[ UPDATE CLICKS ]======|
  game.clicks++;
  statusClicks.textContent = game.clicks;

  // |======[ DAMAGE BALLOON ]======|
  damageBalloon(balloon, player.damage);
  if (player.areaDamage != 0) damageSurroundingBalloons(balloon);
});

refillBalloons();

// |======[ SETTING PLACEHOLDER HEIGHT ]======|
const firstBalloon = document.querySelector(".balloon");
const cssRules = [...document.styleSheets[0].cssRules];
cssRules.find((rule) => rule.selectorText === ".placeholder").style.height =
  getComputedStyle(firstBalloon).height;
