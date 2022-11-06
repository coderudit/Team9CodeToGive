// Author: Anuj Dev (B00900887)

import React, { useContext, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

//! User Files

import * as ActionTypes from "../common/actionTypes";
import jwtDecode from "jwt-decode";
import Error from "../common/error";
import { AppContext } from "../context/userContext";
import { ROUTES, TOKEN } from "../common/constants";
import Login from "../pages/UserManagement/Login/Login";
import Signup from "../pages/UserManagement/Signup/Signup";
import HomePage from "../Components/Homepage";
import Logout from "../Components/Logout";
import List from "../pages/Professionals/List";
import SlotBooking from "../pages/Professionals/Slotbooking";
import Feed from "../Components/Feed";
import Payments from "../pages/Payments/Payments";
import PaymentInfoForm from "../pages/Payment/PaymentInfoForm";
import OrderPlaced from "../pages/OrderPlaced/OrderPlaced";
import UserView from "../pages/UserProfile/UserView";

function Routing() {
  const { initializeAuth, dispatch } = useContext(AppContext);
  const location = useLocation();
  const openPages = [
    {
      pageLink: ROUTES.HOMEPAGE,
      view: HomePage,
    },
    {
      pageLink: ROUTES.LOGIN,
      view: Login,
    },
    {
      pageLink: ROUTES.SIGNUP,
      view: Signup,
    },
    {
      pageLink: ROUTES.LOGOUT,
      view: Logout,
    },
    {
      pageLink: ROUTES.ERROR,
      view: Error,
    },
    {
      pageLink: ROUTES.LIST,
      view: List,
    },
    {
      pageLink: ROUTES.FEED,
      view: Feed,
    },
    {
      pageLink: ROUTES.SLOTBOOKING,
      view: SlotBooking,
    },
    {
      pageLink: ROUTES.PAYMENTS,
      view: Payments,
    },
    {
      pageLink: ROUTES.PAYMENTINFOFORM,
      view: PaymentInfoForm,
    },
    {
      pageLink: ROUTES.ORDERPLACED,
      view: OrderPlaced,
    },

    {  pageLink: ROUTES.PROFIE,
      view: UserView,
    },
  ];

  useEffect(() => {
    initializeAuth();
    if (localStorage.getItem(TOKEN)) {
      const token = localStorage.getItem(TOKEN);
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp;
      const currentTime = Date.now();

      if (expiresAt < currentTime / 1000) {
        dispatch({ type: ActionTypes.LOGOUT });
      }
    }
  }, []);

  const routes = (
    <Routes location={location}>
      {openPages.map((page, index) => {
        return (
          <Route
            exact
            path={page.pageLink}
            element={<page.view />}
            key={index}
          />
        );
      })}
      {/* <Route exact path={ROUTES.HOMEPAGE} element={<PrivateRoute />}>
        <Route exact path={ROUTES.MAIN} element={<App />} />
      </Route> */}
      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.ERROR} />} />
    </Routes>
  );

  return <div className="container">{routes}</div>;
}

export default Routing;
