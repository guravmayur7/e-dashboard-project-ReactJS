import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  useEffect(() => {
    getProductDetails();
  });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const auth = localStorage.getItem("user");
  const params = useParams();
  const navigate = useNavigate();
  const collectData = async () => {
    if (!name || !category || !price || !company) {
      setError(true);
      return false;
    }
    const requestOptions = {
      method: "PUT",
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
    let result = await fetch(
      `http://localhost:5000/update-product/${params.id}`,
      requestOptions
    );
    result = await result.json();
    if (result) {
      navigate("/");
    } else {
      alert("product not updated");
    }
  };
  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/edit-product/${params.id}`,{
      headers: { 
        "Content-Type": "application/json", 
        authorization : "bareer "+JSON.parse(localStorage.getItem('token')) 
      },
    });
    result = await result.json();
    if (result) {
      setName(result.name);
      setPrice(result.price);
      setCompany(result.company);
      setCategory(result.category);
    } else {
      alert("no result found");
    }
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
        Update Product
      </button>
    </div>
  );
};
export default EditProduct;
