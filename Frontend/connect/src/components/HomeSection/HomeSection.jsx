import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, getAllTweets } from "../../Store/Twit/Action";
import { uploadToCloudnary } from "../../Utils/UploadToCloudnary";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Tweet text is required"),
});

const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const { twit, auth } = useSelector((store) => store);

  const handleSubmit = (values, actions) => {
    dispatch(createTweet(values));
    actions.resetForm();
    setSelectedImage("");
  };
  useEffect(() => {
    console.log("Twits:", twit.twits);
  }, [twit.twits]);

  useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch]);

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

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>

      <section className="pb-10">
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
            </form>
          </div>
        </div>
      </section>

      <section>
        {twit.twits
        .filter((item)=>item&&item.user)
        .map((item) => (
          <TweetCard twit={item} />
        ))}
      </section>
    </div>
  );
};

export default HomeSection;
