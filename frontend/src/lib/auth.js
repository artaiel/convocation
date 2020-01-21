export const isLoggedIn = () => {
  return document.cookie.split(';').map(cookie => cookie.trim()).includes('ccua=true')
}