import React, { Component } from "react";

class Drawer extends Component {
  state = {
    drawerOpen: false,
  };

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
    var btns = document.querySelectorAll(".drawer a");
    for (let btn of btns) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        this.onClick(btn);
      });
    }
  }

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

  render() {
    return (
      <nav className="drawer">
        <div className="menu-btn">
          <div className="menu-btn-burger"></div>
        </div>
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
