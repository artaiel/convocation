const defaultHeaders = {
  'Content-Type': 'application/json'
}

const actionDefs = {
  'createEvent' () {
    return {
      method: 'POST',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/event/create' : '/event/create'
    }
  },
  'getEventData' (eventId) {
    return {
      method: 'GET',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/event/data/' + eventId : '/event/data/' + eventId
    }
  },
  'updateEvent' () {
    return {
      method: 'POST',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/event/update' : '/event/update'
    }
  },
  'signup' () {
    return {
      method: 'POST',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/auth/signup' : '/auth/signup'
    }
  },
  'login' () {
    return {
      method: 'POST',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/auth/login' : '/auth/login'
    }
  },
  'logout' () {
    return {
      method: 'GET',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/auth/logout' : '/auth/logout'
    }
  }
}

class ApiClient {
  constructor () {
    this.headers = { ...defaultHeaders }
  }

  call (action, data, param) {
    const { method, endpoint } = actionDefs[action](param)
    if (method !== 'GET') {
      return fetch(endpoint, {
        method: method,
        headers: defaultHeaders,
        credentials: 'include',
        body: JSON.stringify(data)
      })
    }
    return fetch(endpoint, {
        method: method,
        headers: defaultHeaders,
        credentials: 'include'
      })
  }
}

const apiClient = new ApiClient()
export default apiClient

// export const apiClient = new APIClient()