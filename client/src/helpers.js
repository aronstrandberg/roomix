//// HELPERS
function getId(uri) {
  return uri.split(":")[2];
}

function playTrack(uri) {
  return window.App.playTrack(uri)
}

function findRecommendedTrack(uri, room) {
  const id = getId(uri)
  return window.App.recommendedTrack(id, room)
}

function timeLeft(state) {
  if (!state) return 10000000
  return state.duration - state.position
}

function timeToSearch(state) {
  if (!state) return null
  const time = timeLeft(state)
  return (time < 10000 && time > 0)
}

function timeToSwitch(state) {
  if (!state) return null
  const time = timeLeft(state)
  return (time < 1000 && time > 0)
}

export {
  getId,
  playTrack,
  findRecommendedTrack,
  timeLeft,
  timeToSearch,
  timeToSwitch,
};
