import apiClient from '../api-services/api-client';

const authEndpoints = {
  login: 'customer/login',
  register: 'customer/register',
};
const authService = {
  login: (email: string, password: string) => {
    return apiClient
      .post('https://localhost:7253/api/v1/customer/login', { email: email, password: password })
      .then((response) => {
        // session handle
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
};

export default authService;
