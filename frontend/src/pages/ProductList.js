import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/get-product");
    result = await result.json();
    setProducts(result);
  };
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        <li>Sr.No</li>
        <li>Name</li>
        <li>Category</li>
        <li>Brand</li>
        <li>Price</li>
      </ul>
      {products.map((item, index) => {
        <ul>
          <li>{index}</li>
          <li>{item.name}</li>
          <li>{item.category}</li>
          <li>{item.brand}</li>
          <li>$ {item.price}</li>
        </ul>;
      })}
    </div>
  );
};
export default ProductList;
