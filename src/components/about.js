import React, { Component } from "react";

import profile_picture from "../images/about/profile_picture.jpg";

class About extends Component {
  constructor(props) {
    super(props);
    this.selector = React.createRef();
  }

  onScroll() {
    var about = this.selector.current.getBoundingClientRect();
    var textShadow = document.querySelector(
      "#about-title .section-title-shadow"
    );
    var textGlow = document.querySelector("#about-title .section-title-glow");
    var text = document.querySelector("#about-title .section-title-text");

    // scroll into about section
    if (about.top <= window.innerHeight * 0.3) {
      text.style.textShadow = "0 0 20px #0571ff";
      text.style.color = "white";
      textShadow.style.opacity = 1;
      textGlow.style.opacity = 0.5;
    }
    // scroll out of about section
    else {
      text.style.textShadow = "none";
      text.style.color = "#4a4a4a";
      textShadow.style.opacity = 0;
      textGlow.style.opacity = 0;
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.onScroll();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => {
      this.onScroll();
    });
  }

  render() {
    return (
      <div className="about" id="about" ref={this.selector}>
        <div className="about-container">
          <div className="section-title" id="about-title">
            <div className="section-title-glow"></div>
            <h1 className="section-title-shadow">About</h1>
            <h1 className="section-title-text">About</h1>
          </div>
          <div className="about-body">
            <img src={profile_picture} alt="Profile"></img>
            <div className="about-description">
              <p>
                Hi, I'm Jeffrey, a computer scientist based in Princeton, New
                Jersey. I am currently an undergraduate at Rutgers University. I
                enjoy designing and implementing complex applications that
                tackle all sorts of technological challenges. My primary
                interests are software engineering, web development, and machine
                learning. My goal is to use computer science to bring my ideas
                to life and create products that will improve the lives of
                others.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
