const BASE_URL = 'http://localhost:3000'

function createRoom(name) {
  const url = BASE_URL + '/create'
  return api(url, {
    method: 'POST',
    body: {
      name: name
    }
  })
}

function api(endpoint, options = {}) {
  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body)
  }
  options = Object.assign({
    headers: {
      'Content-Type': 'application/json'
    }
  }, options)

  const request = new Request(endpoint, options)

  console.log(request)

  return fetch(request).then((response) => {
    return response.json()
  })
}

export default api
export {
  createRoom
}
