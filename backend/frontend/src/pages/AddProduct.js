import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      headers: { 
        "Content-Type": "application/json",
          authorization : "bareer "+JSON.parse(localStorage.getItem('token'))
      },
      body: JSON.stringify({
        name: name,
        price: price,
        company: company,
        category: category,
        userId: JSON.parse(auth)._id,
      }),
    };
    await fetch(
      "http://localhost:5000/add-product",
      requestOptions
    );
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
