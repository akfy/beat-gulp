;(function () {

  const menuButton = document.querySelector(".menu__hamburger");
  const menu = document.querySelector(".fullscrean-menu");
  const closeElement = document.querySelector(".close__icon");



  menuButton.addEventListener("click", e => {
    e.preventDefault();
    menu.style.display = "flex";

  })

  menu.addEventListener("click", e => {
    if (!e.target.classList.contains("list")) {
      menu.style.display = "none";
    }
  })

  closeElement.addEventListener("click", e => {
    e.preventDefault();
    menu.style.display = "none";
  })

})();