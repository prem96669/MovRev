import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MovieDetails.css"
class MovieDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      movie: {},
      movieId: props.match.params.movieId,
      validMovieId: false
    }
  }
  componentWillMount() {
    fetch(`https://www.omdbapi.com/?apikey=fa9a7315&i=${this.state.movieId}`).then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          this.setState({
            movie: data,
            validMovieId: true
          });
        } else {
          this.setState({
            validMovieId: false
          });
        }

      })
      .catch((err) => {
        console.error(err);
        this.setState({
          validMovieId: false
        });
      })
  }
  render() {
    const state = this.state;
    const newTo = {
      pathname: "/review/" + state.movie.imdbID,
      poster: state.movie.Poster,
      year: state.movie.Year,
      title: state.movie.Title
    };
    return (
      <div className="container">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h3 className="display-4">
              Movie details <span role="img" aria-label="popcorn">
                🍿
          </span>
            </h3>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="card text-center ml-4">
            <div className="overflow">
              <img src={state.movie.Poster} alt="img1" className="card-img-top" />
            </div>
            <div className="card-body text-dark">
              <small className="text-secondary ">Rating</small><h5 style={{ color: "green" }}>{state.movie.imdbRating} / 10</h5>
              <p className="card-text text-secondary">Genre: {state.movie.Genre}</p>
              <div className="btn-toolbar">
                <Link
                  to="#"
                  data-toggle="tooltip"
                  title="Add to watchlist"
                  className="btn btn-outline-success"
                >
                  +
              </Link>
                <Link to={newTo} className="btn btn-outline-success">
                  Add Review
              </Link>
              </div>
              <Link to={newTo} className="btnAllRev btn btn-outline-success">
                View all the reviews
              </Link>
            </div>
          </div>
          <div className="col-md-8">
            <h3 className="heading3">{state.movie.Title}</h3>
            <ul style={{ textAlign: "left" }} className="list-group">
              <li className="list-group-item">
                Released: <strong>{state.movie.Released}</strong>
              </li>
              <li className="list-group-item">
                Runtime: <strong>{state.movie.Runtime}</strong>
              </li>
              <li className="list-group-item">
                Rated: <strong>{state.movie.Rated}</strong>
              </li>
              <li className="list-group-item">
                Director: <strong>{state.movie.Director}</strong>
              </li>
              <li className="list-group-item">
                Writer: <strong>{state.movie.Writer}</strong>
              </li>
              <li className="list-group-item">
                Actors: <strong>{state.movie.Actors}</strong>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-2">
          <div className="card card-body bg-dark text-light justify-left">
            <div className="col-md-12">
              <h3 style={{ textAlign: "left", paddingTop: "1rem" }}>Plot </h3>
              <hr style={{ backgroundColor: "white" }}></hr>
              <div style={{ textAlign: "left" }}>{state.movie.Plot}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
export default MovieDetails;
