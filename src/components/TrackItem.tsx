import React from 'react';
import { formatDuration } from '../ut';

const TrackItem: React.FC<{ track: any }> = ({ track }) => {
  return (
    <li className="track-item">
      <img src={track.image[2]['#text']} alt={track.name} className="track-image" />
      <h4>{track.name}</h4>
      <p>{track.artist}</p>
      <p className="track-duration">{formatDuration(track.duration)}</p>
    </li>
  );
};

export default TrackItem;