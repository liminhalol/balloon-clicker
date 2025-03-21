const changeThemeBtn = document.querySelector("#btn--change-theme");
let darkTheme = false;

changeThemeBtn.addEventListener("click", function (e) {
  if (!darkTheme) {
    document.documentElement.style.setProperty("--background-color", "black");
    document.documentElement.style.setProperty("--text-color", "white");
    document.documentElement.style.setProperty("--gray-color", "#444");
    document.documentElement.style.setProperty("--green-color", "#34cf15");
    changeThemeBtn.textContent = "tema claro";
    darkTheme = true;
  } else {
    document.documentElement.style.setProperty("--background-color", "white");
    document.documentElement.style.setProperty("--text-color", "black");
    document.documentElement.style.setProperty("--gray-color", "#d4d4d4");
    document.documentElement.style.setProperty("--green-color", "#104d04");
    changeThemeBtn.textContent = "tema escuro";
    darkTheme = false;
  }
});
