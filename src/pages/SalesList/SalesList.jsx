import React, { useState, useEffect } from 'react';
import { getData, deleteSale } from '../../data/dataService';
import './SalesList.css';

const SalesList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const data = await getData();
      setSales(data);
    };
    fetchSales();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSale(id);
      setSales(sales.filter(sale => sale.id !== id));
    } catch (error) {
      console.error('Error deleting sale:', error);
      alert('Error deleting sale. Please try again.');
    }
  };

  return (
    <div className="sales-list-container">
      <h2>Sales List</h2>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Seller</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{new Date(sale.sale_date).toLocaleString()}</td>
              <td>{sale.product}</td>
              <td>{sale.category}</td>
              <td>${sale.price.toFixed(2)}</td>
              <td>{sale.quantity}</td>
              <td>${(sale.price * sale.quantity).toFixed(2)}</td>
              <td>{sale.seller}</td>
              <td>
                <button onClick={() => handleDelete(sale.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;

