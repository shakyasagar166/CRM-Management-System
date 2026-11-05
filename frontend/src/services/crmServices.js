import api from './api';

export const leadService = {
  getAll: async () => {
    const response = await api.get('/leads');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/leads', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/leads/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },
  search: async (query) => {
    const response = await api.get('/leads/search', { params: { query } });
    return response.data;
  },
  convert: async (id) => {
    const response = await api.post(`/leads/${id}/convert`);
    return response.data;
  }
};

export const salesService = {
  getAll: async () => {
    const response = await api.get('/sales');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/sales', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/sales/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/sales/${id}`);
    return response.data;
  },
  getMetrics: async () => {
    const response = await api.get('/sales/metrics');
    return response.data;
  }
};

export const taskService = {
  getAll: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/tasks', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
};

export const followUpService = {
  getAll: async () => {
    const response = await api.get('/followups');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/followups', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/followups/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/followups/${id}`);
    return response.data;
  }
};

export const dashboardService = {
  getData: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  }
};
