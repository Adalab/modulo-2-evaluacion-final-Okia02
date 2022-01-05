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
    console.log(favAnimes[favClicked].title);
  }
  renderResults();
  renderFavResults();
  setInLocalStorage();
}

function handlerClickedAnime() {
  const animesListened = document.querySelectorAll(".js-li-element");
  for (const animeListened of animesListened) {
    animeListened.addEventListener("click", handlerClickedFav);
  }
}
