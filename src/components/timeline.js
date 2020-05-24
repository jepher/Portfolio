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
          position: "Imaging Subteam",
          time: "Sep 2019 - Present",
          description: [
            <li key="ruautonomous-1">
              Collaborating with a 7-person team collect and analyze image and
              telemetry data from drone in order to achieve autonomous decision
              making
            </li>,
            <li key="ruautonomous-2">
              Used Tensorflow object detection API to create model that locates
              and identifies mission targets from camera feed
            </li>,
            <li key="ruautonomous-3">
              Optimized data communication protocols between drone and ground
              server through data compression
            </li>,
          ],
        },
        {
          organization: "IVI Lab",
          position: "Undergraduate Research Fellow",
          time: "Jan 2019 - Present",
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
    if (this.state.windowWidth <= 600)
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
          </ul>
        </div>

        <div className="timeline-description">
          <span>
            {this.state.events[this.state.currentEvent].position} @{" "}
            {this.state.events[this.state.currentEvent].organization}
          </span>
          <span>{this.state.events[this.state.currentEvent].time}</span>
          <ul>{this.state.events[this.state.currentEvent].description}</ul>
        </div>
      </div>
    );
  }
}

export default Timeline;
