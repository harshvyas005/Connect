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
// import { formatDistanceToNow } from "date-fns";

const TweetCard = ({ twit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const [isLiked, setIsLiked] = useState(twit.liked);
  const [likes, setLikes] = useState(twit.totalLikes);
  const [isRetwit, setIsRetwit] = useState(
    twit.retwitUsersId.includes(auth.user.id)
  );
  const [retwit, setRetwit] = useState(twit.totalRetweets || 0);
  const [reply, setReplies] = useState(twit.totalReplies || 0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openReplyModal, setOpenReplyModal] = useState(false);

  // const timeAgo = formatDistanceToNow(new Date("2024-12-27T12:00:00Z"), {
  //   addSuffix: true,
  // });
  // console.log("CreatedAt:", twit.createdAt);

  // const {
  //   liked = false,
  //   totalLikes = 0,
  //   totalRetweets = 0,
  //   retwitUsersId = [],
  //   user = {},
  //   content = "",
  //   image = null,
  //   createdAt = null,
  //   totalReplies = 0,
  // } = twit || {};

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

  // useEffect(() => {
  //   setRetwit(twit.totalRetweets || 0);
  //   setReplies(twit.totalReplies || 0);
  // }, [twit.totalRetweets, twit.totalReplies]);
  // console.log("(count of retwit and replies)Tweet data:", twit);

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
    dispatch(createReTweet(twit.id));
    setRetwit(isRetwit ? retwit - 1 : retwit + 1);
    setIsRetwit(!isRetwit);
  };

  const handleReplyModalOpen = () => setOpenReplyModal(true);
  const handleReplyModalClose = () => {
    // setReplies(reply + 1); // Update reply count after submitting a reply
    setOpenReplyModal(false);
  };
  return (
    <div className="p-4 border-b border-gray-200">
      {/* Retweet Notice */}
      {auth.user?.id !== twit.user.id && (
        <div className="flex items-center font-semibold text-gray-700 py-2">
          <RepeatIcon />
          <p className="ml-3">You Retweeted</p>
        </div>
      )}

      <div className="flex space-x-3">
        {/* Avatar */}
        <Avatar
          onClick={() => navigate(`/profile`)}
          src={twit.user.image}
          className="cursor-pointer"
          alt={twit.user.fullName}
        />

        <div className="w-full">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate(`/profile`)}
            >
              <span className="font-semibold">{twit.user.fullName}</span>
              <span className="text-gray-600">
                @{twit.user.fullName.toLowerCase().split(" ").join("_")}
              </span>
              <span className="text-gray-600">·2m</span>
              {twit.user.verified && (
                <img
                  src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
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
            {/* {item.video && (
              <div className="flex flex-col items-center border rounded-md">
                <video controls src={item.video} className="max-h-[40rem]"></video>
              </div>
            )} */}
          </div>

          {/* Actions */}
          <div className="py-4 flex justify-between items-center text-gray-600">
            {/* Reply */}
            <div className="flex items-center space-x-2">
              <ChatBubbleOutlineIcon onClick={handleReplyModalOpen} />
              {reply > 0 && <p>{reply}</p>}
            </div>

            {/* Retweet */}
            <div
              className={`flex items-center space-x-2 ${
                isRetwit ? "text-pink-600" : "text-gray-600"
              }`}
            >
              <RepeatIcon onClick={handleCreateRetweet} />
              {retwit > 0 && <p>{retwit}</p>}
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
              {likes > 0 && <p>{likes}</p>}
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
      />
    </div>
  );
};

export default TweetCard;
