import axios from 'axios';

const API_URL = 'https://678bdfd31a6b89b27a2bb90c.mockapi.io/sales';

export const getData = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addSale = async (newSale) => {

    const response = await axios.post(API_URL, newSale);
    return response.data;
};

export const deleteSale = async (id) => {
    await axios.delete(`${API_URL}/${id}`);

};

export const updateSale = async (updatedSale) => {
    const response = await axios.put(`${API_URL}/${updatedSale.id}`, updatedSale);
    return response.data;

};

