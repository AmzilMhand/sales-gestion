import React, { useState, useEffect } from "react";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { getSales, addSale, updateSale, deleteSale } from "../../services/api";

import "./SalesList.css";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSale, setNewSale] = useState({
    product: "",
    category: "",
    price: "",
    quantity: "",
    seller: "",
    sale_date: new Date().toISOString().split("T")[0],
  });
  const [editingSale, setEditingSale] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getSales();
        setSales(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales:", error);
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSale((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const action = editingSale ? updateSale(editingSale.id, newSale) : addSale(newSale);
      const addedSale = await action;
      setSales((prevSales) =>
        editingSale
          ? prevSales.map((sale) => (sale.id === editingSale.id ? { ...sale, ...newSale } : sale))
          : [...prevSales, addedSale]
      );
      closeModal();
    } catch (error) {
      console.error("Error saving sale:", error);
    }
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setNewSale({ ...sale, sale_date: new Date(sale.sale_date).toISOString().split("T")[0] });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSale(id);
      setSales(sales.filter((sale) => sale.id !== id));
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSale(null);
    setNewSale({
      product: "",
      category: "",
      price: "",
      quantity: "",
      seller: "",
      sale_date: new Date().toISOString().split("T")[0],
    });
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="sales-page">
      <div className="sales-header">
        <h1>Sales Management</h1>
        <button className="add-sale-btn" onClick={() => setIsModalOpen(true)}>
          <MdAdd /> Add New Sale
        </button>
      </div>
      <div className="sales-table-container">
        <table className="sales-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Seller</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.product}</td>
                <td>{sale.category}</td>
                <td>${sale.price}</td>
                <td>{sale.quantity}</td>
                <td>{new Date(sale.sale_date).toLocaleDateString()}</td>
                <td>{sale.seller}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(sale)}>
                      <MdEdit />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(sale.id)}>
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingSale ? "Edit Sale" : "Add New Sale"}</h2>
            <form onSubmit={handleSubmit}>
              {["product", "category", "price", "quantity", "seller"].map((field) => (
                <div className="form-group" key={field}>
                  <input
                    type={field === "price" || field === "quantity" ? "number" : "text"}
                    id={field}
                    name={field}
                    value={newSale[field]}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="form-group">
                <input
                  type="date"
                  id="sale_date"
                  name="sale_date"
                  value={newSale.sale_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  {editingSale ? "Update Sale" : "Add Sale"}
                </button>
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
