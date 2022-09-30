import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const navigate = useNavigate();
  const collectData = () => {
    console.log(name, email, pwd);
    fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, pwd }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => {
      const result = response.json();
      if (result) {
        navigate("/");
      }
    });
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
