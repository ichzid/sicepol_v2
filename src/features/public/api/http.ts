import axios from 'axios'
export const http=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||'https://api-bapenda.ichmal.my.id/api',headers:{Accept:'application/json'},timeout:10000})
