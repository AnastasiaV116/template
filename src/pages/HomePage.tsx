import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard';
import TrackItem from '../components/TrackItem';
import { fetchLastFM } from '../ut';
import '../css/styles-index.css';

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

const HomePage: React.FC = () => {
  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [tracks, setTracks] = React.useState<Track[]>([]);

  React.useEffect(() => {
    fetchLastFM('chart.getTopArtists', '')
      .then(response => response.json())
      .then(data => {
        if (data.artists && data.artists.artist.length > 0) {
          setArtists(data.artists.artist.slice(0, 12));
        }
      });

    fetchLastFM('chart.getTopAlbums', '')
      .then(response => response.json())
      .then(data => {
        if (data.albums && data.albums.album.length > 0) {
          setAlbums(data.albums.album.slice(0, 12));
        }
      });

    fetchLastFM('chart.getTopTracks', '')
      .then(response => response.json())
      .then(data => {
        if (data.tracks && data.tracks.track.length > 0) {
          setTracks(data.tracks.track.slice(0, 12));
        }
      });
  }, []);

  return (
    <div>
      <Header />
      <main role="main">
        <section className="artists-section">
          <h2 className="section-title">Music</h2>
          <h3 className="section-subtitle">Hot right now</h3>
          <div className="underline"></div>
          <div className="artist-grid">
            {artists.map(artist => (
              <ArtistCard key={artist.name} artist={artist} />
            ))}
          </div>
        </section>
        <section className="albums-section">
          <h2 className="section-subtitle">Popular albums</h2>
          <div className="underline"></div>
          <div className="album-grid">
            {albums.map(album => (
              <AlbumCard key={album.name} album={album} />
            ))}
          </div>
        </section>
        <section className="tracks-section">
          <h2 className="section-subtitle">Popular tracks</h2>
          <div className="underline"></div>
          <ul className="track-list">
            {tracks.map(track => (
              <TrackItem key={track.name} track={track} />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;