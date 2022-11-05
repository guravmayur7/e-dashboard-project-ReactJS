import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        <li>Sr.No</li>
        <li>Name</li>
        <li>Category</li>
        <li>Company</li>
        <li>Price</li>
        <li>Action</li>
      </ul>
      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>$ {item.price}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>|
            <Link to={"edit/" + item._id}>Edit</Link>
          </li>
        </ul>
      ))}
    </div>
  );
};
export default ProductList;
