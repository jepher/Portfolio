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
    // var button = document.querySelector(".accordion-btn");
    // button.addEventListener("click", () => {
    //   var content = button.nextElementSibling;
    //   button.classList.toggle("accordion-btn--active");

    //   if (button.classList.contains("accordion-btn--active")) {
    //     content.style.height = content.scrollHeight + "px";
    //     button.innerHTML = "Ok, TMI!";
    //   } else {
    //     content.style.height = 0;
    //     button.innerHTML = "Find out more";
    //   }
    // });

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
      <div className="about" ref={this.selector}>
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
                Hello! I'm Jeffrey, a computer scientist based in Princeton, New
                Jersey. I am currently an undergraduate at Rutgers University. I
                enjoy designing and implementing complex applications that
                tackle all sorts of technological challenges. My primary
                interests are software engineering, web development, and machine
                learning. My goal is to use computer science to bring my ideas
                to life and create products that will improve the lives of
                others.
              </p>
              {/* <div className="accordion-container">
                <button className="accordion-btn">Find out more</button>
                <div className="about-more-container">
                  <p>
                    I grew up in New Jersey, but my family is from China, so I
                    can speak and understand Chinese. I enjoy arts and crafts
                    and have done origami, pencil drawing, and painting in the
                    past. I often play around in Adobe Photoshop and Illustrator
                    to make funny pictures. In my free time, I like to play
                    basketball, piano, and video games.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
