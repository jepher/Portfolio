import React, { Suspense } from "react";
import Particles from "react-particles-js";

import "./styles/App.css";
import "./styles/navbar.css";
import "./styles/drawer.css";
import "./styles/landingPage.css";
import "./styles/about.css";
import "./styles/projects.css";
import "./styles/resume.css";
import "./styles/contact.css";
import "./styles/modal.css";
import "./styles/fonts.css";

import Landing from "./components/landingPage";
const Navbar = React.lazy(() => import("./components/navbar"));
const Drawer = React.lazy(() => import("./components/drawer"));
const About = React.lazy(() => import("./components/about"));
const Projects = React.lazy(() => import("./components/projects"));
const Resume = React.lazy(() => import("./components/resume"));
const Contact = React.lazy(() => import("./components/contact"));

function App() {
  return (
    <div className="content">
      <Particles
        className="particles-background"
        params={{
          particles: {
            number: {
              value: 150,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#4fa9f0", "#3de2f5", "#008cff", "#313ff7"],
            },
            lineLinked: {
              enable: false,
            },
            size: {
              value: 7,
              random: true,
              anim: {
                enable: true,
                size_min: 2,
                speed: 1,
              },
            },
            opacity: {
              random: true,
            },
            move: {
              speed: 1,
              random: true,
            },
          },
        }}
        width="100vw"
        height="100vh"
      ></Particles>
      <div className="gradient-background"></div>

      <Suspense fallback={<div>Loading...</div>}>
        <Navbar></Navbar>
        <Drawer></Drawer>
      </Suspense>

      <Landing></Landing>

      <main className="page-content">
        <Suspense fallback={<div>Loading...</div>}>
          <div id="about">
            <About></About>
          </div>
          <div id="projects">
            <Projects></Projects>
          </div>
          <div id="resume">
            <Resume></Resume>
          </div>
          <div id="contact">
            <Contact></Contact>
          </div>{" "}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
