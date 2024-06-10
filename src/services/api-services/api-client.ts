import axios from 'axios';

export default axios.create({
  baseURL: 'https://localhost:7253/api/v1/',
  // baseURL: 'https://my-json-server.typicode.com/duckodei/test-json-server/',
});
