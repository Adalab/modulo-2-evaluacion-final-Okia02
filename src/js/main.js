"use strict";
//variables
const inputSearch = document.querySelector(".js-input-search");
const submitBtn = document.querySelector(".js-submit-btn");
const resetBtn = document.querySelector(".js-reset-btn");
//lista de resultados
const searchResults = document.querySelector(".js-result-list");
//lista de favoritos
const favResults = document.querySelector(".js-fav-list");
let id = "";

let animes = [];
let favAnimes = [];

function getUserInput(ev) {
  ev.preventDefault();
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((animesData) => {
      animes = animesData.results;
      /*for (const anime of animes) {
  id = anime.mal_id;
}*/
      renderResults();
    });
}

//Pintar resultados
function renderResults() {
  searchResults.innerHTML = "";
  for (let i = 0; i < animes.length; i++) {
    const anime = animes[i];
    //id = anime.mal_id;
    searchResults.innerHTML += `<li class='li-element js-li-element' id='${
      anime.mal_id
    }'><img class='anime-img' src='${
      anime.image_url ||
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
    }><h3 class='anime-title'>${anime.title}</h3></li>'`;
  }
  handlerClickedAnime();
}

//Pintar resultados favoritos
function renderFavResults() {
  favResults.innerHTML = "";
  for (let i = 0; i < favAnimes.length; i++) {
    const favAnime = favAnimes[i];
    //id = favAnime.mal_id;
    console.log(id);
    favResults.innerHTML += `<li class='li-element js-li-element fav' id='${
      favAnime.mal_id
    }'><img class='anime-img' src='${
      favAnime.image_url ||
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
    }><h3 class='anime-title'>${
      favAnime.title
    }</h3></li>'<i class="fas fa-times"></i>`;
  }
  handlerClickedAnime();
}

//Añadir resultado a favoritos
function handlerClickedFav(ev) {
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
  //pintar favoritos
  renderFavResults();
  //guardar favoritos
  setInLocalStorage();
}

//Seleccionar elemento de la lista de resultados
function handlerClickedAnime() {
  const animesListened = document.querySelectorAll(".js-li-element");
  for (const animeListened of animesListened) {
    //selección y evento
    animeListened.addEventListener("click", handlerClickedFav);
  }
}

//localizar y convertir favorito para guardar en local
function setInLocalStorage() {
  const toString = JSON.stringify(favAnimes);
  localStorage.setItem("anime", toString);
}
//guardar elemento favorito en local
function getInLocalStorage() {
  const localStorageFavAnimes = localStorage.getItem("anime");
  favAnimes = JSON.parse(localStorageFavAnimes);
  if (favAnimes === null) {
    favAnimes = [];
  } else {
    renderFavResults();
  }
}
//importante activar esto
getInLocalStorage();

//Botón reset
function handlerResetBtn() {
  location.reload();
}

//Evento submit
submitBtn.addEventListener("click", getUserInput);
//Evento reset
resetBtn.addEventListener("click", handlerResetBtn);
