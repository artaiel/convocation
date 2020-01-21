const defaultHeaders = {
  'Content-Type': 'application/json'
}

const actionDefs = {
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

  call (action, data ) {
    const { method, endpoint } = actionDefs[action]()
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