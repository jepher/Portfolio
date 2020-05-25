import React, { Component } from "react";

class Skillset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressBarOpen: false,
      currentSkill: 0,
    };
  }

  onClick(btn) {
    var btnId = btn.getAttribute("data-id");
    var sectionId = this.props.title.toLowerCase().split(" ").join("_");
    document
      .querySelectorAll("#" + sectionId + " .progress-bar-skill")
      .forEach((skill) => {
        if (
          skill.getAttribute("data-id") !== this.state.currentSkill &&
          skill.getAttribute("data-id") !== btnId
        )
          skill.style.opacity = 0;
        else skill.style.opacity = 1;
      });

    this.setState((state) => {
      var toggleOpen = state.progressBarOpen;
      if (!state.progressBarOpen) toggleOpen = true;
      else {
        if (state.currentSkill === btnId) {
          toggleOpen = !toggleOpen;
        }
      }

      return {
        progressBarOpen: toggleOpen,
        currentSkill: btnId,
      };
    });

    // toggle overlay
    document
      .querySelectorAll("#" + sectionId + " .skill-btn-overlay")
      .forEach((overlay) => {
        overlay.classList.remove("active");
      });
    if (this.state.progressBarOpen) btn.childNodes[0].classList.add("active");
  }

  renderButtons() {
    var buttons = [];
    for (let i = 0; i < this.props.buttons.length; i++) {
      let btn = this.props.buttons[i];
      buttons.push(
        <button className="skill-btn" data-id={i} key={i}>
          <div className="skill-btn-overlay" />
          <img src={btn[0]} alt={btn[1]} />
        </button>
      );
    }
    return buttons;
  }

  renderSkills() {
    var skills = [];
    for (let i = 0; i < this.props.skills.length; i++) {
      let skill = this.props.skills[i];
      var proficiency = skill[1];
      var proficiencyDescription = "";
      if (proficiency < 40) proficiencyDescription = "Familiar";
      else if (proficiency < 80) proficiencyDescription = "Proficient";
      else proficiencyDescription = "Experienced";

      skills.push(
        <div
          className={
            "progress-bar-skill " + proficiencyDescription.toLowerCase()
          }
          data-id={i}
          key={skill}
          style={{ width: 100 / this.props.skills.length + "%" }}
        >
          <h4>{skill[0]}</h4>
          <div className="progress-bar">
            <div
              className="progress-bar-done"
              style={{ width: proficiency + "%" }}
            >
              {proficiencyDescription}
            </div>
          </div>
        </div>
      );
    }

    return skills;
  }

  componentDidMount() {
    var sectionId = this.props.title.toLowerCase().split(" ").join("_");
    document
      .querySelectorAll("#" + sectionId + " .skill-btn")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          this.onClick(btn);
        });
      });
  }

  render() {
    var sectionId = this.props.title.toLowerCase().split(" ").join("_");
    var height = 0;
    if (this.state.progressBarOpen) height = 10;
    else height = 0;

    return (
      <div className="skillset" id={sectionId}>
        <div className="skillset-title">{this.props.title}</div>
        <div className="skill-btn-grid">{this.renderButtons()}</div>
        <div
          className="progress-bar-container"
          style={{ height: height + "vh" }}
        >
          <div className="progress-bar-container-inner">
            <div
              className="progress-bar-slider"
              style={{
                width: this.props.skills.length * 100 + "%",
                transform:
                  "translateX(" +
                  this.state.currentSkill * (-100 / this.props.skills.length) +
                  "%)",
              }}
            >
              {this.renderSkills()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skillset;
