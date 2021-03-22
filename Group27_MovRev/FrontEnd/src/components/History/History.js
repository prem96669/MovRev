
import { withRouter } from "react-router-dom";
import React from "react";
import batman from "../../assets/batman.jpeg";
import infi from "../../assets/infi_war.jpg";
import joker from "../../assets/joker.jpg";
// import Rating from "@material-ui/lab/Rating";
// import Box from "@material-ui/core/Box";
// import IconButton from "@material-ui/core/IconButton";
// import DeleteIcon from "@material-ui/icons/Delete";
import "./History.css";
// import Tooltip from "@material-ui/core/Tooltip";
// import Link from "@material-ui/core/Link";

const History = () => {
  let watchitem = [];
  let i;
  for (i = 0; i < 9; i++) {
    watchitem.push(
      <div key={i} className="row mt-3">
        <div className="card ml-4 mr-4">
          <div className="card-image">
            <img src={batman} alt={"Batman Poster"} className="watchitemimg" />
            <div className="ListItem-overlay">
              <p className="ListItem-title">Batman</p>
              <div className="ListItem-subcontent">
                <span className="ListItem-year">Year: 2010</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ListItem-movie">Rating: 9/10</span>
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <button
              id="removebutton"
              className="btn btn-light btn-block mb-3"
            >
              Delete
                  </button>
          </footer>
        </div>
        <div className="card ml-4 mr-4">
          <div className="card-image">
            <img src={infi} alt={"Batman Poster"} className="watchitemimg" />
            <div className="ListItem-overlay">
              <p className="ListItem-title">Batman</p>
              <div className="ListItem-subcontent">
                <span className="ListItem-year">Year: 2010</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ListItem-movie">Rating: 9/10</span>
              </div>
            </div>

          </div>
          <footer className="card-footer">
            <button
              id="removebutton"
              className="btn btn-light btn-block mb-3"
            >
              Delete
                  </button>
          </footer>
        </div>
        <div className="card ml-4 mr-4">
          <div className="card-image">
            <img src={joker} alt={"Batman Poster"} className="watchitemimg" />
            <div className="ListItem-overlay">
              <p className="ListItem-title">Batman</p>
              <div className="ListItem-subcontent">
                <span className="ListItem-year">Year: 2010</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ListItem-movie">Rating: 9/10</span>
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <button
              id="removebutton"
              className="btn btn-light btn-block mb-3"
            >
              Delete
                  </button>
          </footer>
        </div>
      </div >
    );
  }
  return (
    <div className="container-fluid">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h3 className="display-4">
            History <span role="img" aria-label="popcorn">
              <i className="fas fa-history fa-fw"></i>
            </span>
          </h3>
        </div>
      </div>
      <hr></hr>
      {watchitem}
    </div>
  );
};
export default withRouter(History);
