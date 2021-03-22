// Authors:
// Karan Bhaveshbhai Kharecha
// Aditya Patel
// Poojan Patel
// Akshay Singh
// Prem Menni Kumar

import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Registration from "./components/RegistrationForm/RegistrationForm";
import Welcome from "./components/Welcome/Welcome";
import Subscribe from "./components/Subscribe/Subscribe";
import History from "./components/History/History";
import MovieSearch from "./components/MovieSearch/MovieList";
import Profile from "./components/Profile/Profile";
import Review from "./components/Review/Review";
import HomeContent from "./components/HomeContent/HomeContent";
import TopRated from "./components/TopRated/TopRated";
import Watchlist from "./components/Watchlist/Watchlist";
import HelpSupport from "./components/HelpSupport/HelpSupport";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import PublicBlogs from "./components/Public Blogs/PublicBlogs";
import "font-awesome/css/font-awesome.min.css";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Blogs from "./components/Blogs/Blogs";

function App(props) {
  return (
    <Router>
      <div id="App" className="App">
        {/* <Header />   */}
        {/* <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} /> */}
        {/* <div id="page-wrap"> */}
        <Header />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <HomeContent />
            </Route>
            <Route path="/toprated" exact={true}>
              <TopRated />
            </Route>
            <Route path="/register">
              <Registration />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/subscribe">
              <Subscribe />
            </Route>
            <Route path="/search">
              <MovieSearch />
            </Route>
            <Route exact path="/review/:movieId" component={Review} />
            <Route exact path="/welcome" component={Welcome} />
            <Route path="/home">
              <HomeContent />
            </Route>
            <Route exact path="/moviedetails/:movieId" component={MovieDetails} />
            <Route path="/watchlist">
              <Watchlist />
            </Route>
            <Route path="/helpsupport">
              <HelpSupport />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/moviedetails">
              <MovieDetails />
            </Route>
            <Route path="/profile">
              <Profile/>
            </Route>
            <Route path="/blogs">
              <Blogs/>
            </Route>
            <Route path="/publicblogs">
              <PublicBlogs/>
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
