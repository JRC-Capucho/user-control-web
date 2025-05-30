import { getSession } from 'next-auth/react'

import axios, { type AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (request) => {
  const session = await getSession()

  if (session?.token) {
    request.headers.Authorization = `Bearer ${session.token}`
  }

  return request
})

export default api
