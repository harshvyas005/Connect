import React from "react";
import { Grid } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import TweetCard from "../HomeSection/TweetCard";
import TweetDetails from "../TweetDetails/TweetDetails";
import Authentication from "../Authentication/Authentication";

const HomePage = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ paddingLeft: "60px", paddingRight: "60px" }}
    >
      {" "}
      {/* Added more space */}
      <Grid
        item
        xs={12}
        lg={2.5}
        className="flex justify-center w-full border-r-2 border-gray-400"
      >
        <Navigation />
      </Grid>
      <Grid
        item
        xs={12}
        lg={5} // Shrunk the middle part width from 6 to 5
        className="flex justify-center w-full border-r-2 border-gray-400"
      >
        <Routes>
          <Route path="/*" element={<Authentication />} />
          <Route path="/home" element={<HomeSection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/twit/:id" element={<TweetDetails />} />
        </Routes>
      </Grid>
      <Grid item xs={12} lg={3} className="flex justify-center w-full">
        <RightPart />
      </Grid>
    </Grid>
  );
};

export default HomePage;
