import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faTag,
  faDollarSign,
  faHashtag,
  faCalendar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import './SalesForm.css';
import { addSale } from '../../data/dataService';

const SalesForm = () => {
  const [formData, setFormData] = useState({
    product: '',
    category: '',
    price: '',
    quantity: '',
    sale_date: '',
    seller: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.product) tempErrors.product = "Product is required";
    if (!formData.category) tempErrors.category = "Category is required";
    if (!formData.price) tempErrors.price = "Price is required";
    else if (isNaN(formData.price)) tempErrors.price = "Price must be a number";
    if (!formData.quantity) tempErrors.quantity = "Quantity is required";
    else if (isNaN(formData.quantity)) tempErrors.quantity = "Quantity must be a number";
    if (!formData.sale_date) tempErrors.sale_date = "Date is required";
    if (!formData.seller) tempErrors.seller = "Seller is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await addSale({
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
        });
        setFormData({
          product: '',
          category: '',
          price: '',
          quantity: '',
          sale_date: '',
          seller: ''
        });
        alert('Sale added successfully!');
      } catch (error) {
        alert('Error adding sale. Please try again.');
      }
    }
  };

  return (
    <div className="sales-form-container">
      <h2>Add New Sale</h2>
      <form onSubmit={handleSubmit} className="sales-form">
        <div className="form-group">
          <label htmlFor="product">
            <FontAwesomeIcon icon={faBox} /> Product
          </label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className={errors.product ? 'error' : ''}
          />
          {errors.product && <span className="error-message">{errors.product}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">
            <FontAwesomeIcon icon={faTag} /> Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
          />
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">
            <FontAwesomeIcon icon={faDollarSign} /> Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={errors.price ? 'error' : ''}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">
            <FontAwesomeIcon icon={faHashtag} /> Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={errors.quantity ? 'error' : ''}
          />
          {errors.quantity && <span className="error-message">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="sale_date">
            <FontAwesomeIcon icon={faCalendar} /> Date
          </label>
          <input
            type="datetime-local"
            id="sale_date"
            name="sale_date"
            value={formData.sale_date}
            onChange={handleChange}
            className={errors.sale_date ? 'error' : ''}
          />
          {errors.sale_date && <span className="error-message">{errors.sale_date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="seller">
            <FontAwesomeIcon icon={faUser} /> Seller
          </label>
          <input
            type="text"
            id="seller"
            name="seller"
            value={formData.seller}
            onChange={handleChange}
            className={errors.seller ? 'error' : ''}
          />
          {errors.seller && <span className="error-message">{errors.seller}</span>}
        </div>

        <button type="submit" className="submit-button">Add Sale</button>
      </form>
    </div>
  );
};

export default SalesForm;

