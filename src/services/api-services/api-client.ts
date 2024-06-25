import axios from 'axios';

export default axios.create({
  baseURL: 'http://ec2-13-212-161-54.ap-southeast-1.compute.amazonaws.com/api/v1/',
});
