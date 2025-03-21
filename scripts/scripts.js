/* |=========================================================================| */
/*                                    GAME                                     */
/* |=========================================================================| */

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
  gold: 0,
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
/* |=========================================================================| */
/*                                  FUNCTIONS                                  */
/* |=========================================================================| */

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

function updateClicks() {
  game.clicks++;
  statusClicks.textContent = game.clicks;
}

/* |=========================================================================| */
/*                                 GAME LOGIC                                  */
/* |=========================================================================| */

balloonGrid.addEventListener("click", function (e) {
  // |======[ SELECT BALLOON HTML ]======|
  const balloon = e.target;

  // |======[ DAMAGE SURROUNDINGS IF PLACEHOLDER ]======|
  if (balloon.classList.contains("placeholder") && player.areaDamage != 0) {
    updateClicks();
    damageSurroundingBalloons(balloon);
    return;
  }

  // |======[ PREVENTING TRYING TO DAMAGE THE GRID BUG ]======|
  if (!balloon.classList.contains("balloon")) return;

  // |======[ UPDATE CLICKS ]======|
  updateClicks();

  // |======[ DAMAGE BALLOON ]======|
  damageBalloon(balloon, player.damage);
  if (player.areaDamage != 0) damageSurroundingBalloons(balloon);
});

refillBalloons();
