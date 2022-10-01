import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import PrivateComponent from "./components/PrivateComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<h1>Home</h1>}></Route>
            <Route path="/add" element={<h1>Add Product</h1>}></Route>
            <Route path="/update" element={<h1>update</h1>}></Route>
            <Route path="/profile" element={<h1>profile</h1>}></Route>
            <Route path="/logout" element={<h1>logout</h1>}></Route>
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
