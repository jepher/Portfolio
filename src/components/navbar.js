import React, { Component } from "react";

import Logo from "./logo";

class Navbar extends Component {
  onScroll() {
    var navbar = document.getElementById("navbar");
    var scrollPosition = window.scrollY;

    if (scrollPosition === 0) {
      navbar.style.opacity = 0;
      document.querySelectorAll(".navbar-link").forEach((anchor) => {
        anchor.style.pointerEvents = "none";
      });
    } else {
      navbar.style.opacity = 1;
      document.querySelectorAll(".navbar-link").forEach((anchor) => {
        anchor.style.pointerEvents = "all";
      });
    }
  }

  onClick(e, link) {
    e.preventDefault();

    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  }

  componentDidMount() {
    // hide navbar
    document.getElementById("navbar").style.opacity = 0;

    // navbar links
    document.querySelectorAll(".navbar-link").forEach((anchor) => {
      anchor.addEventListener("click", (e) => this.onClick(e, anchor));
    });

    // navbar scroll listener
    window.addEventListener("scroll", () => {
      this.onScroll();
    });
  }

  render() {
    return (
      <div className="navbar" id="navbar">
        <Logo></Logo>
        <nav className="navbar-link-container">
          <ul>
            <li>
              <a className="navbar-link" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="navbar-link" href="#projects">
                My Work
              </a>
            </li>
            <li>
              <a className="navbar-link" href="#resume">
                Resume
              </a>
            </li>
            <li>
              <a className="navbar-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
