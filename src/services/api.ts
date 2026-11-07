import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const getToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token')
}

const api = axios.create({
    baseURL : BASE_URL,
    headers:{
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export const getReadings = () => api.get('/api/readings')
export const getDevices = () => api.get('/api/devices')
export const login = (email: string, password: string) =>
  api.post('/api/auth/login', { email, password })

export default api