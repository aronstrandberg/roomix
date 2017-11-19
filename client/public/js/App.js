/* global App */

/**
 * (C) 2017 Spotify AB
 */

const App = {
  /**
   * The user's access token from Spotify. Lasts 60 minutes.
   *
   * Code Sample:
   *   console.log(App.access_token);
   */
  access_token: null,

  /**
   * Our local instance of Web Playback SDK.
   *
   * Code Sample:
   *   console.log(App.WebPlaybackSDK);
   */
  WebPlaybackSDK: null,

  /**
   * Some custom callbacks we've created.
   */
  renderWebPlaybackSDKError:   null, // Throw an error (our app equiv. of console.error)
  onSpotifyPlayerConnected:    null, // User session starts
  onSpotifyUserSessionExpires: null, // User session expires

  /**
   * Transfer Playback.
   *
   * See https://beta.developer.spotify.com/documentation/web-api/
   *
   * Example code:
   *   App.transferPlayback()
   */
  transferPlayback: () => {
    let request = new Request("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: new Headers({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + App.getAccessToken()
      }),
      body: JSON.stringify({
        play: true,
        device_ids: [App.WebPlaybackSDK._options.id]
      })
    });

    return window.fetch(request);
  },

   /**
    * Play a track.
    *
    * See https://beta.developer.spotify.com/documentation/web-api/
    *
    * Example code:
    *   App.playTrack("spotify:track:1j4kHkkpqZRBwE0A4CN4Yv")
    */
    playTrack: (uri) => {
      let request = new Request("https://api.spotify.com/v1/me/player/play", {
        method: "PUT",
        headers: new Headers({
          'Content-Type':  'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + App.getAccessToken()
        }),
       body: JSON.stringify({ uris: [uri] })
      });

      return window.fetch(request).then((resp) => resp.json());
    },

   /**
    * Search
    *
    * See https://beta.developer.spotify.com/documentation/web-api/
    *
    * Example code:
    *   App.searchTracks("Kanye West").then((searchResults) => { console.log(searchResults); });
    */
    searchTracks: (query) => {
      let request = new Request("https://api.spotify.com/v1/search?type=track&limit=5&q="+query+"*&market=from_token", {
        method: "GET",
        headers: new Headers({
          'Content-Type':  'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + App.getAccessToken()
        })
      });

      return window.fetch(request).then((resp) => resp.json());
    },
    
    recommendedTrack: (values) => {
      let request = new Request("https://api.spotify.com/v1/recommendations?"+
                        "limit=1"+
                        "seed_tracks="+values.currentTrack+
                        "&target_danceability="+values.danceability+
                        "&target_instrumentalness="+values.instrumentalness+
                        "&target_valence="+values.valence+
                        "*&market=from_token", {
        method: "GET",
        headers: new Headers({
          'Content-Type':  'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + App.getAccessToken()
        })
      });

      return window.fetch(request).then((resp) => resp.json());
    }

};

window.App = App;
