import React, { Component } from "react";
import anime from "animejs";

class Contact extends Component {
  componentDidMount() {
    anime.set(".contact-btn-ripple", {
      translateX: "-50%",
      translateY: "-50%",
    });
    anime({
      targets: document.querySelectorAll(".contact-btn-ripple"),
      duration: 1500,
      scale: "1.5",
      opacity: "0",
      delay: anime.stagger(250),
      endDelay: 2000,
      easing: "easeOutQuad",
      loop: true,
    });
  }

  render() {
    return (
      <div className="contact" id="contact">
        <h2>Thanks for visiting!</h2>
        <button className="contact-btn" aria-label="Send Email">
          <div className="contact-btn-ripple"></div>
          <div className="contact-btn-ripple"></div>
          <a href="mailto:jeffreyyang217@gmail.com"> </a>
          <div className="contact-icon">
            <div className="contact-icon-line before"></div>
            <div className="contact-icon-line after"></div>
          </div>
        </button>
        <h3>Leave a message</h3>

        <div className="social-container">
          <h3>Get in touch</h3>
          <div className="social-links">
            {/*LinkedIn*/}
            <button>
              <a
                href="https://www.linkedin.com/in/jeffrey-yang-596471198/"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
              </a>
              <i className="fab fa-linkedin-in text-shadow linkedin" />
              <i className="fab fa-linkedin-in transparent-text linkedin" />
              <div className="social-caption">jyang217</div>
            </button>

            {/*GitHub*/}
            <button>
              <a
                href="https://github.com/jepher"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
              </a>
              <i className="fab fa-github-square text-shadow github" />
              <i className="fab fa-github-square  transparent-text github" />
              <div className="social-caption">Jepher</div>
            </button>

            {/*Facebook*/}
            <button>
              <a
                href="https://www.facebook.com/jephayy"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
              </a>
              <i className="fab fa-facebook-square text-shadow facebook" />
              <i className="fab fa-facebook-square transparent-text facebook" />
              <div className="social-caption">jephayy</div>
            </button>

            {/*Instagram*/}
            <button>
              <a
                href="https://www.instagram.com/jephayy/"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
              </a>
              <i className="fab fa-instagram text-shadow instagram" />
              <i className="fab fa-instagram transparent-text instagram" />
              <div className="social-caption">jephayy</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
