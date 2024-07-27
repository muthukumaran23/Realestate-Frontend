import { useContext, useState } from "react";
import "../Navbar/Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "../../SearchInput.js";

function Navbar({ children }) {
  const [show, setShow] = useState(true);
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleChage = () => {
    setShow(!show);
    console.log("clicked");
  };

  const logoutFunction = () => {
    localStorage.clear("token");
    navigate("/");
  };

  return (
    <nav>
      <div className="logo">RealEstate.com</div>
      <ul className={show ? "showMenu" : ""}>
        <li>
          <SearchInput />
        </li>
        <li>
          <Link to="/addnew">AddProperty</Link>
        </li>
        <li>
          <Link to="/home">GetAll</Link>
        </li>

        <div className="logout">
          <li>{user}</li>
          <li onClick={logoutFunction}>{token ? "Logout" : "Login"}</li>
        </div>
      </ul>

      <div className="amber" onClick={() => handleChage()}>
        <MenuIcon />
      </div>
    </nav>
  );
}
export default Navbar;
