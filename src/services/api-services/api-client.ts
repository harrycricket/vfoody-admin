import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://vfoody-api.1wolfalone1.com/api/v1/',
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
