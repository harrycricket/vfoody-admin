import apiClient from '../api-services/api-client';

const authEndpoints = {
  login: 'customer/login',
  register: 'customer/register',
};
const authService = {
  login: async (email: string, password: string) => {
    return await apiClient
      .post(authEndpoints.login, { email: email, password: password })
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
