const BASE_URL = 'http://localhost:3000';

function getRooms() {
  const url = BASE_URL + '/rooms';
  return api(url)
}

function getRoom(name) {
  const url = BASE_URL + '/rooms/' + name;
  return api(url);
}

function createRoom(name) {
  const url = BASE_URL + '/create';
  return api(url, {
    method: 'POST',
    body: {
      name: name
    }
  });
}

function vote(name, vote) {
    const url = BASE_URL + '/vote';
    const votes = Object.assign({
      name: name,
      dance: 0,
      valens: 0,
      instr: 0
    }, vote)

    return api(url, {
        method: 'POST',
        body: votes
    });
}

function api(endpoint, options = {}) {
  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }
  options = Object.assign({
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }, options);

  const request = new Request(endpoint, options);


  return fetch(request).then((response) => response.json());
}

export default api;
export {
  getRooms,
  getRoom,
  createRoom,
  vote,
};
