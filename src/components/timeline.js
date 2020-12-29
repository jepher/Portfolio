import React, { Component } from "react";

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 0,
      currentEvent: 0,
      events: [
        {
          organization: "NYU CREATE Lab",
          page: "https://create.nyu.edu/",
          position: "Project Manager",
          time: "Aug - Sep 2019",
          description: [
            <li key="create-1">
              Led a 3-person team to design a 2D platform game in Javascript
            </li>,
            <li key="create-2">
              Wrote storyline, designed characters and maps, programmed game
              loop
            </li>,
            <li key="create-3">
              Worked with professional game developers to receive and
              incorporate feedback
            </li>,
          ],
        },
        {
          organization: "RUAutonomous",
          page: "https://aiaa.rutgers.edu/proj2.html",
          position: "Imaging Subteam",
          time: "Sep 2019 - Present",
          description: [
            <li key="ruautonomous-1">
              Collaborating with a 7-person team collect and analyze image and
              telemetry data from drone in order to achieve autonomous decision
              making
            </li>,
            <li key="ruautonomous-2">
              Prepared custom dataset and trained multiclass object detection 
              model with Tensorflow object detection API to locate and identify 
              mission targets in-flight
            </li>,
            <li key="ruautonomous-3">
              Optimized data communication protocols between drone and ground
              server through data compression
            </li>,
          ],
        },
        {
          organization: "IVI Lab",
          page: "https://ivi.cs.rutgers.edu/",
          position: "Undergraduate Research Fellow",
          time: "Jan - Jun 2020",
          description: [
            <li key="ivi-1">
              Worked under post doctorate researcher to create a 3D traffic
              behavior model in Unity that simulates pathfinding and collision
              avoidance behavior of drivers
            </li>,
            <li key="ivi-2">
              Designed and implemented behavior tree for driver-driver and
              driver-traffic light interactions
            </li>,
          ],
        },
        {
          organization: "Rutgers Research Project Team",
          page: null,
          position: "Part-time Undergraduate Programmer",
          time: "Jun 2020 - Present",
          description: [
            <li key="aresty-1">
              Worked with a research project team and public transportation
              company to create a mobile app that allows users to track and
              interact with an autonomous transit system
            </li>,
            <li key="aresty-2">
              Created application front end using React Native and used Google
              Maps API, OpenTripPlanner, and MongoDB backend to create a
              client-side data management system
            </li>,
          ],
        },
      ],
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    const buttons = document.querySelectorAll(".timeline button");
    for (let button of buttons) {
      button.addEventListener("click", () => {
        this.onClick(button);
      });
    }

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    this.setState({ windowWidth });
  }

  renderSelectedBar() {
    var barSize = 100 / this.state.events.length;
    var thickness = "2px";
    // horizontal
    if (this.state.windowWidth <= 670)
      return (
        <span
          className="timeline-selected"
          key="timeline-selected"
          style={{
            width: barSize + "%",
            height: thickness,
            bottom: 0,
            transform: "translateX(" + this.state.currentEvent * 100 + "%)",
          }}
        ></span>
      );
    // vertical
    else
      return (
        <span
          className="timeline-selected"
          style={{
            width: thickness,
            height: barSize + "%",
            top: 0,
            transform: "translateY(" + this.state.currentEvent * 100 + "%)",
          }}
        ></span>
      );
  }

  onClick(button) {
    const buttons = document.querySelectorAll(".timeline button");
    for (const btn of buttons) {
      btn.classList.remove("active");
    }

    button.classList.add("active");
    var eventId = button.getAttribute("data-id");
    this.setState(() => {
      return {
        currentEvent: eventId,
      };
    });
  }

  render() {
    var currentEvent = this.state.events[this.state.currentEvent];
    return (
      <div className="timeline-container">
        <div className="timeline">
          {this.renderSelectedBar(window.innerWidth)}
          <ul>
            <li>
              <button className="active" data-id="0">
                NYU CREATE
              </button>
            </li>
            <li>
              <button data-id="1">RUAutonomous</button>
            </li>
            <li>
              <button data-id="2">IVI Lab</button>
            </li>
            <li>
              <button data-id="3">Rutgers Research</button>
            </li>
          </ul>
        </div>

        <div className="timeline-description">
          <div className="timeline-event-title">
            <span className="timeline-description-position">
              {currentEvent.position}
            </span>{" "}
            @{" "}
            <a
              className="timeline-description-organization"
              href={currentEvent.page}
              rel="noopener noreferrer"
              target="_blank"
            >
              {currentEvent.organization}
            </a>
          </div>
          <div className="timeline-event-duration">{currentEvent.time}</div>
          <ul>{currentEvent.description}</ul>
        </div>
      </div>
    );
  }
}

export default Timeline;
