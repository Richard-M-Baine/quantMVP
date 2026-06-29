// src/api.js
const BASE_URL = process.env.REACT_APP_API_URL || '';

export const apiFetch = (path, options = {}) =>
  fetch(`${BASE_URL}${path}`, options);