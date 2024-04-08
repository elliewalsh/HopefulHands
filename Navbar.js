import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

function Navbar() {
  const [click, setClick] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    const handleLoginSuccess = async () => {
      setIsLoggedIn(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5321/api/user", {
          headers: {
            Authorization: token,
          },
        });
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data)); // Store user data in localStorage
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    window.addEventListener("loginSuccess", handleLoginSuccess);

    return () => {
      window.removeEventListener("loginSuccess", handleLoginSuccess);
    };
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData)); // Retrieve user data from localStorage
      }
    }
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

            {isLoggedIn ? (
              <li className="nav-item">
                <Link to="/account" className="nav-links" onClick={closeMobileMenu}>
                  {userData && userData.fname}
                  <i className="fa-solid fa-user"></i>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                    Sign Up
                  </Link>
                </li>
                {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;