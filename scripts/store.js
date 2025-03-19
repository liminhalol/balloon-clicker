// |======[ HTML ELEMENTS ]======|
const storeEl = document.querySelector(".store");
const buyItemBtn = document.querySelector(".store-buy-btn");
const openStoreBtn = document.querySelector("#btn--open-store");
const closeStoreBtn = document.querySelector("#btn--close-store");
const storePrice = document.querySelector(".store-price");

// |======[ UPGRADES ]======|
const upgrades = {
  moreDamage: {
    ammount: 1,
    currentPrice: 15,
  },
};

// |======[ OPEN/CLOSE STORE ]======|
const toggleStore = () => storeEl.classList.toggle("hidden");
openStoreBtn.addEventListener("click", toggleStore);
closeStoreBtn.addEventListener("click", toggleStore);

// |======[ BUYING ITEMS ]======|
buyItemBtn.addEventListener("click", function (e) {
  if (player.gold >= upgrades.moreDamage.currentPrice) {
    // |======[ UPDATE GOLD ]======|
    player.gold -= upgrades.moreDamage.currentPrice;
    goldText.textContent = player.gold;

    // |======[ UPDATE PRICE ]======|
    upgrades.moreDamage.currentPrice = Math.round(
      upgrades.moreDamage.currentPrice + upgrades.moreDamage.currentPrice * 0.15
    );
    storePrice.textContent = upgrades.moreDamage.currentPrice;

    // |======[ UPDATE DAMAGE ]======|
    upgrades.moreDamage.ammount++;
    player.damage++;
    damageText.textContent = player.damage;
  }
});
