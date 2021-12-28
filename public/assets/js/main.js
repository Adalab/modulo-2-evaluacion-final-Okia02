'use strict';

const inputSearch = document.querySelector('.js-input-search');
const submitBtn = document.querySelector('.js-submit-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const searchResults = document.querySelector('.js-result-list');
const favResults = document.querySelector('.js-fav-list');

let animes = [];
let favAnimes = [];

function getUserInput(ev) {
ev.preventDefault();
fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearch.value}`)
.then((response) => response.json())
.then((animeData) => {
animes = animeData.results;
    for (let i = 0; i < animes.length; i++) {
        const anime = animes[i];
        searchResults.innerHTML += `<li class='li-element' id='anime-${i}'><img class='anime-img' src='${anime.image_url || 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'}><h3 class='anime-title'>${anime.title}</h3></li>'`;
    }
    for (let i = 0; i < animes.length; i++) {
        const element = document.querySelector(`#anime-${i}`);
        element.addEventListener("click", (ev) => {
          ev.preventDefault();
          ev.currentTarget.classList.toggle("selected");
        });
      }

});
}

function handlerResetBtn() {
location.reload();
}

submitBtn.addEventListener('click', getUserInput);
resetBtn.addEventListener('click', handlerResetBtn);
//# sourceMappingURL=main.js.map
