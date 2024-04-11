import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import axios from "axios";
import "../../App.css";
import "./Account.css";
import UpdateListing from "./UpdateListing";
import ProfilePicture from "./ProfilePicture";

const Account = () => {
  const userData = useUser();
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [listingsFetched, setListingsFetched] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showUpdateOptions, setShowUpdateOptions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userData) {
      setFname(userData.fname || "");
      setLname(userData.lname || "");
      setEmail(userData.email || "");
    }
  }, [userData]);

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        if (userData && !listingsFetched && userData.userType !== "admin") {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5321/api/mylistings/${userData.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserListings(response.data);
          setListingsFetched(true);
        }
      } catch (err) {
        setError("Failed to fetch user listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (!listingsFetched && userData && userData.userType !== "admin") {
      fetchUserListings();
    } else {
      setLoading(false);
    }
  }, [userData, listingsFetched]);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };

  const handleUpdateClick = (listing) => {
    setSelectedListing(listing);
    setShowUpdateOptions(true);
  };

  const handleUpdateSuccess = () => {
    setSelectedListing(null);
    setListingsFetched(false);
    setShowUpdateOptions(false);
  };

  const handleMarkAsDonated = async (listingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5321/api/markAsDonated/${listingId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserListings(
        userListings.map((listing) =>
          listing._id === listingId ? { ...listing, isDonated: true } : listing
        )
      );
    } catch (err) {
      setError("Failed to mark as donated. Please try again later. " + err);
    }
  };

  const handleUnmarkAsDonated = async (listingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5321/api/unmarkAsDonated/${listingId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserListings(
        userListings.map((listing) =>
          listing._id === listingId ? { ...listing, isDonated: false } : listing
        )
      );
    } catch (err) {
      setError("Failed to unmark as donated. Please try again later. " + err);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5321/api/products/${listingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserListings(
        userListings.filter((listing) => listing._id !== listingId)
      );
    } catch (err) {
      setError("Failed to delete listing. Please try again later. " + err);
    }
  };

  const isAdmin = userData && userData.userType === "admin";

  const handleNameChange = (e) => {
    setFname(e.target.value);
  };

  const handleLnameChange = (e) => {
    setLname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5321/api/users/${userData._id}`,
        { fname, lname, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditing(false);
      setFname(response.data.fname);
      setLname(response.data.lname);
      setEmail(response.data.email);
    } catch (err) {
      console.error("Failed to update user information:", err);
      setError("Failed to update user information. Please try again later.");
    }
  };

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    <div className="container-account">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {userData ? (
        <>
          <div className="header">
            <div className="text">WELCOME</div>
            <div className="underline"></div>
          </div>
          <div className="contentContainer">
            <div className="user-info">
              <ProfilePicture userData={userData} />
              <div className="user-details">
                {editing ? (
                  <>
                    <div className="account-text">
                      First Name:
                      <input
                        type="text"
                        value={fname}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="account-text">
                      Last Name:
                      <input
                        type="text"
                        value={lname}
                        onChange={handleLnameChange}
                      />
                    </div>
                    <div className="account-text">
                      Email:
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="account-text">
                      Name: {fname} {lname}
                    </div>
                    <div className="account-text">Email: {email}</div>
                  </>
                )}
                <div className="account-text">
                  User Type:{" "}
                  {userData.userType.charAt(0).toUpperCase() +
                    userData.userType.slice(1)}
                </div>
                <div className="button-group">
                  {editing ? (
                    <button onClick={handleSave} className="editbutton">
                      Save
                    </button>
                  ) : (
                    <button onClick={handleEdit} className="editbutton">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="logout-button-container">
            <button onClick={logOut} className="button">
              Log Out
            </button>
          </div>
          {!isAdmin && (
            <>
              <div className="header">
                <div className="text">My Listings</div>
                <div className="underline"></div>
              </div>
              <div className="product-grid">
                {userListings.map((listing, index) => (
                  <div
                    key={index}
                    className={`product-card ${
                      selectedListing && selectedListing._id === listing._id
                        ? "selected"
                        : ""
                    } ${listing.isDonated ? "donated" : ""}`}
                  >
                    <div className="product-image">
                      {listing.imageUrls &&
                        listing.imageUrls.map((imageUrl, index) => (
                          <img
                            key={index}
                            src={`http://localhost:3000/${imageUrl}`}
                            alt={listing.product}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        ))}
                    </div>
                    {listing.isDonated && (
                      <div className="blur-cover">
                        <span>Donated</span>
                      </div>
                    )}
                    <div className="product-details">
                      <h3>{listing.product}</h3>
                      <p>{truncateDescription(listing.description, 50)}</p>
                      <p>{listing.category}</p>
                      <div className="button-group">
                        {showUpdateOptions &&
                        selectedListing &&
                        selectedListing._id === listing._id ? (
                          <UpdateListing
                            listing={selectedListing}
                            onUpdateSuccess={handleUpdateSuccess}
                          />
                        ) : (
                          <>
                            <div className="button-row">
                              <button
                                onClick={() => handleUpdateClick(listing)}
                                className="button update-button"
                                disabled={
                                  showUpdateOptions || listing.isDonated
                                }
                              >
                                <i className="fa-regular fa-pen-to-square"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteListing(listing._id)}
                                className="button delete-button"
                                disabled={listing.isDonated}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                            <button
                              onClick={() => handleMarkAsDonated(listing._id)}
                              className="button mark-donated-button"
                              disabled={listing.isDonated}
                            >
                              Mark as Donated
                            </button>
                            <button
                              onClick={() => handleUnmarkAsDonated(listing._id)}
                              className="button unmark-donated-button"
                              disabled={!listing.isDonated}
                            >
                              Unmark as Donated
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div>
            <p>
              You are not logged in. Please log in <Link to="/login">here</Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
