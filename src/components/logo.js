import React, { Component } from "react";

class Logo extends Component {
  onClick(e, link) {
    e.preventDefault();

    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  }

  componentDidMount() {
    // logo link
    document.querySelectorAll(".logo-link").forEach((logo) => {
      logo.addEventListener("click", (e) => this.onClick(e, logo));
    });
  }

  render() {
    return (
      <button className="logo-btn">
        <div className="logo-outline">
          <div className="logo-side left"></div>
          <div className="logo-side right"></div>
        </div>
        <div className="logo-side left"></div>
        <a className="logo-link" href="#landing">
          J
        </a>
        <div className="logo-side right"></div>
      </button>
    );
  }
}

export default Logo;
