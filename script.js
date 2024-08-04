const circle = document.querySelector(".cirlce");
const homeTextDiv = document.querySelectorAll(".home-text");
const portfolioText = document.querySelector(".portfolio");
const aboutTextParagraphs = document.querySelectorAll(".about-text p");
const aboutHeadings = document.querySelectorAll(".about-heading h1");
const aboutHeadingDiv = document.querySelector(".about-heading .heading-text");
const projectsHeadingDiv = document.querySelector(".projects-intro");
const projectsHeading = document.querySelector(".projects-intro h1");
const skillsHeadingDiv = document.querySelector(
  ".skills-heading .heading-text"
);
const skillsHeadings = document.querySelectorAll(".skills-heading h1");

const loaderText = document.querySelector(".loader-container h1");

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

function addSpanToLetters(text) {
  let spanText = "";
  const splittedText = text.split("");
  splittedText.forEach((letter) => {
    spanText += `<span>${letter}</span>`;
  });
  return spanText;
}

function textColorChangeAnimation(container, event, element, color) {
  container.addEventListener(event, function () {
    gsap.to(element, {
      color: color,
      duration: 0.1,
      stagger: 0.03,
    });
  });
}

function enableLocomotiveScroll() {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

function loaderAnimation() {
  portfolioText.innerHTML = addSpanToLetters(portfolioText.textContent);
  const tl = gsap.timeline();

  tl.from(".loader-container .circle", {
    scale: 0,
    duration: 5,
    delay: 0.8,
  });

  tl.from(
    ".loader-container h1",
    {
      opacity: 0,
      fontSize: "0vw",
      duration: 2,
      delay: 0.4,
      onStart: () => {
        let progress = 0;

        const interval = setInterval(() => {
          if (progress === 100) {
            clearInterval(interval);
          }

          loaderText.textContent = `${progress++}%`;
        }, 40);
      },
    },
    "<"
  );

  tl.to(".loader-container", {
    opacity: 0,
  });

  tl.to(".home .circle", {
    scale: 0,
    duration: 1,
  });

  tl.to(".loader-container, .home .circle", {
    display: "none",
  });

  tl.from(".socials .icon", {
    opacity: 0,
    duration: 0.2,
    stagger: 0.2,
  });

  tl.from(".home-text h1", {
    y: 150,
    opacity: 0,
    duration: 0.2,
    stagger: 0.3,
  });

  tl.from(".about", {
    opacity: 0,
    duration: 1,
  });

  tl.to(".portfolio span", {
    color: "#ff7d7b",
    duration: 0.5,
    repeat: -1,
    stagger: 0.02,
    ease: Power2.easeInOut,
    yoyo: true,
  });
}

function aboutPageAnimation() {
  aboutTextParagraphs.forEach((paragraph) => {
    paragraph.innerHTML = addSpanToLetters(paragraph.textContent);
  });

  gsap.to(".about-text span", {
    color: "#fefefe",
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".about-text span",
      scroller: "main",
      start: "top 100%",
      end: "top 20%",
      scrub: 2,
    },
  });

  aboutHeadings.forEach((heading) => {
    heading.innerHTML = addSpanToLetters(heading.textContent);
  });

  textColorChangeAnimation(
    aboutHeadingDiv,
    "mouseenter",
    ".about-heading-1 span",
    "#ff7d7b"
  );

  textColorChangeAnimation(
    aboutHeadingDiv,
    "mouseleave",
    ".about-heading-1 span",
    "#fefefe"
  );
}

function projectsSectionAnimation() {
  projectsHeading.innerHTML = addSpanToLetters(projectsHeading.textContent);

  projectsHeading.addEventListener("mouseenter", function () {
    gsap.to(".projects-intro h1 span", {
      fontSize: "6vw",
      duration: 0.2,
      stagger: 0.03,
    });
  });

  projectsHeading.addEventListener("mouseleave", function () {
    gsap.to(".projects-intro h1 span", {
      fontSize: "5vw",
      duration: 0.2,
      stagger: 0.03,
    });
  });

  gsap.to(".scroll-item", {
    transform: "translateX(-100%)",
    scrollTrigger: {
      trigger: ".projects",
      scroller: "main",
      pin: true,
      scrub: 2,
      start: "top 0%",
      end: "top -100%",
      // pinSpacing: false,
    },
  });
}

function skillsAnimation() {
  const tl = gsap.timeline();

  tl.from(".skill-item", {
    opacity: 0,
    duration: 2,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".skills-item",
      scroller: "main",
      start: "top 50%",
      end: "top 20%",
      scrub: 2,
    },
  });

  tl.from(".skill-item .underline", {
    width: 0,
    duration: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".skills",
      scroller: "main",
      start: "top 100%",
      end: "top 20%",
      // markers: true,
      scrub: 2,
    },
  });

  skillsHeadings.forEach((skillsHeading) => {
    skillsHeading.innerHTML = addSpanToLetters(skillsHeading.textContent);
  });

  textColorChangeAnimation(
    skillsHeadingDiv,
    "mouseenter",
    ".skills-heading-1 span",
    "#ff7d7b"
  );

  textColorChangeAnimation(
    skillsHeadingDiv,
    "mouseleave",
    ".skills-heading-1 span",
    "#fefefe"
  );
}

enableLocomotiveScroll();
loaderAnimation();
aboutPageAnimation();
projectsSectionAnimation();
skillsAnimation();
