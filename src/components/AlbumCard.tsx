import React from 'react';

const AlbumCard: React.FC<{ album: any }> = ({ album }) => {
  return (
    <div className="album-card">
      <img src={album.image[2]['#text']} alt={album.name} className="album-image" />
      <h4>{album.name}</h4>
      <p>{album.artist}</p>
    </div>
  );
};

export default AlbumCard;