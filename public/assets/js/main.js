"use strict";

const inputSearch = document.querySelector(".js-input-search");
const submitBtn = document.querySelector(".js-submit-btn");
const resetBtn = document.querySelector(".js-reset-btn");
const searchResults = document.querySelector(".js-result-list");
const resetBtnFav = document.querySelector(".js-reset-btn-fav");
const favResults = document.querySelector(".js-fav-list");
const errorMessage = document.querySelector(".js_errorMessage");

let animes = [];
let favAnimes = [];

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
  localStorage.clear();
  favResults.innerHTML = "";
}

function handlerResetBtn(ev) {
  ev.preventDefault();
  location.reload();
}

submitBtn.addEventListener("click", getUserInput);

resetBtn.addEventListener("click", handlerResetBtn);

resetBtnFav.addEventListener("click", handlerResetBtnFav);

"use strict";

function renderResults() {
  searchResults.innerHTML = "";
  for (const anime of animes) {
    searchResults.innerHTML += `<li class='li-element js-li-element' id='${
      anime.mal_id
    }'><img class='anime-img' src='${
      anime.image_url ||
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
    }'><h3 class='anime-title'>${anime.title}</h3></li>`;
  }
  //compareFavResults()
  handlerClickedAnime();
}

/*function compareFavResults() {
 const lisSelected = document.querySelectorAll(".js-li-element");
  for (const liSelected of lisSelected) {
    const isFav = favAnimes.find((fav) => fav.mal_id === liSelected.id);
    console.log(fav.mal_id);
  if (isFav === undefined) {
    liSelected.classList.remove("fav");
  } else {
    liSelected.classList.add("fav");
  }
  } 
}*/

function renderFavResults() {
  favResults.innerHTML = "";
  for (let i = 0; i < favAnimes.length; i++) {
    const favAnime = favAnimes[i];
    favResults.innerHTML += `<li class='li-element js-li-element' id='${
      favAnime.mal_id
    }'><img class='anime-img' src='${
      favAnime.image_url ||
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
    }'><h3 class='anime-title'>${
      favAnime.title
    }</h3><i class="fas fa-times"></i></li>`;
  }
  handlerClickedAnime();
}

"use strict";

function handlerClickedFav(ev) {
  ev.preventDefault();
  const clickedAnime = parseInt(ev.currentTarget.id);
  const favClicked = favAnimes.findIndex((fav) => {
    return fav.mal_id === clickedAnime;
  });
  if (favClicked === -1) {
    const animeAdd = animes.find((animeElement) => {
      return animeElement.mal_id === clickedAnime;
    });
    favAnimes.push(animeAdd);
  } else {
    favAnimes.splice(favClicked, 1);
  }
  renderFavResults();
  //renderResults();
  setInLocalStorage();
}

function handlerClickedAnime() {
  const animesListened = document.querySelectorAll(".js-li-element");
  for (const animeListened of animesListened) {
    animeListened.addEventListener("click", handlerClickedFav);
  }
}

"use strict";

function setInLocalStorage() {
  const toString = JSON.stringify(favAnimes);
  localStorage.setItem("anime", toString);
}

function getInLocalStorage() {
  const localStorageFavAnimes = localStorage.getItem("anime");
  favAnimes = JSON.parse(localStorageFavAnimes);
  if (favAnimes === null) {
    favAnimes = [];
  } else {
    renderFavResults();
  }
}
getInLocalStorage();

//# sourceMappingURL=main.js.map
