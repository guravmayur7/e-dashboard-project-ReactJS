import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const collectData = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, pwd: pwd }),
    };
    let result = await fetch("http://localhost:5000/register", requestOptions);
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/");
  };

  return (
    <div className="signUp">
      <h1>Sign up</h1>
      <input
        className="inputBlock"
        type="text"
        placeholder="Eter Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        className="inputBlock"
        type="text"
        placeholder="Eter Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBlock"
        type="password"
        placeholder="Eter Password"
        onChange={(e) => setPassword(e.target.value)}
        value={pwd}
      />
      <button className="submitButton" onClick={collectData}>
        Signup
      </button>
    </div>
  );
};
export default Signup;
