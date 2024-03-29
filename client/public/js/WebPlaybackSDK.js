/* global Spotify, App */

/**
 * (C) 2017 Spotify AB
 */

/**
 * window.onSpotifyWebPlaybackSDKReady
 * This is a function required by the Web Playback SDK.
 * If we don't call this, an error is thrown.
 *
 * See more at https://beta.developer.spotify.com/documentation/web-playback-sdk/reference/#initializing-the-sdk
 */


window.onSpotifyWebPlaybackSDKReady = () => {
  if (App.isAccessToken()) {
    // Initialize the SDK
    let spotifyPlayer = new Spotify.Player({
      name: "PotatoChip",
      volume: 0.8,
      getOAuthToken: cb => {
        if (App.isAccessToken()) {
          cb(App.getAccessToken());
        }
      }
    });

    // Error handling
    spotifyPlayer.on("initialization_error", (e) => {
      window.renderWebPlaybackSDKError("Initialization Error", e.message);
    });

    spotifyPlayer.on("authentication_error", (e) => {
      window.renderWebPlaybackSDKError("Authentication Error", e.message);
    });

    spotifyPlayer.on("account_error", (e) => {
      window.renderWebPlaybackSDKError("Account Error", e.message);
    });

    spotifyPlayer.on("playback_error", (e) => {
      window.renderWebPlaybackSDKError("Playback Error", e.message);
    });

    // Make our player go live
    spotifyPlayer.connect();

    // Make the player globally accessible
    App.WebPlaybackSDK = spotifyPlayer;

    // Run our internal method of when the player has connected
    spotifyPlayer.on("ready", (data) => { App.onSpotifyPlayerConnected(data); });
  }
};
