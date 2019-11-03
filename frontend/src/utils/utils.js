import axios from 'axios';

export function http(base) {
  return axios.create({
    baseURL: base,
    timeout: 10000,
  })
}