import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:5063/api/v1/',
  baseURL: 'http://ec2-13-212-161-54.ap-southeast-1.compute.amazonaws.com/api/v1/',
  // baseURL: 'https://my-json-server.typicode.com/duckodei/test-json-server/',
});
