import React from "react";
import Grid from "@mui/material/Grid";
import UserDetail from "./UserDetail";
import UserProfile from "./UserProfile";
import Navbar from "../../Components/NavigationBar/Navbar";
import Footer from "../../Components/Footer/Footer";

const UserView = () => {
  return (
    <>
      <Navbar />
      <Grid container spacing={9}>
        <Grid item xs={3} pl={3} >
          <UserProfile />
        </Grid>
        <Grid item xs={9} mt={6}>
          <UserDetail />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default UserView;
