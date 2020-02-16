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
  'deleteUser' () {
    return {
      method: 'DELETE',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/user/delete' : '/user/delete'
    }
  },
  'deleteEvent' (eventId) {
    return {
      method: 'DELETE',
      endpoint: process.env.NODE_ENV === 'development' ? `http://localhost:5000/event/${eventId}` : `/event/${eventId}`
    }
  },
  'getEventData' (eventId) {
    return {
      method: 'GET',
      endpoint: process.env.NODE_ENV === 'development' ? `http://localhost:5000/event/data/${eventId}` : `/event/data/${eventId}`
    }
  },
  'updateEventAvailability' () {
    return {
      method: 'POST',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/event/update-availability' : '/event/update-availability'
    }
  },
  'updateEventData' () {
    return {
      method: 'POST',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/event/update-data' : '/event/update-data'
    }
  },
  'updateUserData' () {
    return {
      method: 'POST',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/user/update' : '/user/update'
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
  },
  'forgotPassword' () {
    return {
      method: 'POST',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/auth/forgot-password' : '/auth/forgot-password'
    }
  },
  'getUserData' () {
    return {
      method: 'GET',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/user/events' : '/user/events'
    }
  }
}

class ApiClient {
  constructor () {
    this.headers = { ...defaultHeaders }
  }

  call (action, data, param) {
    const { method, endpoint } = actionDefs[action](param)
    if (method === 'POST') {
      return fetch(endpoint, {
        method: method,
        headers: defaultHeaders,
        credentials: 'include',
        body: JSON.stringify(data)
      })
    } else {
      return fetch(endpoint, {
          method: method,
          headers: defaultHeaders,
          credentials: 'include'
        })
    }
  }
}

const apiClient = new ApiClient()
export default apiClient

// export const apiClient = new APIClient()