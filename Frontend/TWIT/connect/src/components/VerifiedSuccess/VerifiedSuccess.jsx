import { Alert, Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifiedAccountAction } from "../../Store/Payment/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 3,
  outline: "none",
  overflow: "scroll-y",
};

const VerifiedSuccess = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const orderId = urlParams.get("orderId");
    console.log("Order ID from URL:", orderId);
    if (orderId) {
      dispatch(verifiedAccountAction(orderId));
    } else {
      console.error("Order ID is missing in URL");
      navigate("/");
    }
  }, [dispatch, urlParams, navigate]);

  return (
    <div className="px-36 flex flex-col h-screen justify-center items-center">
      <Box sx={style}>
        <div className=" space-y-10 p-10">
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-16 h-16"
              src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
              alt=""
            />
            <Alert className="my-5 font-bold text-3xl" severity="success">
              Congratulations! Your Account Is Verified
            </Alert>
          </div>
          <div>
            <Button
              className="rounded-full my-5"
              sx={{ width: "100%", borderRadius: "25px", padding: "12px 0px" }}
              onClick={() => navigate(`/profile/${auth.user.id}`)}
              variant="contained"
            >
              Go To Profile
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default VerifiedSuccess;
