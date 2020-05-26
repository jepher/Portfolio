import React, { Component } from "react";

import Timeline from "./timeline";
import Skillset from "./skillset";

import java_icon from "../images/resume/java_icon.png";
import python_icon from "../images/resume/python_icon.png";
import c_sharp_icon from "../images/resume/c_sharp_icon.png";
import javascript_icon from "../images/resume/javascript_icon.png";
import html_icon from "../images/resume/html_icon.png";
import css_icon from "../images/resume/css_icon.png";
import unity_icon from "../images/resume/unity_icon.png";
import react_icon from "../images/resume/react_icon.png";
import node_icon from "../images/resume/node_icon.png";
import android_studio_icon from "../images/resume/android_studio_icon.png";
import mongodb_icon from "../images/resume/mongodb_icon.png";
import tf_icon from "../images/resume/tf_icon.png";
import git_icon from "../images/resume/git_icon.png";

class Resume extends Component {
  constructor(props) {
    super(props);

    this.selector = React.createRef();
  }

  onScroll() {
    var resume = this.selector.current.getBoundingClientRect();
    var textShadow = document.querySelector(
      "#resume-title .section-title-shadow"
    );
    var textGlow = document.querySelector("#resume-title .section-title-glow");
    var text = document.querySelector("#resume-title .section-title-text");

    // scroll into resume section
    if (resume.top <= window.innerHeight * 0.3) {
      text.style.textShadow = "0 0 20px #ed3434";
      text.style.color = "white";
      textShadow.style.opacity = 1;
      textGlow.style.opacity = 0.5;
    }
    // scroll out of resume section
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
      <div className="resume" id="resume" ref={this.selector}>
        <div className="resume-container">
          <div className="section-title" id="resume-title">
            <div className="section-title-glow"></div>
            <h1 className="section-title-shadow">Resume</h1>
            <h1 className="section-title-text">Resume</h1>
          </div>
          <h2 className="resume-header">Education</h2>
          <div className="resume-education">
            <h4>Rutgers University - New Brunswick</h4>
            <h5>Class of 2023</h5>
            <p>Computer Science, B.S.</p>
            <p>GPA: 4.00 / 4.00</p>
          </div>

          <hr />
          <h2 className="resume-header">Experience</h2>
          <Timeline></Timeline>

          <hr />
          <h2 className="resume-header">Skills</h2>
          <div className="skills-container">
            <Skillset
              title="Programming"
              buttons={[
                [java_icon, "java"],
                [python_icon, "python"],
                [c_sharp_icon, "c#"],
              ]}
              skills={[
                ["Java", 90],
                ["Python", 85],
                ["C#", 80],
              ]}
            ></Skillset>

            <Skillset
              title="Web Development"
              buttons={[
                [javascript_icon, "javascript"],
                [html_icon, "html"],
                [css_icon, "css"],
                [node_icon, "node"],
                [react_icon, "react"],
                [mongodb_icon, "mongodb"],
              ]}
              skills={[
                ["Javascript", 70],
                ["HTML", 70],
                ["CSS", 80],
                ["Node.js", 40],
                ["React.js", 65],
                ["MongoDB", 40],
              ]}
            ></Skillset>

            <Skillset
              title="Technologies"
              buttons={[
                [unity_icon, "unity"],
                [android_studio_icon, "android studio"],
                [tf_icon, "tensorflow"],
                [git_icon, "git"],
              ]}
              skills={[
                ["Unity", 70],
                ["Android Studio", 60],
                ["Tensorflow", 60],
                ["Git", 50],
              ]}
            ></Skillset>
          </div>
        </div>
      </div>
    );
  }
}

export default Resume;
