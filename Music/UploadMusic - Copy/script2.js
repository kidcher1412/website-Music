
console.log("thong")
let player;
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQBoyOvKWm8bZ0Lk8Kk9uRDPMdIs7ojXJnHtUBwlEpRqUr1G8dko2RyBaUrPtT4rOEAhqX2ZEAmtN2q6hF7rZUYVGJHwb99zP71iaNTcDKVyIsurj-eVaCATXRd5HpVIMmF5mGbCO-IDVJLFEdT2nuNSq7z6vUvWkWf0KWgVgBq_nt77x8zrbq18HRigfkvFflFDxwS6obN6LuKWRQtU3Eo';
    player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });
    player.addListener('initialization_error', ({ message }) => { 
        console.error(message);
    });
  
    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });
  
    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });
    const query = 'dancing in the dark';
    const type = 'track';

const searchResults = fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
  headers: {
    'Authorization': `Basic ${token}`
  }
}).then(response => response.json());
console.log(searchResults)
let tracks = [];
searchResults.then(element =>{
  element.tracks.items.forEach(track=>{
    tracks.push(track)
  })
})
console.log(tracks)
tracks.forEach(track => {

  console.log("track.name");
});
}