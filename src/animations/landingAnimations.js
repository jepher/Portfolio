import anime from "animejs";

var Circle = function (opts) {
  extend(this, opts);
};

var Rectangle = function (opts) {
  extend(this, opts);
};

function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

Circle.prototype.draw = function () {
  this.ctx.globalAlpha = this.opacity || 1;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    this.ctx.strokeStyle = this.stroke.color;
    this.ctx.lineWidth = this.stroke.width;
    this.ctx.stroke();
  }
  if (this.fill) {
    this.ctx.fillStyle = this.fill;
    this.ctx.fill();
  }

  this.ctx.closePath();
  this.ctx.globalAlpha = 1;
};

Rectangle.prototype.draw = function () {
  this.ctx.globalAlpha = this.opacity || 1;
  this.ctx.beginPath();
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate((this.degrees * Math.PI) / 180);
  this.ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
  if (this.stroke) {
    this.ctx.strokeStyle = this.stroke.color;
    this.ctx.lineWidth = this.stroke.width;
    this.ctx.stroke();
  }
  if (this.fill) {
    this.ctx.fillStyle = this.fill;
    this.ctx.fill();
  }

  this.ctx.closePath();
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  this.ctx.globalAlpha = 1;
};

function splash() {
  var container = document.getElementById("animation-container");
  var c1 = document.getElementById("c1");
  var ctx1 = c1.getContext("2d");
  var c2 = document.getElementById("c2");
  var ctx2 = c2.getContext("2d");
  var cW = c1.width;
  var cH = c1.height;
  var canvasses = [ctx1, ctx2];
  var animationColors = [
    ["#57cfff", "#0f73f5", "#0026ff"],
    ["#ff6445", "#f50f0f", "#c21717"],
  ];
  var bgColor = ["black", "black"];
  var targetR = Math.sqrt(Math.pow(cW, 2) + Math.pow(cH / 2, 2));
  var rippleSize = targetR * 0.3;
  var particleSpread = 1.5 * rippleSize;

  function startAnimations(animsIndex) {
    var ctx = canvasses[animsIndex];
    var colors = animationColors[animsIndex];

    var ball = new Circle({
      x: cW / 2 + (Math.pow(-1, animsIndex + 1) * cW) / 2,
      y: cH / 2,
      r: 100,
      fill: colors[0],
      ctx: ctx,
    });
    var ballAnimation = anime({
      targets: ball,
      duration: 1000,
      easing: "easeInCirc",
      x: cW / 2 + (Math.pow(-1, animsIndex) * cW) / 2,
      y: cH / 2,
      complete: function () {
        explosionAnimation(animsIndex, colors, ctx);
      },
      update: () => {
        ctx.fillStyle = bgColor[animsIndex];
        ctx.fillRect(0, 0, cW, cH);
        ballAnimation.animatables.forEach(function (animatable) {
          animatable.target.draw();
        });
      },
    });
  }

  function explosionAnimation(animsIndex, colors, ctx) {
    var pageFill = new Circle({
      x: cW / 2 + (Math.pow(-1, animsIndex) * cW) / 2,
      y: cH / 2,
      r: 100,
      fill: colors[0],
      ctx: ctx,
    });
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration: 1700,
      easing: "easeOutQuint",
    });

    var ripple = new Circle({
      x: cW / 2 + (Math.pow(-1, animsIndex) * cW) / 2,
      y: cH / 2,
      r: 0,
      fill: colors[1],
      opacity: 1,
      ctx: ctx,
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 1700,
      complete: () => {},
    });

    var particles = [];
    for (var j = 0; j < 36; j++) {
      var particle = new Circle({
        x: cW / 2 + (Math.pow(-1, animsIndex) * cW) / 2,
        y: cH / 2,
        fill: colors[2],
        r: anime.random(40, 70),
        ctx: ctx,
      });
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function (particle) {
        return (
          particle.x +
          Math.pow(-1, animsIndex + 1) * anime.random(0, particleSpread)
        );
      },
      y: function (particle) {
        return particle.y + anime.random(particleSpread, -particleSpread);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1500, 1700),
    });

    anime({
      duration: 1700,
      update: () => {
        ctx.fillStyle = bgColor[animsIndex];
        ctx.fillRect(0, 0, cW, cH);
        if (!fillAnimation.completed) {
          fillAnimation.animatables.forEach(function (animatable) {
            animatable.target.draw();
          });
        }
        if (rippleAnimation.progress < 99) {
          rippleAnimation.animatables.forEach(function (animatable) {
            animatable.target.draw();
          });
        }
        if (!particlesAnimation.completed) {
          particlesAnimation.animatables.forEach(function (animatable) {
            animatable.target.draw();
          });
        }
      },
      complete: function () {
        bgColor[animsIndex] = pageFill.fill;
        ctx.fillStyle = bgColor[animsIndex];
        ctx.fillRect(0, 0, cW, cH);
        container.style.opacity = 0;
        c1.style.opacity = 0;
        c2.style.opacity = 0;
        assemblePage();
      },
    });
  }

  for (var i = 0; i < 2; i++) startAnimations(i);
}

