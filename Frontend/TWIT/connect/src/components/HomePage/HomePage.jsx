import React from "react";
import { Grid, List } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import TweetDetails from "../TweetDetails/TweetDetails";
import Authentication from "../Authentication/Authentication";
import { useSelector } from "react-redux";
import "../../App.css"; // Go up two levels to access the App.css
import Notification from "../Navigation/Notification";
import Explore from "../Navigation/Explore";
import Message from "../Navigation/Message";
import ListsMenu from "../Navigation/ListsMenu";
import Community from "../Navigation/Community";
import Verified from "../Navigation/Verified";
import More from "../Navigation/More";
import VerifiedSuccess from "../VerifiedSuccess/VerifiedSuccess";

const HomePage = () => {
  const { auth, theme } = useSelector((store) => store);

  return (
    <div
      style={{
        minHeight: "100vh", // Full screen height
        backgroundColor: theme.currentTheme === "dark" ? "#121212" : "#ffffff", // Dark or light theme background
        color: theme.currentTheme === "dark" ? "#ffffff" : "#000000", // Adjust text color
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ paddingLeft: "60px", paddingRight: "60px" }}
      >
        {/* Navigation */}
        <Grid
          item
          xs={12}
          lg={2.5}
          className="flex justify-center w-full border-r-2 border-gray-400"
        >
          <Navigation />
        </Grid>

        {/* Main Content */}
        <Grid
          item
          xs={12}
          lg={5}
          className={`flex justify-center w-full border-r-2 ${
            theme.currentTheme === "dark"
              ? "border-gray-800"
              : "border-gray-400"
          }`}
        >
          <Routes>
            <Route path="/*" element={<Authentication />} />
            <Route path="/home" element={<HomeSection />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/twit/:id" element={<TweetDetails />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/lists" element={<ListsMenu />} />
            <Route path="/communities" element={<Community />} />
            <Route path="/verified" element={<Verified />} />
            <Route path="/more" element={<More />} />
            <Route path="/verifiedSuccess" element={<VerifiedSuccess />} />
          </Routes>
        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} lg={3} className="flex justify-center w-full">
          <RightPart />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
