import React from 'react';

const ArtistCard: React.FC<{ artist: any }> = ({ artist }) => {
  return (
    <div className="artist-card">
      <img src={artist.image[2]['#text']} alt={artist.name} className="artist-image" />
      <h4>{artist.name}</h4>
      <p>{artist.listeners} слушателей</p>
    </div>
  );
};

export default ArtistCard;