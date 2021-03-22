import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Search from './Search';
// import Card from '../Cards/Cards';
import './MovieList.css'
import defaultPoster from '../../assets/default_poster.png';
class MovieList extends Component {
  constructor(props) {
    super();
    this.state = {
      movies: [],
      search: '',
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.searchAction = this.searchAction.bind(this);
  }
  updateSearch(newVal) {
    this.setState({
      search: newVal.target.value
    })
  }
  getMovie() {

    fetch(`https://www.omdbapi.com/?apikey=eddbb394&s=${this.state.search}&type=movie`).then((res) => res.json())
      .then((data) => {
        console.log(data.Search)
        this.setState({
          movies: data.Search
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }
  searchAction() {
    return (this.state.search) ? this.getMovie() : alert('Please enter movie title');
  }
  render() {
    const onClickAdd = (e) => {
      e.preventDefault();
      alert("Added to watchlist :)");
    };
    return (
      <div>
        <Search
          search={this.state.search}
          detectChange={this.updateSearch}
          searchAction={this.searchAction}
        />
        {this.state.movies ?
          <div className="row movieList display-flex">
            {
              this.state.movies.map((res, key) => {
                if (res.Poster === "N/A") {
                  res.Poster = defaultPoster;
                }
                const newTo = {
                  pathname: "/review/" + res.imdbID,
                  poster: res.Poster,
                  year: res.Year,
                  title: res.Title
                };
                return (
                  <div key={key} style={{ marginLeft: "1rem" }} className="row">
                    <div className="col-md-4 mt-4    mb-4 ml-1 mr-4">
                      <div className="card text-center">
                        <div className="overflow">
                          <img src={res.Poster} alt="img1" className="card-img-top" />
                        </div>
                        <div className="card-body text-dark">
                          <h4 className="card-title text-center">{res.Title}</h4>
                          <h5 style={{ color: "green" }}>{res.Year}</h5>
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
                            <Link to={"/moviedetails/" + res.imdbID} data-toggle="tooltip"
                              title="See more details!" className="btn btn-outline-success">
                              <i className="fa fa-info fa-fw" aria-hidden="true"></i>
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })
            }
          </div> : <p className="errorMsg">No such movie found!</p>
        }
      </div>
    );
  }
}
export default withRouter(MovieList);