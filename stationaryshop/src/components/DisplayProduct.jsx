import React, { useState, useEffect } from 'react';
import myImage from '../assets/displayimage.png'; 
import './DisplayProduct.css';

const DisplayProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/getAllShopitem', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products from the shop');
        }
      } catch (error) {
        console.error('Error while fetching products:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Products in Shop</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Remaining Stock</th>
            <th>Price</th>
            <th>Manufacture Date</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={myImage} alt="Product" className="product-image" /></td>
              <td>{product.productname}</td>
              <td>{product.producttype}</td>
              <td>{product.stockitem}</td>
              <td>${product.price}</td>
              <td>{product.mfdate}</td>
              <td>{product.companyname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayProduct;
