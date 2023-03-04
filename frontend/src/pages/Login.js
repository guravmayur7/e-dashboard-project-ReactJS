import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const handleLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, pwd: pwd }),
    };
    let result = await fetch("http://localhost:5000/login", requestOptions);
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("No data found");
    }
    console.log(result);
    //localStorage.setItem("user", JSON.stringify(result));
    //navigate("/");
  };
  //   const collectData = async () => {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name: name, email: email, pwd: pwd }),
  //     };
  //     let result = await fetch("http://localhost:5000/register", requestOptions);
  //     result = await result.json();
  //     localStorage.setItem("user", JSON.stringify(result));
  //     navigate("/");
  //   };
  return (
    <div className="login">
      <input
        className="inputBlock"
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="inputBlock"
        type="password"
        placeholder="password"
        onChange={(e) => setPwd(e.target.value)}
        value={pwd}
      />
      <button className="submitButton" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
