const API_URL = 'http://localhost:3000/api';

export async function apiRequest(path, method = 'GET', body) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_URL + path, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export function parseHashtags(text) {
  const tags = text
    .split(/[\s,]+/)
    .map((tag) => tag.replace('#', '').toLowerCase())
    .filter((tag) => tag !== '');
  return [...new Set(tags)];
}
