function damageBalloon(balloon, damage) {
  if (balloon.classList.contains("placeholder")) return;

  // |======[ DAMAGE BALLOON ]======|
  balloon.dataset.hp = (balloon.dataset.hp - damage).toFixed(1);
  balloon.classList.add("balloon--damaged");

  // |======[ KILL BALLOON ]======|
  if (balloon.dataset.hp <= 0) {
    popSound.play();

    // |======[ UPDATE GAME STATS ]======|
    game.currentBalloonsAmount--;
    game.balloonsPopped++;
    statusBalloons.textContent = game.balloonsPopped;

    // |======[ UPDATE PLAYER STATS ]======|
    getGold(1);
    player.allGold += 1;
    statusGold.textContent = player.allGold;

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
