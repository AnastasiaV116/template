
/**
 * отправка запроса к API
 * @param {string} method - метод API
 * @param {string} query - запрос пользователя
 * @returns {Promise<Response>} - ответ от API
 */
function fetchLastFM(method, query) {
  const apiKey = 'b8a62d8f6b339701fcc32c8071368365';
  const url = `https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${apiKey}&format=json&${query}`;
  return fetch(url);
}

/**
 * отображение результатов поиска исполнителей
 * @param {string} query - запрос пользователя
 */
function displaySearchResults(query) {
  const artistGrid = document.querySelector('.artist-grid');
  artistGrid.innerHTML = ''; // Очистка предыдущих результатов

  const formattedQuery = `artist=${encodeURIComponent(query)}`;

  fetchLastFM('artist.search', formattedQuery)
    .then(response => response.json())
    .then(data => {
      console.log('Artist search results:', data); //проверка ответа
      if (data.results && data.results.artistmatches && data.results.artistmatches.artist.length > 0) {
        const artists = data.results.artistmatches.artist;
        const artistsToShow = artists.slice(0, 8); //8 артистов
        artistsToShow.forEach(artist => {
          const artistCard = document.createElement('div');
          artistCard.classList.add('artist-card');

          const imgSrc = artist.image && artist.image[2] && artist.image[2]['#text'] ? artist.image[2]['#text'] : 'placeholder.jpg'; // Замени на свой путь к запасному изображению

          artistCard.innerHTML = `
            <img src="${imgSrc}" alt="${artist.name}" class="artist-image">
            <h4>${artist.name}</h4>
            <p>${artist.listeners} слушателей</p>
          `;
          artistGrid.appendChild(artistCard);
        });
      } else {
        artistGrid.innerHTML = '<p>Нет результатов</p>';
      }
    })
    .catch(error => {
      console.error('Ошибка при запросе к API:', error);
      artistGrid.innerHTML = '<p>Произошла ошибка при запросе к API</p>';
    });
}

/**
 * отображение результатов поиска альбомов
 * @param {string} query - запрос пользователя
 */
function displaySearchAlbums(query) {
  const albumGrid = document.querySelector('.album-grid');
  albumGrid.innerHTML = '';

  const formattedQuery = `album=${encodeURIComponent(query)}`;

  fetchLastFM('album.search', formattedQuery)
    .then(response => response.json())
    .then(data => {
      console.log('Album search results:', data);
      if (data.results && data.results.albummatches && data.results.albummatches.album.length > 0) {
        const albums = data.results.albummatches.album;
        const albumsToShow = albums.slice(0, 8); // 8 альбомов
        albumsToShow.forEach(album => {
          const albumCard = document.createElement('div');
          albumCard.classList.add('album-card');

          const imgSrc = album.image && album.image[2] && album.image[2]['#text'] ? album.image[2]['#text'] : 'notfound.png';

          albumCard.innerHTML = `
            <img src="${imgSrc}" alt="${album.name}" class="album-image">
            <h4>${album.name}</h4>
            <p>${album.artist}</p>
          `;
          albumGrid.appendChild(albumCard);
        });
      } else {
        albumGrid.innerHTML = '<p>Нет результатов</p>';
      }
    })
    .catch(error => {
      console.error('Ошибка при запросе к API:', error);
      albumGrid.innerHTML = '<p>Произошла ошибка при запросе к API</p>';
    });
}

/**
 * отображение результатов поиска треков
 * @param {string} query - запрос пользователя
 */
function displaySearchTracks(query) {
  const trackList = document.querySelector('.track-list');
  trackList.innerHTML = '';

  const formattedQuery = `track=${encodeURIComponent(query)}`;

  fetchLastFM('track.search', formattedQuery)
    .then(response => response.json())
    .then(data => {
      console.log('Track search results:', data);
      if (data.results && data.results.trackmatches && data.results.trackmatches.track.length > 0) {
        const tracks = data.results.trackmatches.track;
        const tracksToShow = tracks.slice(0, 8); // 8 треков
        tracksToShow.forEach(track => {
          const trackItem = document.createElement('li');
          trackItem.classList.add('track-item');

          const imgSrc = track.image && track.image[2] && track.image[2]['#text'] ? track.image[2]['#text'] : 'placeholder.jpg'; // Замени на свой путь к запасному изображению

          trackItem.innerHTML = `
            <img src="${imgSrc}" alt="${track.name}" class="track-list img">
            <a>${track.name}</a>
            <span>${track.artist}</span>
            <span class="track-duration">${formatDuration(track.duration)}</span>
          `;
          trackList.appendChild(trackItem);
        });
      } else {
        trackList.innerHTML = '<p>Нет результатов</p>';
      }
    })
    .catch(error => {
      console.error('Ошибка при запросе к API:', error);
      trackList.innerHTML = '<p>Произошла ошибка при запросе к API</p>';
    });
}

// форматирование продолжительности трека
function formatDuration(duration) {
  if (isNaN(duration) || duration === null) {
    return '0:00'; // длительность не определена
  }
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// форма поиска
document.querySelector('.search-form').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.querySelector('input[name="query"]').value.trim();
  if (query) {
    displaySearchResults(query);
    displaySearchAlbums(query);
    displaySearchTracks(query);
  }
});



