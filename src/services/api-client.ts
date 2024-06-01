import axios from 'axios';

export default axios.create({
  baseURL: 'http://ec2-54-255-224-230.ap-southeast-1.compute.amazonaws.com:8080/',
  // baseURL: "https://my-json-server.typicode.com/duckodei/dsocial-json-server",
});
