import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import "../Card/PropertyCard.css";
import { useNavigate } from "react-router-dom";
import { API } from "../../Global";

function PropertyCard() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const value = await fetch(`${API}/property/getAll`, {
      method: "GET",
      headers: {
        Auth: localStorage.getItem("token"),
      },
    });

    const res = await value.json();

    setData(res);
  };

  const deleteFunction = async (id) => {
    try {
      let data = await fetch(`${API}/property/${id}`, {
        method: "DELETE",
        headers: {
          Auth: localStorage.getItem("token"),
        },
      });
      let res = await data.json();

      if (data.status == 200) {
        alert("Property deleted successfully");
        getDatas();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card-container">
      {data &&
        data.map((ele, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} className="card">
              <CardContent>
                <div className="card-head">
                  <Typography gutterBottom variant="h5" component="div">
                    {ele.propertyType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rs.{ele.price}
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="location"
                >
                  {ele.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ele.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate(`/edit/${ele._id}`)}
                >
                  Edit
                </Button>
                <Button size="small" onClick={() => deleteFunction(ele._id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
}
export default PropertyCard;
