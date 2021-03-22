import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Card from "../Cards/Cards";
// import axios from "axios";
import "./HomeContent.css";
import defaultPoster from '../../assets/default_poster.png';
// import defaultPoster from '../../assets/default_poster.png';
// import img1 from "../../assets/lotr.jpg";
// import img2 from "../../assets/tdk.jpg";
// import img3 from "../../assets/schindlerlist.jpg";

class HomeContent extends Component {
  state = {
    movieData: []
  };

  componentDidMount() {
    fetch
      (
        'https://safe-hamlet-70720.herokuapp.com/https://awd-backend.herokuapp.com/getHomeMovies'
      )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ movieData: data });
      });
  }
  render() {
    return (
      <div className="homecont-wrapper">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h3 className="display-4">
              Popular Movies <span role="img" aria-label="popcorn">
                🍿
        </span>
            </h3>
            <p className="lead">
              We bring you the most popular movies of all time!
          </p>

          </div>
        </div>
        <hr></hr>
        <div className="container-2">
          {this.state.movieData ?
            <div className="row movieList display-flex">
              {
                this.state.movieData.map((res, key) => {
                  if (res.Poster === "N/A") {
                    res.Poster = defaultPoster;
                  }
                  console.log(key)
                  return (
                    <div key={key} style={{ marginLeft: "1rem" }} className="row">
                      <div className="col-md-4 mt-4 ml-1 mb-4 mr-2">
                        < Card number={key + 1} rating={res.imdbRating} imgsrc={res.Poster} title={res.Title} genre={res.Genre} movieId={res.imdbID} year={res.Year} />
                      </div>
                    </div>
                  )
                })
              }
            </div> : <p className="errorMsg">No such movie found!</p>
          }
        </div>
      </div>
    );
  }
};
export default withRouter(HomeContent);
