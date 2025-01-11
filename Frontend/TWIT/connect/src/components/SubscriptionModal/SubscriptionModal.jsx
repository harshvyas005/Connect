import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { makePaymentAction } from "../../Store/Payment/Action";
import { useNavigate } from "react-router-dom";

// Modal Style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

const features = [
  "Prioritized rankings in conversations and search",
  "See approximately twice as many Tweets between ads in your For You and Following timelines.",
  "Add bold and italic text in your Tweets.",
  "Post longer videos and 1080p video uploads.",
  "All the existing Blue features, including Edit Tweet, Bookmark Folders, and early access to new features.",
];

export default function SubscriptionModal({ handleClose, open }) {
  const [plan, setPlan] = React.useState("yearly"); // Default to 'yearly' plan
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const makePayment = () => {
    console.log("Selected plan:", plan);
    dispatch(makePaymentAction(plan)).then((response) => {
      // Assuming `response.data.orderId` contains the orderId
      const orderId = response?.data?.orderId;
      if (orderId) {
        navigate(`/verifiedSuccess?orderId=${orderId}`); // Redirect with the orderId
      } else {
        console.error("Order ID not found in response");
      }
    });
  };

  return (
    <div>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          {/* Header: Close Button */}
          <div className="flex justify-end mb-4">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Modal Content */}
          <div className="space-y-6">
            {/* Blue Tick Notice */}
            <div className="flex items-center bg-blue-50 p-4 rounded-md shadow-md">
              <Typography variant="body2" className="text-gray-700 flex-1">
                Blue subscribers with a verified phone number will get a blue
                checkmark once approved.
              </Typography>
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.auoaBXX23co49yh9ogE3HwHaH3&pid=Api&P=0&h=180"
                alt="Blue Tick"
                className="w-12 h-12 ml-4"
              />
            </div>

            {/* Plan Toggle */}
            <div className="flex justify-between items-center border rounded-full px-4 py-2 border-gray-300">
              <button
                onClick={() => setPlan("yearly")} // Updated to 'yearly' to match backend expectations
                className={`flex-1 text-center font-medium py-1 rounded-full ${
                  plan === "yearly" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                Annually{" "}
                <span className="text-green-500 text-sm">Save 12%</span>
              </button>
              <button
                onClick={() => setPlan("monthly")} // Updated to 'monthly' to match backend expectations
                className={`flex-1 text-center font-medium py-1 rounded-full ${
                  plan === "monthly" ? "text-blue-600" : "text-gray-500"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <FiberManualRecordIcon sx={{ fontSize: 8 }} />
                  <Typography variant="body2">{feature}</Typography>
                </div>
              ))}
            </div>

            {/* Pricing Section */}
            <div className="flex justify-center">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  borderRadius: "999px",
                  py: 1.5,
                  px: 4,
                  "&:hover": { bgcolor: "gray.800" },
                }}
                onClick={makePayment} // Trigger payment when clicked
              >
                <span className="line-through text-gray-400 mr-2">
                  ₹7,800.00
                </span>
                ₹6,800/year
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
