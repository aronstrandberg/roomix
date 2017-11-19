//// HELPERS
function getId(uri) {
  return uri.split(":")[2];
}

function playTrack(uri) {
  window.App.playTrack(uri)
}

function findRecommendedTrack(uri, room) {
  const id = getId(uri)
  return window.App.recommendedTrack(id, room)
}

export {
  getId,
  playTrack,
  findRecommendedTrack,
};