function splashMobile() {
  var container = document.getElementById("animation-container");
  var c = document.getElementById("c1");
  var ctx = c.getContext("2d");
  var cW = c.width;
  var cH = c.height;
  var animationColors = ["#57cfff", "#0f73f5", "#0026ff"];
  var bgColor = "black";
  var targetR = Math.sqrt(Math.pow(cW, 2) + Math.pow(cH / 2, 2));
  var rippleSize = targetR * 0.3;
  var particleSpread = 1.5 * rippleSize;

  function startAnimation() {
    var ball = new Circle({
      x: cW / 2,
      y: 0,
      r: 80,
      fill: animationColors[0],
      ctx: ctx,
    });
    var ballAnimation = anime({
      targets: ball,
      duration: 1000,
      easing: "easeInCirc",
      x: cW / 2,
      y: cH / 2,
      complete: function () {
        explosionAnimation();
      },
      update: () => {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, cW, cH);
        ballAnimation.animatables.forEach(function (animatable) {
          animatable.target.draw();
        });
      },
    });
  }

  function explosionAnimation() {
    var pageFill = new Circle({
      x: cW / 2,
      y: cH / 2,
      r: 100,
      fill: animationColors[0],
      ctx: ctx,
    });
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration: 1700,
      easing: "easeOutQuint",
    });

    var ripple = new Circle({
      x: cW / 2,
      y: cH / 2,
      r: 0,
      fill: animationColors[1],
      opacity: 1,
      ctx: ctx,
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 1700,
      complete: () => {},
    });

    var particles = [];
    for (var j = 0; j < 72; j++) {
      var particle = new Circle({
        x: cW / 2,
        y: cH / 2,
        fill: animationColors[2],
        r: anime.random(40, 70),
        ctx: ctx,
      });
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function (particle) {
        return particle.x + anime.random(-particleSpread, particleSpread);
      },
      y: function (particle) {
        return particle.y + anime.random(-particleSpread, particleSpread);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1500, 1700),
    });

    anime({
      duration: 1700,
      update: () => {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, cW, cH);
        if (!fillAnimation.completed) {
          fillAnimation.animatables.forEach(function (animatable) {
            animatable.target.draw();
          });
        }
        if (rippleAnimation.progress < 99) {
          rippleAnimation.animatables.forEach(function (animatable) {
            animatable.target.draw();
          });
        }
        if (!particlesAnimation.completed) {
          particlesAnimation.animatables.forEach(function (animatable) {
            animatable.target.draw();
          });
        }
      },
      complete: function () {
        bgColor = pageFill.fill;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, cW, cH);
        container.style.opacity = 0;
        c.style.opacity = 0;
        assemblePage();
      },
    });
  }

  startAnimation();
}

