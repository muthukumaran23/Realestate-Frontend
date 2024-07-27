import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { API } from "../../Global";

const propertyValidationSchema = yup.object({
  propertyType: yup.string().required(),
  price: yup.number().required(),
  location: yup.string().required(),
  description: yup.string().required(),
});

function EditProperty() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getSingle();
  }, []);

  const getSingle = async () => {
    const data = await fetch(`${API}/property/findOne/${id}`, {
      method: "GET",
      headers: {
        Auth: localStorage.getItem("token"),
      },
    });
    const res = await data.json();
    setData(res);
  };

  return (
    <div>{data ? <EditPropertyForm property={data} /> : "Loading..."}</div>
  );
}
function EditPropertyForm({ property }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      propertyType: property.propertyType,
      location: property.location,
      price: property.price,
      description: property.description,
    },

    validationSchema: propertyValidationSchema,

    onSubmit: (newData) => {
      editProperty(newData);
    },
  });

  const editProperty = async (newData) => {
    try {
      const data = await fetch(`${API}/property/${property._id}`, {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
          Auth: localStorage.getItem("token"),
        },
      });
      const res = await data.json();

      if (data.status == 200) {
        alert("Property Updated successfully");
        navigate("/home");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="smallBox" onSubmit={formik.handleSubmit}>
      <h2>Edit-Property Form</h2>
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
        Submit
      </Button>
    </form>
  );
}
export default EditProperty;
