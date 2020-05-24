import React, { Component } from "react";
import Modal from "react-modal";

import dio_img from "../images/projects/dio.png";
import dio_game_1 from "../images/projects/dio_game_1.JPG";
import dio_game_2 from "../images/projects/dio_game_2.JPG";
import wog_img from "../images/projects/word_of_god.png";
import wog_game_1 from "../images/projects/wog_game_1.JPG";
import wog_game_2 from "../images/projects/wog_game_2.JPG";
import rain_alert_img from "../images/projects/rain_alert.png";
import rain_app_1 from "../images/projects/rain_alert_1.JPG";
import rain_app_2 from "../images/projects/rain_alert_2.JPG";
import traffic_model_img from "../images/projects/ivi_lab.jpg";
import traffic_model_1 from "../images/projects/traffic_model.JPG";
import traffic_model_2 from "../images/projects/decision_tree.JPG";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: [false, false, false, false, false],
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
    if (
      window.innerWidth < 800 &&
      projects.top < 0 &&
      projects.bottom > window.innerHeight * 0.7
    ) {
      var spotlightContainer = document.querySelector(".spotlight-container");
      spotlightContainer.style.top =
        50 + (-100 * projects.top) / window.innerHeight + "vh";
    }
  }

  onToggleModal = (modalIndex) => {
    this.setState((state) => {
      var list = state.modalOpen;
      list[modalIndex] = !list[modalIndex];
      return {
        modalOpen: list,
      };
    });
  };

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

  componentDidMount() {
    // lighting effects
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
      <div className="projects" ref={this.selector}>
        <div className="section-title" id="projects-title">
          <div className="section-title-glow"></div>
          <h1 className="section-title-shadow">Projects</h1>
          <h1 className="section-title-text">Projects</h1>
        </div>
        <div className="projects-grid">
          {/* Dios Bizarre Adventure */}
          <div className="project-container">
            <button
              className="project-btn"
              onClick={() => {
                this.onToggleModal(0);
              }}
            >
              <div className="img-fluid-container">
                <img
                  className="project-img-fluid"
                  src={dio_img}
                  alt="Jojo Game"
                />
              </div>
              <div className="project-caption">Jojo Game</div>
            </button>
          </div>
          <Modal
            id="jojo-game"
            isOpen={this.state.modalOpen[0]}
            closeTimeoutMS={500}
            onRequestClose={() => this.onToggleModal(0)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 15, 0.5)",
              },
              content: {
                alignContent: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                // minWidth: "400px",
                height: "80vh",
                zIndex: "10",
              },
            }}
          >
            <div className="modal">
              <div className="modal-header">
                <h1>Dio's Bizarre Adventure</h1>
                <button onClick={() => this.onToggleModal(0)}>&times;</button>
                <div className="tag-container">
                  {this.addTags(["Javascript", "Game Development"])}
                </div>
              </div>

              <div className="modal-body">
                <div className="modal-body-description">
                  <p>
                    Inspired by the anime Jojo's Bizarre Adventure, Dio's
                    Bizarre Adventure is a top down, 2D arcade game focused on
                    the villain of the show. The objective is simple: defeat as
                    many enemies before you die, and the more enemies you
                    defeat, the higher your score.
                  </p>
                  <img src={dio_game_1} alt="Game Demo 1" />

                  <p>
                    The game features a wide variety of enemies and even has
                    occasional boss fights, and the player has several special
                    abilities they can use to help them defeat these enemies.
                  </p>
                  <img src={dio_game_2} alt="Game Demo 2" />

                  <p>
                    This game was created in Javascript using the Phaser 3
                    library. I used sprites, images, and audio clips I found
                    online for the assets of this game.
                  </p>
                </div>
              </div>
            </div>
          </Modal>

          {/* Word of God */}
          <div className="project-container">
            <button
              className="project-btn"
              onClick={() => {
                this.onToggleModal(1);
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <img
                  className="project-img-fluid"
                  src={wog_img}
                  alt="Word of God"
                />
              </div>
              <div className="project-caption">Word Of God</div>
            </button>
          </div>
          <Modal
            isOpen={this.state.modalOpen[1]}
            closeTimeoutMS={500}
            onRequestClose={() => this.onToggleModal(1)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 15, 0.5)",
              },
              content: {
                alignContent: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: "800px",
                height: "80vh",
                zIndex: "10",
              },
            }}
          >
            <div className="modal">
              <div className="modal-header">
                <h1>Word of God</h1>
                <button onClick={() => this.onToggleModal(1)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="modal-body-description">
                  <p>
                    Violence sucks. That's why as head priest of the God of
                    Peace, you must set out to fight evil with love. Word of God
                    is a 2D adventure game where the player must use their
                    powers to convert enemies into disciples of peace.
                  </p>
                  <img src={wog_game_1} alt="Game Demo 1" />

                  <p>
                    The game features three levels and a variety of different
                    NPCs. Gather enough allies to defeat the final boss.
                  </p>
                  <img src={wog_game_2} alt="Game Demo 2" />

                  <p>
                    This game was created in Javascript using the Phaser 3
                    library. The maps were created using MapMaker. I used
                    sprites, images, and audio clips I found online for the
                    assets of this game.
                  </p>
                </div>
              </div>
            </div>
          </Modal>

          {/* Rain Alert */}
          <div className="project-container">
            <button
              className="project-btn"
              onClick={() => {
                this.onToggleModal(3);
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <img
                  className="project-img-fluid"
                  src={rain_alert_img}
                  alt="Rain Alert"
                />
              </div>
              <div className="project-caption">Rain Alert</div>
            </button>
          </div>
          <Modal
            isOpen={this.state.modalOpen[3]}
            closeTimeoutMS={500}
            onRequestClose={() => this.onToggleModal(3)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 15, 0.5)",
              },
              content: {
                alignContent: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: "800px",
                height: "80vh",
                zIndex: "10",
              },
            }}
          >
            <div className="modal">
              <div className="modal-header">
                <h1>Rain Alert</h1>
                <button onClick={() => this.onToggleModal(3)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="modal-body-description">
                  <p>
                    Rain Alert is a simple app that tells you if it will rain
                    later in the day. This was my first app and I used this
                    project to get my first look into app development.
                  </p>
                  <img src={rain_app_1} alt="App Demo 1" />

                  <p>
                    The app sends scheduled alerts that reports and quantifies
                    the precipitation for the day based on the user's current
                    location.
                  </p>
                  <img src={rain_app_2} alt="App Demo 2" />

                  <p>
                    This app was made for Android using Android Studio. It uses
                    the free AccuWeather API to get weather data.
                  </p>
                </div>
              </div>
            </div>
          </Modal>

          {/* Traffic Simulator */}
          <div className="project-container">
            <button
              className="project-btn"
              onClick={() => {
                this.onToggleModal(4);
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <img
                  className="project-img-fluid"
                  src={traffic_model_img}
                  alt="IVI Lab"
                />
              </div>
              <div className="project-caption">Traffic Behavior Model</div>
            </button>
          </div>
          <Modal
            isOpen={this.state.modalOpen[4]}
            closeTimeoutMS={500}
            onRequestClose={() => this.onToggleModal(4)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 15, 0.5)",
              },
              content: {
                alignContent: "center",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: "800px",
                height: "80vh",
                zIndex: "10",
              },
            }}
          >
            <div className="modal">
              <div className="modal-header">
                <h1>Traffic Behavior Model</h1>
                <button onClick={() => this.onToggleModal(4)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="modal-body-description">
                  <p>
                    I worked with a post-doctorate researcher in Rutger's IVI
                    Lab to created a 3D traffic behavior model in Unity to
                    simulate driver-driver and driver-pedestrian interactions,
                    specifically pathfinding and collision avoidance behavior.
                  </p>
                  <img src={traffic_model_1} alt="Traffic Model" />
                  <figcaption>
                    Vehicle agents reacting to traffic light
                  </figcaption>

                  <p>
                    I designed a behavior tree based on a decision tree in one
                    of IVI's research papers that describes how a driver that is
                    following another car should behave. The model will be used
                    to study abnormal behavior such as distracted and impaired
                    driving.
                  </p>
                  <img src={traffic_model_2} alt="Behavior Tree" />
                  <figcaption>
                    Behavior tree that controls agent behavior made with xNode
                  </figcaption>
                </div>
              </div>
            </div>
          </Modal>
        </div>
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
