const defaultHeaders = {
  'Content-Type': 'application/json'
}

const actionDefs = {
  'login' () {
    return {
      method: 'POST',
      endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:5000/auth/login' : '/auth/login'
    }
  }
}

class ApiClient {
  constructor () {
    this.headers = { ...defaultHeaders }
  }

  call (action, data = {} ) {
    const { method, endpoint } = actionDefs[action]()
    return fetch(endpoint, {
      method: method,
      headers: defaultHeaders,
      credentials: 'include',
      body: JSON.stringify(data)
    })
  }
}

const apiClient = new ApiClient()
export default apiClient

// export const apiClient = new APIClient()