//// HELPERS
function getId(uri) {
  return uri.split(":")[2];
}

function playTrack(uri) {
  window.App.playTrack(uri)
}

export {
  getId,
  playTrack
};
