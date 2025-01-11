import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Box, Tab, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector, useDispatch } from "react-redux";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TweetCard from "../HomeSection/TweetCard";

import {
  findUserbyId,
  followUserAction,
  getUserProfile,
} from "../../Store/Auth/Action";
import ProfileModal from "./ProfileModal";
import {
  getUsersTweets,
  findTwitsByLikesContainUser,
} from "../../Store/Twit/Action";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth, twit } = useSelector((store) => store);
  const user = useSelector((state) => state.auth.findUser);

  const [tabValue, setTabValue] = useState("1");
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const param = useParams();

  const handleBack = () => navigate(-1);

  const handleOpenProfileModel = () => setOpenProfileModal(true);
  const handleCloseProfileModel = () => setOpenProfileModal(false);
  const userProfile = auth.findUser || {};
  // console.log("param id:",param.id);
  // console.log("auth.finduser:",userProfile)
  // const profileImage =
  //   auth.findUser?.image ||
  //   "https://via.placeholder.com/150?text=Profile+Image";
  // const backgroundImage =
  //   auth.findUser?.backgroundImage ||
  //   "https://via.placeholder.com/1500x500?text=Background+Image";
  // const location = auth.findUser?.location;

  // const follower = auth.findUser?.followers.length;

  // const following = auth.findUser?.followings.length;
  // const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 4) {
      console.log("Fetching liked tweets for user ID:", param.id);
      dispatch(findTwitsByLikesContainUser(param.id));
      // console.log("Fetching tweets for user ID:", param.id);
    } else if (newValue === 1) {
      dispatch(getUsersTweets(param.id));
      console.log("param id:", param.id);
    }
  };
  const handleFollowUser = () => {
    dispatch(followUserAction(param.id));
  };

  useEffect(() => {
    // dispatch(getUsersTweets(param.id));
    // dispatch(findTweetsByLikesContainsUser(param.id));
    console.log("Current Profile ID: ", param.id);
    dispatch(findUserbyId(param.id));
  }, [param.id]);

  if (!user) {
    return <Typography>No user data available</Typography>;
  }

  const {
    fullName = "Unknown User",
    image = "",
    bio = "This user has no bio.",
    backgroundImage = "",
    location = "",
    followers = [],
    followings = [],
    req_user = false,
    verified = false,
    mobile = "",
  } = user;

  return (
    <div>
      <section className="bg-white z-50 flex items-center sticky top-0 bg-opacity-95">
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {" "}
          {auth.findUser?.fullName}
        </h1>
      </section>
      <section className="relative w-full h-[20rem] overflow-hidden">
        <img
          className="w-full h-full object-cover cursor-pointer"
          src={
            auth.findUser?.backgroundImage ||
            "https://via.placeholder.com/1500x500?text=Background+Image"
          }
          alt="Background"
          name="backgroundImage"
        />
      </section>
      <section className="pl-6">
        <div className="flex justify-between item-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt={fullName}
            src={image}
            sx={{ width: "8rem", height: "8rem", border: "4px solid white" }}
          />
          {auth.findUser?.req_user ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              disabled={auth.following} // Add a flag in Redux for better UX
            >
              {auth.findUser?.followed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <Typography variant="h4">{fullName}</Typography>
            {auth.findUser?.verified && (
              <img
                className="w-7 h-7"
                src="https://static.vecteezy.com/system/resources/previews/015/304/837/original/blue-verified-tick-valid-seal-icon-in-flat-style-design-isolated-on-white-background-validation-concept-vector.jpg"
                alt="Verified"
              />
            )}
          </div>
          <h1 className="text-gray-500"> @{fullName.toLowerCase()}</h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>{bio}</p>
          <div className="py-2 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">{auth.findUser?.website}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">{auth.findUser?.location}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined June 2022</p>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.following.length}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.followers.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} aria-label="Profile Tabs">
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {twit.twits
                ?.filter((tweet) => tweet.user.id.toString() === param.id) // Ensure param.id matches tweet.user.id
                .map((item) => (
                  <TweetCard key={item.id} twit={item} />
                ))}
            </TabPanel>
            <TabPanel value="2">No replies available</TabPanel>
            <TabPanel value="3">No media available</TabPanel>
            <TabPanel value="4">
              {twit.likedTwits
                ?.filter((tweet) => tweet.user.id.toString() === param.id) // Filter liked tweets by user ID
                .map((item) => (
                  <TweetCard key={item.id} twit={item} /> // Render the filtered liked tweets
                ))}
                
            
                {twit.twits
                ?.filter((tweet) => tweet.liked) // Ensure param.id matches tweet.user.id
                .map((item) => (
                  <TweetCard key={item.id} twit={item} />
                ))}
              {console.log("liked Tweets to display:", twit.likedTwits)}
            </TabPanel> 
             {/* {twit.twits
                ?.filter((tweet)=>{
                  if(tweet.liked)
                    console.log(tweet)
                }) } */}
          </TabContext>
        </Box>
      </section>
      <section>
        <ProfileModal
          handleClose={handleCloseProfileModel}
          open={openProfileModal}
        />
      </section>
    </div>
  );
};

export default Profile;
