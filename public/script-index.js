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
 * отображение популярных артистов
 */
function displayPopularArtists() {
  const artistGrid = document.querySelector('.artist-grid');
  artistGrid.innerHTML = '';

  fetchLastFM('chart.getTopArtists', '')
    .then(response => response.json())
    .then(data => {
      if (data.artists && data.artists.artist.length > 0) {
        const artists = data.artists.artist.slice(0, 12); //12 артистов
        artists.forEach(artist => {
          const artistCard = document.createElement('div');
          artistCard.classList.add('artist-card');
          artistCard.innerHTML = `
            <img src="${artist.image[1]['#text']}" alt="${artist.name}" class="artist-image">
            <h4>${artist.name}</h4>
            <p class="artist-genre">Загрузка жанра...</p>
          `;
          artistGrid.appendChild(artistCard);

          // Получение жанра артиста
          fetchLastFM('artist.getInfo', `artist=${artist.name}`)
            .then(response => response.json())
            .then(data => {
              if (data.artist && data.artist.tags && data.artist.tags.tag.length > 0) {
                const genre = data.artist.tags.tag[0].name;
                artistCard.querySelector('.artist-genre').textContent = genre;
              } else {
                artistCard.querySelector('.artist-genre').textContent = 'Жанр недоступен';
              }
            })
            .catch(error => {
              console.error('Ошибка при запросе жанра:', error);
              artistCard.querySelector('.artist-genre').textContent = 'Ошибка при загрузке жанра';
            });
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
 * отображениt популярных треков
 */
function displayPopularTracks() {
  const trackGrid = document.querySelector('.track-grid');
  trackGrid.innerHTML = '';

  fetchLastFM('chart.getTopTracks', '')
    .then(response => response.json())
    .then(data => {
      if (data.tracks && data.tracks.track.length > 0) {
        const tracks = data.tracks.track.slice(0, 12); //12 треков
        tracks.forEach(track => {
        console.log(track);
          const trackCard = document.createElement('div');
          trackCard.classList.add('track-card');
          trackCard.innerHTML = `
            <img src="${track.image[1]['#text']}" alt="${track.name}" class="track-image">
            <div class="track-info">
              <h4>${track.name}</h4>
              <p>${track.artist.name}</p>
              <p class="track-duration">${formatDuration(track.duration)}</p>
            </div>
          `;
          trackGrid.appendChild(trackCard);
        });
      } else {
        trackGrid.innerHTML = '<p>Нет результатов</p>';
      }
    })
    .catch(error => {
      console.error('Ошибка при запросе к API:', error);
      trackGrid.innerHTML = '<p>Произошла ошибка при запросе к API</p>';
    });
}
/**
 * форматирование продолжительности трека
 * @param {number} duration - Продолжительность в миллисекундах
 * @returns {string} - Форматированная продолжительность
 */
function formatDuration(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


window.addEventListener('load', displayPopularArtists);
window.addEventListener('load', displayPopularTracks);
