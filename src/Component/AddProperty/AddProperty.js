import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../AddProperty/AddProperty.css";
import { API } from "../../Global.js";

const propertyValidationSchema = yup.object({
  propertyType: yup.string().required(),
  price: yup.number().required(),
  location: yup.string().required(),
  description: yup.string().required(),
});

function AddProperty() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      propertyType: "",
      location: "",
      price: "",
      description: "",
    },

    validationSchema: propertyValidationSchema,

    onSubmit: (newData) => {
      addProperty(newData);
    },
  });

  const addProperty = async (newData) => {
    const data = await fetch(`${API}/property/create`, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
        Auth: localStorage.getItem("token"),
      },
    });
    const res = await data.json();

    navigate("/home");
  };

  return (
    <form className="smallBox" onSubmit={formik.handleSubmit}>
      <h2>Add-Property Form</h2>
      <TextField
        label="PropertyType"
        value={formik.values.propertyType}
        name="propertyType"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.propertyType && formik.errors.propertyType}
        helperText={
          formik.touched.propertyType && formik.errors.propertyType
            ? formik.errors.propertyType
            : null
        }
      />

      <TextField
        label="Loaction"
        value={formik.values.location}
        name="location"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.location && formik.errors.location}
        helperText={
          formik.touched.location && formik.errors.location
            ? formik.errors.location
            : null
        }
      />

      <TextField
        label="Price"
        value={formik.values.price}
        name="price"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.price && formik.errors.price}
        helperText={
          formik.touched.price && formik.errors.price
            ? formik.errors.price
            : null
        }
      />

      <TextField
        label="Description"
        value={formik.values.description}
        name="description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && formik.errors.description}
        helperText={
          formik.touched.description && formik.errors.description
            ? formik.errors.description
            : null
        }
      />

      <Button variant="contained" type="submit">
        Add Property
      </Button>
    </form>
  );
}
export default AddProperty;
