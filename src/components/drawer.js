import React, { Component } from "react";

import Logo from "./logo";

class Drawer extends Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer() {
    var btn = document.querySelector(".menu-btn");
    var drawer = document.querySelector(".drawer-link-container");
    if (!this.state.drawerOpen) {
      btn.classList.add("open");
      drawer.classList.add("open");
    } else {
      btn.classList.remove("open");
      drawer.classList.remove("open");
    }
  }

  onClick(btn) {
    document.querySelector(btn.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    this.toggleDrawer();

    this.setState(() => {
      return {
        drawerOpen: false,
      };
    });
  }

  componentDidMount() {
    // hamburger click listener
    var btn = document.querySelector(".menu-btn");
    btn.addEventListener("click", () => {
      this.toggleDrawer();

      this.setState(() => {
        return {
          drawerOpen: !this.state.drawerOpen,
        };
      });
    });

    // drawer links
    document.querySelectorAll(".drawer-link-container a").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        this.onClick(btn);
      });
    });
  }

  render() {
    return (
      <nav className="drawer">
        <Logo></Logo>
        <button className="menu-btn">
          <div className="menu-btn-burger"></div>
        </button>
        <ul className="drawer-link-container">
          <li>
            <a className="drawer-link" href="#about">
              About
            </a>
          </li>
          <li>
            <a className="drawer-link" href="#projects">
              My Work
            </a>
          </li>
          <li>
            <a className="drawer-link" href="#resume">
              Resume
            </a>
          </li>
          <li>
            <a className="drawer-link" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Drawer;
