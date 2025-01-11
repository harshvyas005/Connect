import React, { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import TweetCard from "../HomeSection/TweetCard";
import { Divider, Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findTweetsById } from "../../Store/Twit/Action";


const TweetDetails = () => {
  const param=useParams();
  const dispatch=useDispatch();
  const {twit}=useSelector(store=>store)
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  useEffect(()=>{
    dispatch(findTweetsById(param.id))
},[param.id])

  return (
    <div>
      {/* Header Section */}
      <section
        className={
          "bg-white z-50 flex items-center sticky top-0 bg-opacity-95 px-5 py-3 border-b"
        }
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
          sx={{ fontSize: "1.5rem"}}
        />
        <h1 className="py-2 text-xl font-bold opacity-90 ml-5" >{"Twit"}</h1>
      </section>

      {/* Tweet Details Section */}
      <Container maxWidth="sm" sx={{ marginTop: "1rem" }}>
        <Box>
          {twit.twit && <TweetCard twit={twit.twit}/>}
          <Divider sx={{ margin: "1.5rem 0rem" }} />
        </Box>

        {/* Replies Section */}
        {/* <Box>
          {[1, 1, 1, 1].map((_, index) => (
            <Box key={index} sx={{ marginBottom: "1rem" }}>
              <TweetCard  />
            </Box>
          ))}
        </Box> */}
          <Box>
          {twit.twit?.replyTwits.slice().reverse().map((item) => (
            <Box sx={{ marginBottom: "1rem" }}>
              <TweetCard twit={item} />
            </Box>
          ))}
        </Box>
          {/* <div>
        {twit.twit?.replyTwits.slice().reverse().map((item)=><TweetCard twit={item}/>)}
       </div> */}
      </Container>
      </div>
  );
};

export default TweetDetails;
