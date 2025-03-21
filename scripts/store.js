// |======[ UPGRADES ]======|
const upgrades = {
  moreDamage: {
    ammount: 0,
    currentPrice: 15,

    _buy() {
      upgrades._increaseAmount(this);
      player.damage++;
      damageText.textContent = player.damage;
    },
  },

  areaDamage: {
    ammount: 0,
    currentPrice: 20,

    _buy() {
      upgrades._increaseAmount(this);
      player.areaDamage = player.areaDamage + 0.2;
      areaDamageText.textContent = player.areaDamage.toFixed(1);
    },
  },

  // |======[ METHODS ]======|
  _increaseAmount(upgrade) {
    upgrade.ammount++;
    upgrade.currentPrice = Math.round(
      upgrade.currentPrice + upgrade.currentPrice * 0.15
    );
  },
};

// |======[ OPEN/CLOSE STORE ]======|
const toggleStore = () => storeEl.classList.toggle("hidden");
openStoreBtn.addEventListener("click", toggleStore);
closeStoreBtn.addEventListener("click", toggleStore);

// |======[ BUYING ITEMS ]======|
upgradesEl.forEach(function (upgrade) {
  // |======[ SELECTING CURRENT PRICE ELEMENT ]======|
  const priceText = upgrade.querySelector(".store-price");

  // |======[ SELECTING BUTTON ]======|
  upgrade
    .querySelector(".store-buy-btn")
    .addEventListener("click", function () {
      // |======[ GET CURRENT UPGRADE ]======|
      const upgrade = upgrades[this.dataset.upgrade];

      if (player.gold >= upgrade.currentPrice) {
        // |======[ UPDATE GOLD ]======|
        getGold(-upgrade.currentPrice);

        // |======[ BUY ]======|
        upgrade._buy();
        priceText.textContent = upgrade.currentPrice;
      }
    });
});
