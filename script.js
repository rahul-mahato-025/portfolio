const circle = document.querySelector(".cirlce");

const loaderText = document.querySelector(".loader-container h1");

const loaderContainerClass = ".loader-container";

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

loaderAnimation();
