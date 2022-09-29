import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const collectData = () => {
    console.log(name, email, password);
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
        value={password}
      />
      <button className="submitButton" onClick={collectData}>
        Signup
      </button>
    </div>
  );
};
export default Signup;
