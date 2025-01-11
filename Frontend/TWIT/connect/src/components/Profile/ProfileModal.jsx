import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { TextField, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Store/Auth/Action";
import { useEffect } from "react";
import { uploadToCloudnary } from "../../Utils/UploadToCloudnary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function ProfileModal({ open: isModalOpen, handleClose }) {
  const [localOpen, setLocalOpen] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values));
    console.log("handle submit", values);
    handleClose();
  };
  const handleImageChange = async (event) => {
    setUploading(true);
    const { name } = event.target;
    const file = event.target.files[0];

    try {
      const url = await uploadToCloudnary(file, name);
      formik.setFieldValue(name, url);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: auth.user.fullName || "",
      website: auth.user.website || "",
      location: auth.user.location || "",
      bio: auth.user.bio || "",
      backgroundImage: auth.user.backgroundImage || "",
      image: auth.user.image || "",
      mobile: auth.user.mobile || "",
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    console.log("Formik Values After Update:", formik.values);
  }, [formik.values]);

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between mb-4">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <p className="font-bold text-lg">Edit Profile</p>
              <Button type="submit" variant="contained" size="small">
                Save
              </Button>
            </div>

            <div
              className="hideScrollBar overflow-auto"
              style={{ maxHeight: "70vh" }}
            >
              <React.Fragment>
                <div className="relative mb-4">
                  <img
                    src={
                      formik.values.backgroundImage ||
                      "https://via.placeholder.com/1500x500?text=Background+Image"
                    }
                    alt="background"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    name="backgroundImage"
                  />
                </div>
                <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                  <div className="relative">
                    <Avatar
                      sx={{
                        width: "8rem",
                        height: "8rem",
                        border: "4px solid white",
                      }}
                      src={formik.values.image}
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      name="image"
                    />
                  </div>
                </div>
              </React.Fragment>

              <div className="space-y-4">
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.name && formik.errors.fullName}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.website && Boolean(formik.errors.website)
                  }
                  helperText={formik.touched.website && formik.errors.website}
                />
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />

                <TextField
                  fullWidth
                  id="mobile"
                  name="mobile"
                  label="Mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
              </div>

              {/* MARKED CHANGE: Additional Info Section */}
              <div className="mt-4">
                <p className="text-gray-600 text-sm">Birth Date .Edit</p>
                <p className="text-lg font-semibold">December 05, 2001</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
