import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Avatar, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../Store/Theme/Action";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { searchUser } from "../../Store/Auth/Action";
import '../../App.css';  

const RightPart = () => {
  const [openSubscriptionModal, setOpenSubscriptionModal] =
    React.useState(false);
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);
  const { theme, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const param = useParams();
  const navigate = useNavigate();

  const handleSearchUser = (event) => {
    setSearch(event.target.value);
    const userId = auth.user?.id;
    dispatch(searchUser(event.target.value,userId));
  };
  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
    setSearch("");
  };

  const handleChangeTheme = () => {
    dispatch(changeTheme(theme.currentTheme === "dark" ? "light" : "dark"));
    console.log("handle change theme");
  };
  return (
    <div className="py-5 sticky top">
      <div className="relative flex items-center">
        <input
          value={search}
          onChange={handleSearchUser}
          type="text"
          className={`py-3 rounded-full text-gray-500 w-full pl-12 ${
            theme.currentTheme === "light" ? "bg-slate-300" : "bg-[#151515]"
          }`}
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </div>
        {search && (
          <div
            className={` overflow-y-scroll hideScrollbar absolute z-50 top-14  border-gray-700 h-[40vh] w-full rounded-md ${
              theme.currentTheme === "light"
                ? "bg-white"
                : "bg-[#151515] border"
            }`}
          >
            {auth.searchResult.map((item) => (
              <div
                onClick={() => navigateToProfile(item.id)}
                className="flex items-center hover:bg-slate-800 p-3 cursor-pointer"
              >
                <Avatar alt={item.fullName} src={item.image} />
                <div className="ml-2">
                  <p>{item.fullName}</p>
                  <p className="text-sm text-gray-400">
                    @{item.fullName.split(" ").join("_").toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Brightness4Icon
          className="ml-3 cursor-pointer"
          onClick={handleChangeTheme}
        />
      </div>
      <section
        className={`my-5${
          theme.currentTheme === "dark" ? " bg-[#151515] p-5 rounded-md" : ""
        }`}
      >
        <h1 className="text-xl font-bold">Get Verified</h1>
        <h1 className="font-bold my-2">Subscribe to unlock new features</h1>
        <Button
          variant="contained"
          sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px" }}
          onClick={handleOpenSubscriptionModal}
        >
          Get Verified
        </Button>
      </section>
      <section
        className={`mt-7 spac-y-5 ${
          theme.currentTheme === "dark" ? " bg-[#151515] p-5 rounded-md" : ""
        }`}
      >
        <h1 className="font-bold text-xl py-1">What's Happening</h1>
        <div className="mb-4">
          <p className="text-sm">Sports · Trending</p>
          <p className="font-bold">· Siraj</p>
        </div>
        {[1].map((item) => (
          <div className="flex justify-between w-full">
            <div className="mb-4">
              <p>Sports · Trending</p>
              <p className="font-bold">· Mumbai Indians</p>
              <p>34.3k Tweets</p>
            </div>
            <MoreHorizIcon />
          </div>
        ))}
         {[1].map((item) => (
          <div className="flex justify-between w-full">
            <div className="mb-4">
              <p>Sports · Trending</p>
              <p className="font-bold">· Yuzi Chahal</p>
              <p>34.3k Tweets</p>
            </div>
            <MoreHorizIcon />
          </div>
        ))}
      </section>
      <section>
        <SubscriptionModal
          open={openSubscriptionModal}
          handleClose={handleCloseSubscriptionModal}
        />
      </section>
    </div>
  );
};

export default RightPart;
