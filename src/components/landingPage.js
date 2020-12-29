import React, { Component } from "react";

import animations from "../animations/landingAnimations.js";

import avatar_body from "../images/landing/avatar.png";
import avatar_arm_1 from "../images/landing/arm1.png";
import avatar_arm_2 from "../images/landing/arm2.png";
import about_icon from "../images/landing/about_icon.png";
import work_icon from "../images/landing/work_icon.png";
import resume_icon from "../images/landing/resume_icon.png";
import contact_icon from "../images/landing/contact_icon.png";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      buttonClicked: false,
      buttons: [
        {
          text: "About",
          target: "about",
          img: about_icon,
          alt: "About",
        },
        {
          text: "My Work",
          target: "projects",
          img: work_icon,
          alt: "Work",
        },
        {
          text: "Resume",
          target: "resume",
          img: resume_icon,
          alt: "Resume",
        },
        {
          text: "Contact",
          target: "contact",
          img: contact_icon,
          alt: "Contact",
        },
      ],
    };

    this.handleClick = this.handleClick.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.selector = React.createRef();
  }

  handleClick(index) {
    animations.handleClick(index, this.state.buttonClicked);
    this.setState(() => {
      return {
        buttonClicked: true,
      };
    });
    setTimeout(() => {
      this.setState(() => {
        return {
          buttonClicked: false,
        };
      });
    }, 900);

    var button = document.querySelector("#container_" + index + " button");
    var target = button.getAttribute("data-target");
    setTimeout(() => {
      document.getElementById(target).scrollIntoView({ behavior: "smooth" });
    }, 500);
  }

  onResize() {
    for (var i = 0; i < 4; i++) {
      var canvas = document.getElementById("canvas_" + i);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  }

  onScroll() {
    var landing = this.selector.current.getBoundingClientRect();
    var avatar = document.querySelector(".avatar");

    // move avatar
    if (landing.bottom >= window.innerHeight * 0.6) {
      avatar.style.opacity =
        (landing.bottom - window.innerHeight * 0.6) /
        (window.innerHeight * 0.4);
    } else avatar.style.opacity = 0;

    if (this.state.windowWidth < 800) { // mobile
      if (landing.bottom >= window.innerHeight * 0.6) {
        var translateAmount =
          -20 +
          (1 -
            (landing.bottom - window.innerHeight * 0.6) /
              (window.innerHeight * 0.4)) *
            200;
        console.log(landing.bottom);
        console.log(window.innerHeight);
        console.log(translateAmount);
        avatar.style.transform = "translate(" + translateAmount + "%, 30%)";
      } else avatar.style.transform = "translate(200%, 30%)";
    } else avatar.style.transform = "translate(-20%, 30%)";
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    this.setState({ windowWidth });
  }

  renderButtons() {
    var buttons = [];

    for (let i = 0; i < this.state.buttons.length; i++) {
      let btn = this.state.buttons[i];
      buttons.push(
        <div
          className="button-container"
          id={"container_" + i}
          key={btn.text.toLowerCase()}
        >
          <button id={"button_" + i} data-target={btn.target}>
            {btn.text}
          </button>
          <img src={btn.img} alt={btn.alt}></img>
          <canvas id={"canvas_" + i}></canvas>
        </div>
      );
    }

    return buttons;
  }

  componentDidMount() {
    // animations
    if (window.innerWidth < 800) {
      // mobile
      document.getElementById("c1").width = document.body.clientWidth;
      document.getElementById("c2").width = 0;
      animations.splashMobile();
    } // computer
    else animations.splash();

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    // event handlers
    for (let i = 0; i < 4; i++) {
      // mouse over
      var buttonEm = document.querySelector("#container_" + i + " button");
      buttonEm.addEventListener("mouseover", () => {
        // change avatar opacity if scrolled
        var avatar = document.querySelector(".avatar");
        avatar.style.transition = "opacity 0.5s ease-in-out";
        avatar.style.opacity = 1;
        animations.handleMouseOver(i, this.state.buttonClicked);
      });

      // mouse out
      buttonEm.addEventListener("mouseout", () => {
        // change avatar opacity if scrolled
        this.onScroll();
        animations.handleMouseOut(i, this.state.buttonClicked);
      });

      // click
      buttonEm.addEventListener("click", () => {
        this.handleClick(i);
      });
    }

    // canvas resize
    window.addEventListener("resize", this.onResize);
    this.onResize();

    // window scroll
    window.addEventListener("scroll", () => {
      document.querySelector(".avatar").style.transition = "none";
      this.onScroll();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("scroll", this.onScroll);
  }

  render() {
    return (
      <div className="landing" ref={this.selector}>
        <div className="welcome-container">
          <div className="avatar">
            <img className="body" src={avatar_body} alt="avatar body"></img>
            <img
              className="arm1"
              id="arm1"
              src={avatar_arm_1}
              alt="avatar arm"
            ></img>
            <img
              className="arm2"
              id="arm2"
              src={avatar_arm_2}
              alt="avatar arm"
            ></img>
            <div className="ball-wrapper" id="ball-wrapper">
              <div className="ball" id="ball">
                <div className="ray-box">
                  <div className="ray ray1"></div>
                  <div className="ray ray2"></div>
                  <div className="ray ray3"></div>
                  <div className="ray ray4"></div>
                  <div className="ray ray5"></div>
                  <div className="ray ray6"></div>
                  <div className="ray ray7"></div>
                  <div className="ray ray8"></div>
                  <div className="ray ray9"></div>
                  <div className="ray ray10"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="welcome-text">
            <h1 id="greeting">Hello!</h1>
            <h3 id="introduction">
              I'm Jeffrey Yang. <br />
              Welcome to my personal website!
            </h3>
          </div>
          <div className="welcome-drawer">{this.renderButtons()}</div>
        </div>

        <div id="animation-container">
          <canvas
            className="animation-board"
            id="c1"
            width={window.innerWidth / 2}
            height={window.innerHeight}
            resize="true"
          ></canvas>
          <canvas
            className="animation-board"
            id="c2"
            width={window.innerWidth / 2}
            height={window.innerHeight}
            resize="true"
          ></canvas>
        </div>
      </div>
    );
  }
}

export default Landing;
