import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import AuthModal from "./AuthModal";

const Authentication = () => {
  const [openAuthModal,setOpenAuthModal]=useState(false);
  const handleOpenAuthModal=()=>setOpenAuthModal(true);
  const handleCloseAuthModal=()=>setOpenAuthModal(false);


  return (
    <div className="relative min-h-screen">
      <Grid container className="overflow-hidden">
        {/* Background Image Section */}
        <Grid item lg={7} className="hidden lg:block relative">
          <img
            src="https://cdn.pixabay.com/photo/2020/04/17/10/36/texture-5054172_640.jpg"
            alt="Abstract Background"
            className="w-full h-screen object-cover"
          />

          {/* Centered Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="300"
              height="400"
              fill="currentColor"
            >
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.607 1.794-1.566 2.163-2.709-.951.555-2.005.959-3.127 1.184-.897-.959-2.178-1.559-3.594-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.713-2.165-10.141-5.144-.422.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.829-.413.111-.849.171-1.296.171-.314 0-.624-.03-.927-.086.631 1.953 2.445 3.377 4.6 3.417-1.685 1.319-3.809 2.105-6.102 2.105-.396 0-.786-.023-1.17-.067 2.179 1.397 4.768 2.212 7.548 2.212 9.051 0 13.998-7.496 13.998-13.986 0-.213-.005-.425-.014-.637.961-.695 1.8-1.562 2.462-2.549z" />
            </svg>
          </div>
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          lg={5}
          className="bg-gray-200 flex items-center justify-center"
        >
          <div className="px-10 w-full max-w-lg">
            <h1 className="font-bold text-5xl">Happening Now</h1>
            <h1 className="font-bold text-3xl py-16">Join Connect Today</h1>
            <div className="w-full">
              <GoogleLogin width={450} />
              <p className="py-5 text-center font-bold">OR</p>
              <Button
                onClick={handleOpenAuthModal}
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px",
                  width: "400px",
                }}
              >
                Create Account
              </Button>
              <p className="text-sm mt-2">
                By signing, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.
              </p>
            </div>
            <div className="mt-10">
              <h1 className="font-bold text-xl mb-5">
                Already Have an Account?
              </h1>
              <Button
                onClick={handleOpenAuthModal}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "29px",
                  py: "7px",
                }}
              >
                LOGIN
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal}/>
    </div>  
  );
};

export default Authentication;
