import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
  const initialFormData = {
    productname: '',
    producttype: '',
    stockitem: '',
    price: '',
    mfdate: '',
    companyname: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.productname) {
      errors.productname = 'Product Name is required';
      isValid = false;
    }

    if (!formData.producttype) {
      errors.producttype = 'Product Type is required';
      isValid = false;
    }

    if (!formData.stockitem) {
      errors.stockitem = 'Stock Item is required';
      isValid = false;
    }

    if (!formData.price) {
      errors.price = 'Price is required';
      isValid = false;
    }

    if (!formData.mfdate) {
      errors.mfdate = 'Manufacture Date is required';
      isValid = false;
    }

    if (!formData.companyname) {
      errors.companyname = 'Company Name is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        
        const datatoSend = {
          ...formData,
          stockitem: parseInt(formData.stockitem),
          price: parseInt(formData.price)
        }

        const response = await fetch('http://localhost:8080/addShopitem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datatoSend)
        });

        if (response.ok) {
          setIsSuccessModalOpen(true);
          setFormData(initialFormData);
        } else {
          console.error('Failed to add product to the shop');
        }
      } catch (error) {
        console.error('Error while making the POST request:', error);
      }
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="add-product">
      <h2>Add Product to Shop</h2>
      <form onSubmit={handleSubmit} noValidate> 
        <div>
          <label htmlFor="productname">Product Name:</label>
          <input
            type="text"
            id="productname"
            name="productname"
            value={formData.productname}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
          {errors.productname && <div className="error">{errors.productname}</div>}
        </div>
        <div>
          <label htmlFor="producttype">Product Type:</label>
          <select 
            id="producttype"
            name="producttype"
            value={formData.producttype}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          >
            <option value="">Select a product type</option>
            <option value="office">office</option>
            <option value="school">school</option>
            <option value="paper">paper</option>
            <option value="desk">desk</option>
            <option value="regular">regular</option>
            <option value="others">others</option>
          </select>
          {errors.producttype && <div className="error">{errors.producttype}</div>}
        </div>
        <div>
          <label htmlFor="stockitem">Stock Item:</label>
          <input
            type="number"
            id="stockitem"
            name="stockitem"
            value={formData.stockitem}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
          {errors.stockitem && <div className="error">{errors.stockitem}</div>}
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
          {errors.price && <div className="error">{errors.price}</div>}
        </div>
        <div>
          <label htmlFor="mfdate">Manufacture Date:</label>
          <input
            type="date"
            id="mfdate"
            name="mfdate"
            value={formData.mfdate}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
          {errors.mfdate && <div className="error">{errors.mfdate}</div>}
        </div>
        <div>
          <label htmlFor="companyname">Company Name:</label>
          <input
            type="text"
            id="companyname"
            name="companyname"
            value={formData.companyname}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
          />
          {errors.companyname && <div className="error">{errors.companyname}</div>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {isSuccessModalOpen && (
        <div className="success-modal">
          <p>Product added successfully!</p>
          <button onClick={closeSuccessModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
