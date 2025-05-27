export function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function fetchLastFM(method: string, query: string): Promise<Response> {
  const apiKey = 'b8a62d8f6b339701fcc32c8071368365';
  const url = `https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${apiKey}&format=json&${query}`;
  return fetch(url);
}