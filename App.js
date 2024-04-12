import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AboutUs from "./components/pages/AboutUs";
import Chatbox from "./components/pages/Chat/Chatbox"; // Import Chatbox component
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import Account from "./components/pages/Account";
import Products from "./components/pages/Products";
import ProductDisplay from "./components/pages/ProductDisplay";
import ProductInfo from "./components/pages/ProductInfo";
import CreateDonation from "./components/pages/CreateDonation";
import UpdateDonation from "./components/pages/UpdateDonation";
import useUser from "./hooks/useUser";
import DeleteDonation from "./components/pages/DeleteDonation";
import ManageUsers from "./components/pages/ManageUsers";
import ResetPassword from "./components/pages/ResetPassword";
import HowItWorks from "./components/pages/HowItWorks";
import FAQs from "./components/pages/FAQs";
import Testimonials from "./components/pages/Testimonials";
import TermsOfService from "./components/pages/TermsOfService";

function App() {
  const ADMIN_USER = ["Admin", "admin"];
  const userData = useUser();
  const userType = userData ? userData.userType : null;

  return (
    <>
      <Router>
        <Navbar userType={userType} />
        <Route>
          <Route path="/" exact component={Home} />
          <Route path="/aboutus" exact component={AboutUs} />
          <Route path="/how-it-works" exact component={HowItWorks} />
          <Route path="/faqs" exact component={FAQs} />
          <Route path="/testimonials" exact component={Testimonials} />
          <Route path="/terms-of-service" exact component={TermsOfService} />
          <Route path="/manage-users" exact component={ManageUsers} />
          <Route path="/chatbox" render={(props) => <Chatbox userData={userData} {...props} />} />
          {/* <Route path="/chatbox" exact component={Chatbox} /> */}
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/login" exact component={Login} />
          <Route path="/reset-password" exact component={ResetPassword} />
          <Route path="/account" exact component={Account} />
          <Route path="/productdisplay" exact component={ProductDisplay} />
          <Route
            path="/products"
            render={(props) =>
              ADMIN_USER.includes(userType) ? (
                <Products {...props} />
              ) : (
                <Products {...props} />
              )
            }
          />
          <Route path="/productinfo/:id" component={ProductInfo} />
          <Route path="/create" exact component={CreateDonation} />
          <Route path="/update/:id" exact component={UpdateDonation} />
          <Route path="/delete/:id" exact component={DeleteDonation} />
        </Route>
        <Footer />
      </Router>
    </>
  );
}

export default App;
