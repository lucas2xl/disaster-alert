import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://111b-2804-4d98-174-1000-55bb-acf8-8110-ad0f.ngrok.io',
  headers: {
    'Content-Type': 'application/json',
  },
});
