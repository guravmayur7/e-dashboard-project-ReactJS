import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img
        className="logo"
        src="https://cdn.dribbble.com/users/283883/screenshots/15483374/media/26dccd29443f3980a33b62587c5b829a.png"
        alt="logo"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/edit">Edit Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              ({JSON.parse(auth).name}) Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;
