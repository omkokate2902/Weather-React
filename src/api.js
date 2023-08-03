// api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Get the CSRF token from the cookie
const csrfCookie = document.cookie
  .split(';')
  .find((cookie) => cookie.trim().startsWith('csrftoken='));

if (csrfCookie) {
  const csrfToken = csrfCookie.split('=')[1];
  api.defaults.headers.common['X-CSRFToken'] = csrfToken;
}

export default api;
