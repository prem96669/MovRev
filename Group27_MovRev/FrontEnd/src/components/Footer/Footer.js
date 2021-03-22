import React from "react";
import { withRouter } from "react-router-dom";
import "./Footer.css";

function Footer(props) {
  const { location } = props;
  const notShowFooter = [
    "/subscribe",
    "/login",
    "/register",
    "/welcome",
    "/helpsupport",
    "/search"
  ];
  let footer;
  const footerComponent = (
    <div className="mainfooter">
      <a style={{ textDecoration: "none" }} className="logo" href="/home">
        <i
          className="logo-icon fa fa-video-camera fa-fw"
          aria-hidden="true"
        ></i>
        MovRev
      </a>
      <p className="attri">
        Made with <i className="fa fa-heart" aria-hidden="true"></i> by Group 27
        © 2020
      </p>
    </div>
  );
  footer = notShowFooter.includes(location.pathname) ? "" : footerComponent;
  return footer;
}
export default withRouter(Footer);
