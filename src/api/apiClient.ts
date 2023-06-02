import axios, { type AxiosInstance } from 'axios'
import { type TileData } from '@/types/Tile'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:7777',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
