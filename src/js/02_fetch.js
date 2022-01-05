"use strict";

function getUserInput(ev) {
  ev.preventDefault();
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((animesData) => {
      animes = animesData.results;
      renderResults();
    });
}

function handlerResetBtnFav(ev) {
  ev.preventDefault();
  favResults.innerHTML = "";
  localStorage.clear();
  location.reload();
}

function handlerResetBtn(ev) {
  ev.preventDefault();
  location.reload();
}

submitBtn.addEventListener("click", getUserInput);

resetBtn.addEventListener("click", handlerResetBtn);

resetBtnFav.addEventListener("click", handlerResetBtnFav);