function assemblePage() {
  var timeline = anime.timeline({
    easing: "easeInQuart",
  });

  // extend out page
  document.querySelector(".page-content").style.maxHeight = "10000px";
  document.querySelector(".page-content").style.overflow = "unset";

  timeline
    // fade in greeting text
    .add({
      targets: document.getElementById("greeting"),
      opacity: 1,
      duration: 1000,
    })

    // retract drawer
    .add(
      {
        targets: ".welcome-drawer",
        width: "25vw",
        easing: "easeOutBounce",
        duration: 2000,
        complete: () => {
          document.querySelector(".gradient-background").style.backgroundColor =
            "#05022b";
          document.querySelector(".particles-background").style.opacity = 1;
        },
      },
      "-=1000"
    );
  // slide in avatar
  anime.set(".avatar", {
    translateX: "-20%",
    translateY: "100%",
  });
  timeline
    .add(
      {
        targets: ".avatar",
        translateY: "30%",
        duration: 2000,
        easing: "easeOutQuart",
      },
      "-=1500"
    )
    // fade in introduction text
    .add(
      {
        targets: document.getElementById("introduction"),
        opacity: 1,
        duration: 1500,
      },
      "-=2000"
    );

  // slide in buttons
  anime.set(".menu-btn", {
    translateX: "100%",
  });
  anime.set(".welcome-drawer button", {
    translateX: "400%",
  });
  timeline
    .add(
      {
        targets: ".welcome-drawer button",
        translateX: "0",
        duration: 1500,
        easing: "easeOutBounce",
        delay: anime.stagger(500),
        complete: () => {
          var buttons = document.querySelectorAll(".welcome-drawer button");
          buttons.forEach((btn) => {
            btn.style.pointerEvents = "all";
          });
        },
      },
      "-=1000"
    )
    .add(
      {
        targets: ".menu-btn",
        translateX: "0",
        duration: 500,
        easing: "easeOutQuad",
      },
      "-=1500"
    );

  // hovering ball
  anime({
    targets: ".ball",
    duration: 3000,
    loop: true,
    easing: "easeInOutQuad",
    keyframes: [{ translateY: "-20px" }, { translateY: "0" }],
  });
  // revolve();
}

function handleMouseOver(index, buttonClicked) {
  var button = document.querySelector("#container_" + index + " button");
  var image = document.querySelector("#container_" + index + " img");

  if (!buttonClicked) {
    anime({
      targets: document.getElementById("arm1"),
      duration: 200,
      rotate: "60deg",
      easing: "easeInQuad",
    });

    anime({
      targets: ".ball-wrapper",
      opacity: 1,
      easing: "easeInQuad",
      duration: 300,
      begin: () => {
        document.getElementById("ball-wrapper").style.transform =
          "translateX(0)";
      },
    });

    anime({
      targets: button,
      scale: 1.6,
      duration: 300,
      easing: "easeOutBounce",
    });
    anime.set(image, {
      translateX: "300%",
      opacity: 1,
    });
    anime({
      targets: image,
      translateX: "0",
      duration: 300,
      easing: "easeInQuad",
    });
  }
}

function handleMouseOut(index, buttonClicked) {
  var button = document.querySelector("#container_" + index + " button");
  var image = document.querySelector("#container_" + index + " img");

  if (!buttonClicked) {
    anime({
      targets: ".ball-wrapper",
      opacity: 0,
      easing: "easeInQuad",
      duration: 300,
      begin: () => {
        document.getElementById("ball-wrapper").style.transform =
          "translateX(0)";
      },
    });
    anime({
      targets: ".arm1",
      duration: 200,
      rotate: "0",
      easing: "easeInQuad",
    });

    anime({
      targets: image,
      translateX: "300%",
      duration: 300,
      easing: "easeInQuad",
    });
  }

  anime({
    targets: button,
    scale: 1,
    duration: 500,
    easing: "easeOutBounce",
  });
}

