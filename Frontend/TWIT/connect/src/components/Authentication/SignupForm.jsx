import React from "react";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Store/Auth/Action";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  dateOfBirth: Yup.object().shape({
    day: Yup.number().required("Day is required").min(1).max(31),
    month: Yup.number().required("Month is required").min(1).max(12),
    year: Yup.number()
      .required("Year is required")
      .min(currentYear - 100, "Invalid year")
      .max(currentYear, "Invalid year"),
  }),
});

const SignupForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      mobile:"",
      dateOfBirth: {
        day: 1,
        month: 1,
        year: currentYear,
      },
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.dateOfBirth;
      const formattedMonth = month.toString().padStart(2, '0');
      const formattedDay = day.toString().padStart(2, '0');
    
      const dateOfBirth = `${year}-${formattedMonth}-${formattedDay}`;
      console.log("Submitted Payload:", { ...values, dateOfBirth });
      dispatch(registerUser({ ...values, dateOfBirth }));
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Full Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              variant="outlined"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              variant="outlined"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              variant="outlined"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>

          {/* Date of Birth */}
          {["day", "month", "year"].map((field, index) => (
            <Grid item xs={4} key={field}>
              <InputLabel>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </InputLabel>
              <Select
                name={field}
                fullWidth
                value={formik.values.dateOfBirth[field] || ""}
                onChange={handleDateChange(field)}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.dateOfBirth?.[field] &&
                  Boolean(formik.errors.dateOfBirth?.[field])
                }
              >
                {(field === "day"
                  ? days
                  : field === "month"
                  ? months
                  : years
                ).map((item) =>
                  typeof item === "object" ? (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ) : (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
            </Grid>
          ))}

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              sx={{
                borderRadius: 2,
                py: 2,
                bgcolor: blue[500],
                "&:hover": { bgcolor: blue[700] },
              }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignupForm;
