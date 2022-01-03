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
