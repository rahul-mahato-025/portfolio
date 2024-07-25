const circle = document.querySelector(".cirlce");

const aboutTextParagraphs = document.querySelectorAll(".about-text p");

const aboutHeadings = document.querySelectorAll(".about-heading h1");

const aboutHeadingDiv = document.querySelector(".about-heading div");

const loaderText = document.querySelector(".loader-container h1");

function loaderAnimation() {
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
          if (progress === 100) clearInterval(interval);
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

  tl.from(".text h1", {
    y: 150,
    opacity: 0,
    duration: 0.2,
    stagger: 0.3,
  });
}

function addSpanToLetters(text) {
  let spanText = "";
  const splittedText = text.split("");
  splittedText.forEach((letter) => {
    spanText += `<span>${letter}</span>`;
  });
  return spanText;
}

function triggerTransformTextAnimation(container, event, text1, text2) {
  const tl = gsap.timeline();

  container.addEventListener(event, function () {
    if (tl.isActive()) return;

    tl.to(text1, {
      opacity: 0,
      duration: 0.02,
      stagger: 0.02,
    });

    tl.to(
      text2,
      {
        opacity: 1,
        duration: 0.02,
        // delay: 0.022,
        stagger: 0.02,
      },
      "<"
    );
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
      start: "top 100%",
      end: "top 20%",
      scrub: 3,
    },
  });

  aboutHeadings.forEach((heading) => {
    heading.innerHTML = addSpanToLetters(heading.textContent);
  });

  triggerTransformTextAnimation(
    aboutHeadingDiv,
    "mouseenter",
    ".about-heading-1 span",
    ".about-heading-2 span"
  );

  triggerTransformTextAnimation(
    aboutHeadingDiv,
    "mouseleave",
    ".about-heading-2 span",
    ".about-heading-1 span"
  );
}

// loaderAnimation();
aboutPageAnimation();
