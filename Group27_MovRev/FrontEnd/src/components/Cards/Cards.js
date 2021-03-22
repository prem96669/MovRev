// Author: Menni Prem Kumar

import React from "react";
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css";
import "./Cards.css";

const Card = (props) => {
  const onClickAdd = (e) => {
    e.preventDefault();
    alert("Added to watchlist :)");
  };
  const addToHistory = (e) =>{
    e.preventDefault();
    let email = localStorage.getItem("email");
    console.log(email);
    console.log(e.movieId);
    console.log("history to be invoked");
  }
  const newTo = {
    pathname: "/review/" + props.movieId,
    poster: props.imgsrc,
    year: props.year,
    title: props.title
  };
  return (
    <div className="card text-center">
      <div className="overflow">
        <img src={props.imgsrc} alt="img1" className="card-img-top" />
      </div>
      <div className="card-body text-dark">
        <p style={{ color: "green" }}>#{props.number}</p>
        <small className="text-secondary ">Rating</small><h5 style={{ color: "green" }}>{props.rating} / 10</h5>
        <h4 className="card-title text-center">{props.title}</h4>
        <p className="card-text text-secondary">{props.genre}</p>
        <div className="btn-toolbar">
          <Link
            to="#"
            data-toggle="tooltip"
            title="Add to watchlist"
            className="btn btn-outline-success"
            onClick={onClickAdd}
          >
            +
            </Link>
          <Link to={newTo} className="btn btn-outline-success">
            Add Review
           </Link>
          <Link to={"/moviedetails/" + props.movieId} data-toggle="tooltip"
            title="See more details!" className="btn btn-outline-success"
            >
            <i className="fa fa-info fa-fw" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </div>

  );
};
export default Card;
