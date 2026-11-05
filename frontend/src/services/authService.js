import api from './api';

export const authService = {
  login: async (usernameOrEmail, password) => {
    const response = await api.post('/auth/login', { usernameOrEmail, password });
    if (response.data && response.data.accessToken) {
      localStorage.setItem('crm_token', response.data.accessToken);
      localStorage.setItem('crm_user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('crm_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('crm_token');
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