function handleClick(index, buttonClicked) {
  if (!buttonClicked) {
    var button = document.querySelector("#container_" + index + " button");
    var image = document.querySelector("#container_" + index + " img");
    var canvas = document.querySelector("#container_" + index + " canvas");

    // animate arm
    anime.set(".arm2", { rotateY: "90deg" });
    anime
      .timeline({ duration: 100 })
      .add({
        targets: document.getElementById("arm1"),
        rotate: "60deg",
        easing: "easeInQuad",
      })
      .add(
        {
          targets: ".ball-wrapper",
          opacity: 1,
          easing: "easeInQuad",
          begin: () => {
            document.getElementById("ball-wrapper").style.transform =
              "translateX(0)";
          },
        },
        "-=100"
      )
      .add({
        targets: ".arm1",
        easing: "easeInQuad",
        rotateY: "90deg",
        begin: () => {
          document.getElementById("arm1").style.transform = "rotate(60deg)";
        },
      })
      .add({
        targets: ".arm2",
        easing: "easeOutQuad",
        rotateY: "0deg",
        begin: () => {
          document.getElementById("arm1").style.transform = "rotateY(90deg)";
        },
      })
      .add(
        {
          targets: ".arm2",
          easing: "easeInQuad",
          rotateY: "90deg",
        },
        "+=500"
      )
      .add({
        targets: ".arm1",
        easing: "easeOutQuad",
        rotateY: "0deg",
        rotate: "0deg",
      });

    // calculate ball translate
    var buttonData = button.getBoundingClientRect();
    var ballData = document
      .getElementById("ball-wrapper")
      .getBoundingClientRect();
    var translateX =
      buttonData["x"] -
      ballData["x"] +
      buttonData["width"] / 2 -
      ballData["width"] / 4;
    var translateY = buttonData["y"] - ballData["y"] + buttonData["height"] / 2;

    // animate ball
    anime({
      targets: ".ball-wrapper",
      duration: 300,
      easing: "easeInQuad",
      translateX: translateX + "px",
      translateY: translateY + "px",
      begin: () => {
        document.getElementById("ball-wrapper").style.transform =
          "translate(0)";
      },
      complete: () => {
        // fade image
        anime({
          targets: image,
          opacity: 0,
          easing: "easeOutQuad",
          duration: 1000,
          complete: () => (image.style.transform = "translateX(300%)"),
        });

        // reset button size
        anime({
          targets: button,
          scale: 1,
          duration: 500,
          easing: "easeOutBounce",
        });

        // animate explosion
        var ctx = canvas.getContext("2d");
        var rays = [];
        var numRays = 11;
        for (var i = 0; i < numRays; i++) {
          var ray = new Rectangle({
            x: canvas.width / 2,
            y: canvas.height / 2,
            degrees: (i * 360) / numRays,
            width: 5,
            height: 0,
            fill: "white",
            opacity: 0.4,
            ctx: ctx,
          });
          rays.push(ray);
        }
        var raysAnimation = anime({
          targets: rays,
          opacity: 0,
          height: 400,
          easing: "easeOutExpo",
          duration: 1000,
        });

        var ripple = new Circle({
          x: canvas.width / 2,
          y: canvas.height / 2,
          r: 0,
          fill: "white",
          opacity: 0.4,
          ctx: ctx,
        });
        var rippleAnimation = anime({
          targets: ripple,
          r: 200,
          opacity: 0,
          easing: "easeOutExpo",
          duration: 1000,
        });

        var particles = [];
        for (var j = 0; j < 50; j++) {
          var particle = new Circle({
            x: canvas.width / 2,
            y: canvas.height / 2,
            fill: "white",
            opacity: 0.6,
            r: anime.random(20, 25),
            ctx: ctx,
          });
          particles.push(particle);
        }
        var particlesAnimation = anime({
          targets: particles,
          x: function (particle) {
            return (
              particle.x +
              anime.random(
                -canvas.width / 2 + particle.r,
                canvas.width / 2 - particle.r
              )
            );
          },
          y: function (particle) {
            return (
              particle.y +
              anime.random(
                -canvas.height / 2 + particle.r,
                canvas.height / 2 - particle.r
              )
            );
          },
          r: 0,
          easing: "easeOutExpo",
          duration: anime.random(1000, 1500),
        });

        anime({
          duration: 1500,
          update: () => {
            ctx.fillStyle = "#ff6445";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            if (raysAnimation.progress < 99) {
              raysAnimation.animatables.forEach(function (animatable) {
                animatable.target.draw();
              });
            }
            if (rippleAnimation.progress < 99) {
              rippleAnimation.animatables.forEach(function (animatable) {
                animatable.target.draw();
              });
            }
            if (!particlesAnimation.completed) {
              particlesAnimation.animatables.forEach(function (animatable) {
                animatable.target.draw();
              });
            }
          },
        });

        // reset ball position
        document.getElementById("ball-wrapper").style.opacity = "0";
        document.getElementById("ball-wrapper").style.transform =
          "translate(0)";
      },
    });
  }
}

const animations = {
  splash,
  splashMobile,
  assemblePage,
  handleMouseOver,
  handleMouseOut,
  handleClick,
};
export default animations;
