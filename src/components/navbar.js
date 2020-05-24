import React, { Component } from "react";

class Navbar extends Component {
  onScroll() {
    var navbar = document.getElementById("navbar");
    var scrollPosition = window.scrollY;

    if (scrollPosition === 0) navbar.style.opacity = 0;
    else navbar.style.opacity = 1;
  }

  componentDidMount() {
    // hide navbar
    document.getElementById("navbar").style.opacity = 0;

    // navbar links
    document.querySelectorAll(".navbar a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });

    // navbar scroll listener
    window.addEventListener("scroll", () => {
      this.onScroll();
    });
  }

  render() {
    return (
      <div className="navbar" id="navbar">
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
