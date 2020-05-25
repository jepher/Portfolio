import React, { Component } from "react";
import Modal from "react-modal";

import dio_img from "../images/projects/dio.png";
import wog_img from "../images/projects/word_of_god.png";
import rain_alert_img from "../images/projects/rain_alert.png";
import traffic_model_img from "../images/projects/ivi_lab.jpg";
import dio_game_1 from "../images/projects/dio_game_1.JPG";
import dio_game_2 from "../images/projects/dio_game_2.JPG";
import wog_game_1 from "../images/projects/wog_game_1.JPG";
import wog_game_2 from "../images/projects/wog_game_2.JPG";
import rain_app_1 from "../images/projects/rain_alert_1.JPG";
import rain_app_2 from "../images/projects/rain_alert_2.JPG";
import traffic_model_1 from "../images/projects/traffic_model.JPG";
import traffic_model_2 from "../images/projects/decision_tree.JPG";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      currentProject: 0,
      projects: [
        {
          caption: "Jojo Game",
          img: dio_img,
          id: "jojo-game",
          header: "Dio's Bizarre Adventure",
          tags: ["Javascript", "Game Development"],
          code: "https://github.com/jepher/jojo-game",
          project: null,
          body: (
            <div className="modal-body-description">
              <p>
                Inspired by the anime Jojo's Bizarre Adventure, Dio's Bizarre
                Adventure is a top down, 2D arcade game focused on the villain
                of the show. The objective is simple: defeat as many enemies
                before you die, and the more enemies you defeat, the higher your
                score.
              </p>
              <img src={dio_game_1} alt="Game Demo 1" />

              <p>
                The game features a wide variety of enemies and even has
                occasional boss fights, and the player has several special
                abilities they can use to help them defeat these enemies.
              </p>
              <img src={dio_game_2} alt="Game Demo 2" />

              <p>
                This game was created in Javascript using the Phaser 3 library.
                I used sprites, images, and audio clips I found online for the
                assets of this game.
              </p>
            </div>
          ),
        },
        {
          caption: "Word of God",
          img: wog_img,
          id: "wog-game",
          header: "Word of God",
          tags: ["Javascript", "Game Development"],
          code: "https://github.com/jepher/word-of-god",
          project: null,
          body: (
            <div className="modal-body-description">
              <p>
                Violence sucks. That's why as head priest of the God of Peace,
                you must set out to fight evil with love. Word of God is a 2D
                adventure game where the player must use their powers to convert
                enemies into disciples of peace.
              </p>
              <img src={wog_game_1} alt="Game Demo 1" />

              <p>
                The game features three levels and a variety of different NPCs.
                Gather enough allies to defeat the final boss.
              </p>
              <img src={wog_game_2} alt="Game Demo 2" />

              <p>
                This game was created in Javascript using the Phaser 3 library.
                The maps were created using MapMaker. I used sprites, images,
                and audio clips I found online for the assets of this game.
              </p>
            </div>
          ),
        },
        {
          caption: "Rain Alert",
          img: rain_alert_img,
          id: "rain-alert",
          header: "Rain Alert",
          tags: ["Java", "Android Studio", "App Development"],
          code: "https://github.com/jepher/rain-alert",
          project: null,
          body: (
            <div className="modal-body-description">
              <p>
                Rain Alert is a simple app that tells you if it will rain later
                in the day. This was my first app and I used this project to get
                my first look into app development.
              </p>
              <img src={rain_app_1} alt="App Demo 1" />

              <p>
                The app sends scheduled alerts that reports and quantifies the
                precipitation for the day based on the user's current location.
              </p>
              <img src={rain_app_2} alt="App Demo 2" />

              <p>
                This app was made for Android using Android Studio. It uses the
                free AccuWeather API to get weather data.
              </p>
            </div>
          ),
        },
        {
          caption: "Traffic Behavior Model",
          img: traffic_model_img,
          id: "traffic-simulator",
          header: "Traffic Behavior Model",
          tags: ["C#", "Unity", "AI"],
          code: "https://github.com/jepher/traffic-behavior-model",
          project: null,
          body: (
            <div className="modal-body-description">
              <p>
                I worked with a post-doctorate researcher in Rutger's IVI Lab to
                created a 3D traffic behavior model in Unity to simulate
                driver-driver and driver-pedestrian interactions, specifically
                pathfinding and collision avoidance behavior.
              </p>
              <img src={traffic_model_1} alt="Traffic Model" />
              <figcaption>Vehicle agents reacting to traffic light</figcaption>

              <p>
                I designed a behavior tree based on a decision tree in one of
                IVI's research papers that describes how a driver that is
                following another car should behave. The model will be used to
                study abnormal behavior such as distracted and impaired driving.
              </p>
              <img src={traffic_model_2} alt="Behavior Tree" />
              <figcaption>
                Behavior tree that controls agent behavior made with xNode
              </figcaption>
            </div>
          ),
        },
      ],
    };
    this.selector = React.createRef();
  }

  onScroll() {
    var projects = this.selector.current.getBoundingClientRect();
    var spotlights = document.querySelectorAll(".spotlight");
    var beams = document.querySelectorAll(".beam-container");
    var textShadow = document.querySelector(
      "#projects-title .section-title-shadow"
    );
    var textGlow = document.querySelector(
      "#projects-title .section-title-glow"
    );
    var text = document.querySelector("#projects-title .section-title-text");

    // scroll into projects section
    if (projects.top <= window.innerHeight * 0.3) {
      spotlights.forEach((light) => {
        light.style.background = "white";
        light.style.boxShadow = "0px 0px 35px 50px rgba(255, 255, 255, 0.4)";
      });

      beams.forEach((beam) => {
        beam.style.opacity = 1;
      });

      text.style.textShadow = "0 0 20px #ff005b";
      text.style.color = "white";
      textShadow.style.opacity = 1;
      textGlow.style.opacity = 0.5;
    }
    // scroll out of projects section
    else {
      spotlights.forEach((light) => {
        light.style.background = "#4a4a4a";
        light.style.boxShadow = "none";
      });

      beams.forEach((beam) => {
        beam.style.opacity = 0;
      });

      text.style.textShadow = "none";
      text.style.color = "#4a4a4a";
      textShadow.style.opacity = 0;
      textGlow.style.opacity = 0;
    }

    // keep spotlights in center of section
    var spotlightContainer = document.querySelector(".spotlight-container");
    if (
      window.innerWidth < 800 &&
      projects.top < 0 &&
      projects.bottom > window.innerHeight * 0.6
    ) {
      spotlightContainer.style.top =
        50 + (-100 * projects.top) / window.innerHeight + "vh";
    } else if (window.innerWidth >= 800) {
      spotlightContainer.style.bottom = "7%";
    }
  }

  addTags(tags) {
    var tagElements = [];
    tags.forEach((tag) => {
      tagElements.push(
        <div className="project-tag" key={tag}>
          {tag}
        </div>
      );
    });
    return tagElements;
  }

  closeModal = () => {
    this.setState(() => {
      return {
        modalOpen: false,
      };
    });
  };

  renderProjectBtns() {
    var projects = [];
    for (let i = 0; i < this.state.projects.length; i++) {
      var project = this.state.projects[i];
      projects.push(
        <div className="project-container" key={project.caption}>
          <button className="project-btn" data-id={i}>
            <img
              className="project-img-fluid"
              src={project.img}
              alt={project.caption}
            />
            <div className="project-caption">{project.caption}</div>
          </button>
        </div>
      );
    }

    return projects;
  }

  renderModalBtns(modal) {
    var buttons = [];
    var codeCaption = modal.code == null ? "Code unavailable" : "View code";
    var codeClassModifier = modal.code == null ? " unavailable" : "";
    buttons.push(
      <button className={"modal-btn" + codeClassModifier} key="view-source-btn">
        <a href={modal.code} rel="noopener noreferrer" target="_blank">
          <i className="fas fa-code" />
        </a>
        <div className="btn-caption">{codeCaption}</div>
      </button>
    );

    var projectCaption =
      modal.project == null ? "Project unavailable" : "View project";
    var projectClassModifier = modal.project == null ? " unavailable" : "";
    buttons.push(
      <button
        className={"modal-btn" + projectClassModifier}
        key="view-project-btn"
      >
        <a href={modal.project} rel="noopener noreferrer" target="_blank">
          <i className="fas fa-external-link-alt" />
        </a>
        <div className="btn-caption">{projectCaption}</div>
      </button>
    );
    return buttons;
  }

  componentDidMount() {
    // lighting effects
    window.addEventListener("scroll", () => {
      this.onScroll();
    });

    // button event listener
    document.querySelectorAll(".project-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setState(() => {
          return {
            modalOpen: true,
            currentProject: btn.getAttribute("data-id"),
          };
        });
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => {
      this.onScroll();
    });
  }

  render() {
    var currentModal = this.state.projects[this.state.currentProject];
    return (
      <div className="projects" id="projects" ref={this.selector}>
        <div className="section-title" id="projects-title">
          <div className="section-title-glow"></div>
          <h1 className="section-title-shadow">Projects</h1>
          <h1 className="section-title-text">Projects</h1>
        </div>
        <div className="projects-grid">{this.renderProjectBtns()}</div>

        <Modal
          id={currentModal.id}
          isOpen={this.state.modalOpen}
          closeTimeoutMS={500}
          onRequestClose={() => this.closeModal()}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 15, 0.5)",
            },
            content: {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: "80vh",
            },
          }}
        >
          <div className="modal-header">
            <button
              className="modal-close-btn"
              onClick={() => {
                this.closeModal();
              }}
            >
              &times;
            </button>

            <h1>{currentModal.header}</h1>

            <div className="project-info">
              <div className="tag-container">
                {this.addTags(currentModal.tags)}
              </div>
              <div className="modal-btn-container">
                {this.renderModalBtns(currentModal)}
              </div>
            </div>
          </div>

          <div className="modal-body">{currentModal.body}</div>
        </Modal>

        <div className="spotlight-container">
          <div className="spotlight" style={{ transform: "rotate(30deg)" }}>
            <div className="beam-container">
              <div className="spotlight-beam-1"></div>
              <div className="spotlight-beam-2"></div>
              <div className="spotlight-beam-3"></div>
            </div>
          </div>

          <div className="spotlight" style={{ transform: "rotate(-30deg)" }}>
            <div className="beam-container">
              <div className="spotlight-beam-1"></div>
              <div className="spotlight-beam-2"></div>
              <div className="spotlight-beam-3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
