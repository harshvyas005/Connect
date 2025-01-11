import React, { useEffect, useState } from "react";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReTweet, deleteTweet, likeTweet } from "../../Store/Twit/Action";
import ReplyModal from "./ReplyModal";
import "../../App.css";

const TweetCard = ({ twit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, theme } = useSelector((store) => store);

  const [isLiked, setIsLiked] = useState(twit.liked);
  const [likes, setLikes] = useState(twit.totalLikes);
  const [isRetwit, setIsRetwit] = useState(
    twit.retwitUsersId.includes(auth.user.id)
  );
  const [retwit, setRetwit] = useState(twit.totalRetwits || 0);
  const [replyCount, setReplyCount] = useState(twit.totalReplies || 0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openReplyModal, setOpenReplyModal] = useState(false);

  const updateReplyCount = (newCount) => {
    setReplyCount(newCount);
  };
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTweet = () => {
    dispatch(deleteTweet(twit.id));
    console.log("Delete tweet");
    handleMenuClose();
  };
  const handleLikeTweet = async (num) => {
    try {
      dispatch(likeTweet(twit.id));
      setIsLiked(!isLiked);
      setLikes(likes + num);
    } catch (error) {
      console.error("Failed to like the tweet:", error);
    }
  };

  const handleCreateRetweet = () => {
    if (isRetwit) {
      setRetwit(retwit - 1);
    } else {
      setRetwit(retwit + 1);
    }
    dispatch(createReTweet(twit.id));
    setIsRetwit(!isRetwit);
  };

  const handleReplyModalOpen = () => setOpenReplyModal(true);
  const handleReplyModalClose = () => {
    setOpenReplyModal(false);
  };
  return (
    <div className="p-4 border-b border-gray-200">
      {/* Retweet Notice */}

      <div className="flex space-x-3">
        {/* Avatar */}
        <Avatar
          onClick={() => navigate(`/profile/${twit.user.id}`)}
          src={twit.user.image}
          className="cursor-pointer"
          alt={twit.user.fullName}
        />

        <div className="w-full">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate(`/profile/${twit.user.id}`)}
            >
              <span className="font-semibold">{twit.user.fullName}</span>
              <span className="text-gray-600">
                @{twit.user.fullName.toLowerCase().split(" ").join("_")}
              </span>
              <span className="text-gray-600">·2m</span>
              {twit.user.verified && (
                <img
                  src="https://static.vecteezy.com/system/resources/previews/015/304/837/original/blue-verified-tick-valid-seal-icon-in-flat-style-design-isolated-on-white-background-validation-concept-vector.jpg"
                  alt="Verified"
                  className="ml-2 w-5 h-5"
                />
              )}
            </div>

            {/* Options Menu */}
            <Button onClick={handleMenuClick}>
              <MoreHorizIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {auth.user.id === twit.user.id && (
                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
              )}
              <MenuItem onClick={() => navigate(`/twit/${twit.id}`)}>
                Details
              </MenuItem>
            </Menu>
          </div>

          {/* Content */}
          <div
            className="mt-2 cursor-pointer"
            onClick={() => navigate(`/twit/${twit.id}`)}
          >
            <p className="mb-2">{twit.content}</p>
            {twit.image && (
              <img
                src={twit.image}
                alt=""
                className="w-[28rem] border rounded-md"
              />
            )}
          </div>

          {/* Actions */}
          <div className="py-4 flex justify-between items-center text-gray-600">
            {/* Reply */}
            <div className="flex items-center space-x-2">
              <ChatBubbleOutlineIcon onClick={handleReplyModalOpen} />
              {<p>{replyCount}</p>}
            </div>

            {/* Retweet */}
            <div
              className={`flex items-center space-x-2 ${
                isRetwit ? "text-pink-600" : "text-gray-600"
              }`}
            >
              <RepeatIcon onClick={handleCreateRetweet} />
              {<p>{retwit}</p>}
            </div>

            {/* Like */}
            <div
              className={`flex items-center space-x-2 ${
                isLiked ? "text-pink-600" : "text-gray-600"
              }`}
            >
              {isLiked ? (
                <FavoriteIcon onClick={() => handleLikeTweet(-1)} />
              ) : (
                <FavoriteBorderIcon onClick={() => handleLikeTweet(1)} />
              )}
              {<p>{likes}</p>}
            </div>

            {/* Analytics */}
            <div className="flex items-center space-x-2">
              <BarChartIcon />
              <p>430</p>
            </div>

            {/* Share */}
            <div className="flex items-center space-x-2">
              <FileUploadIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      <ReplyModal
        twitdata={twit}
        open={openReplyModal}
        handleClose={handleReplyModalClose}
        updateReplyCount={updateReplyCount}
      />
    </div>
  );
};

export default TweetCard;
