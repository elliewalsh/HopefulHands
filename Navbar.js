import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import useUser from "../hooks/useUser";

function Navbar() {
  const [click, setClick] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [button, setButton] = useState(true);
  const userData = useUser();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Hopeful Hands
            <i className="fa-solid fa-hands-holding-child"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/aboutus"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>

            {userData && (userData.userType === "Admin" || userData.userType === "admin") && (
              <>
                <li className="nav-item">
                  <Link
                    to="/products"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/manage-users"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            {!userData || (userData && userData.userType !== "Admin" && userData.userType !== "admin") ? (
              <>
                <li className="nav-item" onMouseEnter={toggleDropdown} onMouseLeave={closeDropdown}>
                  <Link to="/productdisplay" className="nav-links" onClick={closeMobileMenu}>
                    Products
                  </Link>
                  <div className={`dropdown-content ${showDropdown ? "show" : ""}`}>
                    <Link to="/productdisplay?category=Baby Clothing" onClick={closeMobileMenu}>
                      Baby Clothing
                    </Link>
                    <Link to="/productdisplay?category=Feeding and Nursing" onClick={closeMobileMenu}>
                      Feeding and Nursing
                    </Link>
                    <Link to="/productdisplay?category=Nappies and Changing" onClick={closeMobileMenu}>
                      Nappies and Changing
                    </Link>
                    <Link to="/productdisplay?category=Baby Equipment" onClick={closeMobileMenu}>
                      Baby Equipment
                    </Link>
                    <Link to="/productdisplay?category=Nursery Furniture and Decor" onClick={closeMobileMenu}>
                      Nursery Furniture and Decor
                    </Link>
                    <Link to="/productdisplay?category=Health and Safety" onClick={closeMobileMenu}>
                      Health and Safety
                    </Link>
                    <Link to="/productdisplay?category=Toys" onClick={closeMobileMenu}>
                      Toys
                    </Link>
                    <Link to="/productdisplay?category=Bathing and Skincare" onClick={closeMobileMenu}>
                      Bathing and Skincare
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <Link to="/create" className="nav-links" onClick={closeMobileMenu}>
                    Donate
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/chatbox" className="nav-links" onClick={closeMobileMenu}>
                    Message
                  </Link>
                </li>
              </>
            ) : null}

            {!userData ? (
              <>
                <li>
                  <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                    Sign Up
                  </Link>
                </li>
                {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
              </>
            ) : (
              <li className="nav-item">
                <Link to="/account" className="nav-links" onClick={closeMobileMenu}>
                  {userData.fname} {/* Display the user's first name */}
                  <i className="fa-solid fa-user"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;