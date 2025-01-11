import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createReply } from "../../Store/Twit/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function ReplyModal({
  open: isModalOpen,
  handleClose,
  twitdata,
  updateReplyCount,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState(false);
  const [selectImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const { auth, theme } = useSelector((store) => store);
  const handleSubmit = (values, actions) => {
    console.log("Submitting form with values: ", values);
    dispatch(createReply(values));
    updateReplyCount(twitdata.totalReplies + 1);
    actions.resetForm();
    console.log("handle submit", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      twitId: twitdata.id,
    },
    onSubmit: (values, actions) => {
      console.log("Formik onSubmit triggered with values: ", values);
      handleSubmit(values, actions);
    },
  });
  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadImage(true);
      const imgUrl = URL.createObjectURL(file);
      formik.setFieldValue("image", imgUrl);
      setSelectedImage(imgUrl);
      setUploadImage(false);
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-start space-x-3">
            <Avatar
              onClick={() => navigate(`/profile/${6}`)}
              className="cursor-pointer"
              alt=""
              src={twitdata.user.image}
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{twitdata.user.fullName}</span>
                <span className="text-gray-600">
                  @{twitdata.user.fullName.toLowerCase().split(" ").join("_")}{" "}
                </span>
                <span className="text-gray-600">· 2m</span>
                <img
                  className="w-4 h-4"
                  src="https://static.vecteezy.com/system/resources/previews/015/304/837/original/blue-verified-tick-valid-seal-icon-in-flat-style-design-isolated-on-white-background-validation-concept-vector.jpg"
                  alt="Verified"
                />
              </div>
              <Typography className="mt-2 mb-4">{twitdata.content}</Typography>
            </div>
          </div>

          <Box component="form" sx={{ mt: 2 }} onSubmit={formik.handleSubmit}>
            <section className={`pb-10`}>
              <div className="flex space-x-5">
                <Avatar alt="username" src={auth.user?.image} />
                <div className="w-full relative">
                  <div>
                    <input
                      type="text"
                      name="content"
                      placeholder="What's happening?"
                      className="border-none outline-none text-xl bg-transparent"
                      {...formik.getFieldProps("content")}
                    />
                    {formik.errors.content && formik.touched.content && (
                      <p className="text-red-500">{formik.errors.content}</p>
                    )}
                  </div>

                  {selectImage && uploadImage && (
                    <div className="mt-4">
                      <img
                        src={selectImage}
                        alt="Preview"
                        className="max-h-40"
                      />
                    </div>
                  )}

                  <div className="flex items-center mt-5">
                    <div className="flex space-x-5 items-center w-full">
                      <label
                        className="flex items-center space-x-2 rounded-md cursor-pointer"
                        htmlFor="fileInput"
                      >
                        <ImageIcon className="text-[#1d9bf0]" />
                        <input
                          id="fileInput"
                          type="file"
                          name="image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleSelectImage}
                        />
                      </label>
                      <FmdGoodIcon className="text-[#1d9bf0]" />
                      <TagFacesIcon className="text-[#1d9bf0]" />
                    </div>
                    <div className="ml-auto">
                      <Button
                        sx={{
                          padding: "8px 20px",
                          borderRadius: "20px",
                          bgcolor: "#1e88e5",
                          display: "inline-block",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Tweet
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
