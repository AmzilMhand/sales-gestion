import axios from 'axios';

const API_URL = 'https://678bdfd31a6b89b27a2bb90c.mockapi.io';

//Sales Api 
export const getSales = async () => {
  const response = await axios.get(`${API_URL}/sales`);
  return response.data;
};

export const addSale = async (saleData) => {
  const response = await axios.post(`${API_URL}/sales`, saleData);
  return response.data;
};

export const updateSale = async (id, saleData) => {
  const response = await axios.put(`${API_URL}/sales/${id}`, saleData);
  return response.data;
};

export const deleteSale = async (id) => {
  await axios.delete(`${API_URL}/sales/${id}`);
};


//Users Api
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const addUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};
