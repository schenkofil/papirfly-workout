import { BASE_URL } from '@/constants' //TODO - predelat na global
import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
