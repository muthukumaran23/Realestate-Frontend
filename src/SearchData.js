import { useSearch } from "./Component/Context/Search";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./Global";

function SearchData() {
  const [values, setValues] = useSearch();
  console.log(values);
  const navigate = useNavigate();

  return (
    <div className="search-container">
      {values.results && values.results.length > 0 ? (
        values.results.map((ele, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} className="card" key={index}>
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
              <CardActions></CardActions>
            </Card>
          );
        })
      ) : (
        <div className="msg">"No Property Found..!" </div>
      )}
    </div>
  );
}
export default SearchData;
