import { Avatar, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, getAllTweets } from "../../Store/Twit/Action";
import { uploadToCloudnary } from "../../Utils/UploadToCloudnary";
import EmojiPicker from "emoji-picker-react";
import '../../App.css';  

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const { twit, auth, theme } = useSelector((store) => store);
  const emojiPickerRef = useRef(null);

  const [openEmoji, setOpenEmoji] = useState(false);

  const handleOpenEmoji = () => setOpenEmoji(!openEmoji);
  // const handleCloseEmoji = () => setOpenEmoji(false);

  const handleSubmit = (values, actions) => {
    dispatch(createTweet(values));
    actions.resetForm();
    setSelectedImage("");
    setOpenEmoji(false);
  };
  useEffect(() => {
    console.log("Twits:", twit.twits);
  }, [twit.twits]);

  useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setOpenEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      isTweet: true,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleSelectImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingImage(true);
      const imgUrl = await uploadToCloudnary(file);
      formik.setFieldValue("image", imgUrl);
      setSelectedImage(imgUrl);
      setUploadingImage(false);
    }
  };

  const handleEmojiClick = (value) => {
    const { emoji } = value;
    formik.setFieldValue("content", formik.values.content + emoji);
    setOpenEmoji(false); // Close emoji picker after emoji is selected
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>

      <section
        className={`pb-10 ${
          theme.currentTheme === "dark"
            ? " bg-[#151515] p-10 rounded-md mb-10"
            : ""
        }`}
      >
        <div className="flex space-x-5">
          <Avatar alt="username" src={auth.user?.image} />
          <div className="w-full relative">
            <form onSubmit={formik.handleSubmit}>
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

              {selectedImage && (
                <div className="mt-4">
                  <img src={selectedImage} alt="Preview" className="max-h-40" />
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
                      name="imageFile"
                      className="hidden"
                      accept="image/*"
                      onChange={handleSelectImage}
                    />
                  </label>
                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <div className="relative">
                    <TagFacesIcon
                      onClick={() => setOpenEmoji(!openEmoji)}
                      className="text-[#1d9bf0] cursor-pointer"
                    />
                    {openEmoji && (
                      <div ref={emojiPickerRef}  className="absolute top-10 z-50 ">
                        <EmojiPicker
                          theme={theme.currentTheme}
                          onEmojiClick={handleEmojiClick}
                          lazyLoadEmojis={true}
                        />
                      </div>
                    )}
                  </div>
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
            </form>
          </div>
        </div>
      </section>

      <section>
        {twit.twits
          .filter((item) => item && item.user)
          .map((item) => (
            <TweetCard twit={item} />
          ))}
      </section>
    </div>
  );
};

export default HomeSection;
