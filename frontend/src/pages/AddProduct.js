import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// "name": "iPhone12",
// "price": 50000,
// "userId": "633839edfa6e3d6133aa1d44",
// "company": "Apple",
// "category": "Mobile"
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const collectData = async () => {
    if (!name || !category || !price || !company) {
      setError(true);
      return false;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        price: price,
        company: company,
        category: category,
        userId: JSON.parse(auth)._id,
      }),
    };
    let result = await fetch(
      "http://localhost:5000/add-product",
      requestOptions
    );
    result = await result.json();
    navigate("/");
  };

  return (
    <div className="product">
      <input
        className="inputBlock"
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {error && !name && <span className="error">Enter Valid Name</span>}
      <input
        className="inputBlock"
        type="text"
        placeholder="Enter Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      {error && !price && <span className="error">Enter Valid Price</span>}
      <input
        className="inputBlock"
        type="text"
        placeholder="Enter Company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      {error && !company && <span className="error">Enter Valid Company</span>}
      <input
        className="inputBlock"
        type="text"
        placeholder="Enter Category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      />
      {error && !category && (
        <span className="error">Enter Valid Category</span>
      )}
      <button className="submitButton" onClick={collectData}>
        Add Product
      </button>
    </div>
  );
};
export default AddProduct;
