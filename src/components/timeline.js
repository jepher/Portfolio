import React, { Component } from "react";
import resume from "../files/resume.pdf";
import { pdfjs } from "react-pdf";

// stuff I can't fit on my resume
const unlisted_events = [
  {
    organization: "NYU CREATE Lab",
    position: "Project Leader",
    time: "Aug 2019 - Sep 2019",
    description: [
      <li key="create-1">
        Led a 3-person team to design a 2D platform game in Javascript
      </li>,
      <li key="create-2">
        Wrote storyline, sourced characters and maps, implemented game
        loop with the Phaser library
      </li>,
      <li key="create-3">
        Received and incorporated feedback from professional game developers at the CREATE Lab
      </li>,
    ],
  }
]

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 0,
      currentEvent: 0,
      events: []
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  async parseResume(){
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
    const doc = await pdfjs.getDocument(resume).promise;
    const page = await doc.getPage(1);
    const content = await page.getTextContent();
    var parsing = false;
    var experienceStr = "";
    for(var item of content.items) {
      if(item.str === "PROJECTS")
        break;
      if(parsing){
        experienceStr += item.str;
        if(item.str === '' && item.hasEOL)
        experienceStr += "\n"
      }
      if(item.str === "EXPERIENCE")
        parsing = true;
    }

    var lines = experienceStr.split('\n');
    var events = [];
    var currentExperience = null;
    var currentBullet = "";
    for(var line of lines) {
      // identify new event by matching a time period regex (ex: Jan xxxx - Dec xxxx)
      var duration = line.match(/\w{3}\s\d{4}\s?–\s?(\w{3}\s\d{4}||Present)$/);
      if(duration){
        if(currentExperience)
          events.push(currentExperience);
        currentExperience = {description: []};
        currentExperience.time = duration[0];
        currentExperience.organization = line.substring(0, line.indexOf(","));
        line = line.substring(line.indexOf(",") + 2);
        currentExperience.position = line.replace(duration[0], '');
      }
      // still parsing description of current event
      else{
        // new bullet
        if(line.match(/^•/)){
          if(currentBullet){
            currentExperience.description.push(
            <li key={["timeline-", events.length, currentExperience.description.length].join("-")}>
              {currentBullet}
            </li>);
          }
          currentBullet = line.substring(2);
        }
        else
          currentBullet += " " + line
      }
    }
    if(currentBullet){
      currentExperience.description.push(
      <li key={["timeline-", events.length, currentExperience.description.length].join("-")}>
        {currentBullet}
      </li>);
    }
    if(currentExperience)
      events.push(currentExperience);
    return events;
  }

  async componentDidMount() {
    var events = await this.parseResume();
    this.setState({ events: events.concat(unlisted_events)});
    
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
            {this.state.events.map((event, i) => 
              (<li key={"event-" + i}>
                <button className={i === 0 ? "active" : null} data-id={i}>
                  {event.organization}
                </button>
              </li>)
            )}
          </ul>
        </div>

        {currentEvent && <div className="timeline-description">
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
        }
      </div>
    );
  }
}

export default Timeline;
