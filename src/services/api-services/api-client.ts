import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5063/api/v1/',
  // baseURL: 'https://my-json-server.typicode.com/duckodei/test-json-server/',
});
