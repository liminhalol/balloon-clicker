const upgrades = {
  moreDamage: {
    ammount: 1,
    currentPrice: 15,
  },
};

const storeEl = document.querySelector(".store");

storeBtn.addEventListener("click", function (e) {
  storeBtn.classList.toggle("hidden");
  storeEl.classList.toggle("hidden");
});

document
  .querySelector(".store-buy-btn")
  .addEventListener("click", function (e) {
    if (player.gold >= upgrades.moreDamage.currentPrice) {
      // |======[ UPDATE GOLD ]======|
      player.gold -= upgrades.moreDamage.currentPrice;
      goldText.textContent = player.gold;

      // |======[ UPDATE PRICE ]======|
      upgrades.moreDamage.currentPrice = Math.round(
        upgrades.moreDamage.currentPrice +
          upgrades.moreDamage.currentPrice * 0.15
      );
      storePrice.textContent = upgrades.moreDamage.currentPrice;

      // |======[ UPDATE DAMAGE ]======|
      upgrades.moreDamage.ammount++;
      player.damage++;
      damageText.textContent = player.damage;
    }
  });

document
  .querySelector(".close-store-btn")
  .addEventListener("click", function (e) {
    storeBtn.classList.toggle("hidden");
    storeEl.classList.toggle("hidden");
  });
