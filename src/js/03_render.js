"use strict";

function renderResults() {
  searchResults.innerHTML = "";
  for (const anime of animes) {
    const animeInFav = favAnimes.find((fav) => fav.mal_id === anime.mal_id);
    let favAdd = "";
    animeInFav !== undefined ? (favAdd = "fav") : (favAdd = "");
    let airingAnime =
      anime.airing === true
        ? `<a class='js-airing' href='${anime.url}'>Más detalles</a>`
        : `<p class='js-not-airing'>No se está transmitiendo</p>`;
    searchResults.innerHTML += `<li class='li-element js-li-element ${favAdd}' id='${
      anime.mal_id
    }'><img class='anime-img' src='${
      anime.image_url ||
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
    }'><h3 class='anime-title'>${
      anime.title
    }</h3><div>${airingAnime}</div></li>`;
  }
  handlerClickedAnime();
}

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
