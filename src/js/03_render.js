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
