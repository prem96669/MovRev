import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import axios from 'axios';
import Card from "../Cards/Cards";
import "./TopRated.css";
import defaultPoster from '../../assets/default_poster.png';

class TopRated extends Component {
  state = {
    movieData: []
  };

  componentDidMount() {
    fetch
      (
        'https://safe-hamlet-70720.herokuapp.com/https://awd-backend.herokuapp.com/getTopRatedMovies'
      )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ movieData: data });
      });
  }
  render() {
    // const {
    //   Title,
    //   Released,
    //   Genre,
    //   imdbID,
    //   Poster,
    //   imdbRating
    // } = this.state.movieData;
    // console.log('Title, Released =>' + Title + Released)
    // if (!Poster || Poster === 'N/A') {
    //   return null;
    // }
    // let card = [];
    // let i;
    // // {
    // //   this.state.movieData ?
    // // if (res.Poster == "N/A") {
    // //     res.Poster = defaultPoster;
    // //   }
    // for (i = 0; i < 20; i++) {
    //   card.push(
    //     <div key={i} className="row">
    //       <div className="col-md-4 mt-5">
    //         <Card rating={imdbRating} movieId={imdbID} imgsrc={Poster} title={Title} genre={Genre} />
    //       </div>
    //       <div className="col-md-4 mt-5">
    //         <Card movieId={imdbID} imgsrc={Poster} title={Title} genre={Genre} />
    //       </div>
    //       <div className="col-md-4 mt-5">
    //         <Card
    //           movieId={imdbID}
    //           imgsrc={Poster}
    //           title={Title} genre={Genre}
    //         />
    //       </div>
    //     </div>
    //   );
    // }
    // this.state.movieData.map((res, key) => {
    //   if (res.Poster === "N/A") {
    //     res.Poster = defaultPoster;
    //   }
    return (
      <div className="homecont-wrapper">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h3 className="display-4">
              Top-20 Movies! <span role="img" aria-label="popcorn">
                🍿
        </span>
            </h3>
            <p className="lead">
              We bring you the movies that has been rated the highest of all time.
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
}

export default withRouter(TopRated);

// return (
//   <div>
//     <Search
//       search={this.state.search}
//       detectChange={this.updateSearch}
//       searchAction={this.searchAction}
//     />
//     {this.state.movies ?
//       <div className="row movieList display-flex">
//         {
//           this.state.movies.map((res, key) => {
//             if (res.Poster === "N/A") {
//               res.Poster = defaultPoster;
//             }
//             return (
//               <div key={key} style={{ marginLeft: "1rem" }} className="row">
//                 <div className="col-md-4 mt-4    mb-4 ml-1 mr-4">
//                   < Card rating={res.imdbRating} imgsrc={res.Poster} title={res.Title} genre={res.Genre} movieId={res.imdbID} year={res.Year} />
//                 </div>
//               </div>
//             )
//           })
//         }
//       </div> : <p className="errorMsg">No such movie found!</p>
//     }
//   </div>
// );