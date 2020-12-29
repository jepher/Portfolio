import React, { Suspense } from "react";
import Particles from "react-particles-js";

import "./styles/App.css";
import "./styles/logo.css";
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
  var particle1 = getComputedStyle(document.documentElement).getPropertyValue(
    "--particle1"
  ).trim();
  var particle2 = getComputedStyle(document.documentElement).getPropertyValue(
    "--particle4"
  ).trim();
  var particle3 = getComputedStyle(document.documentElement).getPropertyValue(
    "--particle3"
  ).trim();
  var particle4 = getComputedStyle(document.documentElement).getPropertyValue(
    "--particle4"
  ).trim();
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
              value: [particle1, particle2, particle3, particle4]
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

      <div id="landing">
        <Landing></Landing>
      </div>

      <main className="page-content">
        <Suspense fallback={<div>Loading...</div>}>
          <About></About>
          <Projects></Projects>
          <Resume></Resume>
          <Contact></Contact>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
