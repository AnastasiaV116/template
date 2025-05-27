import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard';
import TrackItem from '../components/TrackItem';
import { fetchLastFM } from '../ut';

interface Artist {
  name: string;
  listeners: string;
  image: { '#text': string; size: string }[];
}

interface Album {
  name: string;
  artist: string;
  image: { '#text': string; size: string }[];
}

interface Track {
  name: string;
  artist: string;
  image: { '#text': string; size: string }[];
  duration: number;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [tracks, setTracks] = React.useState<Track[]>([]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const formattedQuery = `artist=${encodeURIComponent(query)}`;
    fetchLastFM('artist.search', formattedQuery)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.artistmatches && data.results.artistmatches.artist.length > 0) {
          setArtists(data.results.artistmatches.artist.slice(0, 8));
        }
      });

    const albumQuery = `album=${encodeURIComponent(query)}`;
    fetchLastFM('album.search', albumQuery)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.albummatches && data.results.albummatches.album.length > 0) {
          setAlbums(data.results.albummatches.album.slice(0, 8));
        }
      });

    const trackQuery = `track=${encodeURIComponent(query)}`;
    fetchLastFM('track.search', trackQuery)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.trackmatches && data.results.trackmatches.track.length > 0) {
          setTracks(data.results.trackmatches.track.slice(0, 8));
        }
      });
  };

  return (
    <div>
      <Header />
      <main role="main">
        <section className="search-section">
          <div className="search-header">
            <h2 className="section-title">Search results for</h2>
            <ul className="search-tabs">
              <li className="active"><a href="#"><strong>Top Results</strong></a></li>
              <li><a href="#">Artists</a></li>
              <li><a href="#">Albums</a></li>
              <li><a href="#">Tracks</a></li>
            </ul>
          </div>
          <SearchForm onSubmit={handleSearch} />
          <div className="search-results">
            <h3 className="section-subtitle">Artists</h3>
            <div className="artist-grid">
              {artists.map(artist => (
                <ArtistCard key={artist.name} artist={artist} />
              ))}
            </div>
            <h3 className="section-subtitle">Albums</h3>
            <div className="album-grid">
              {albums.map(album => (
                <AlbumCard key={album.name} album={album} />
              ))}
            </div>
            <h3 className="section-subtitle">Tracks</h3>
            <ul className="track-list">
              {tracks.map(track => (
                <TrackItem key={track.name} track={track} />
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;