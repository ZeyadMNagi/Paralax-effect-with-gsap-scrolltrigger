document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  Splitting();
  luxy.init();
  gsap.registerPlugin(ScrollTrigger);

  const gTl = gsap.timeline();
  gTl
    .from(".title .char", {
      duration: 1,
      opacity: 0,
      yPercent: 130,
      stagger: 0.06,
      ease: "back.out",
    })
    .to(
      ".header__img",
      {
        duration: 2,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scale: 1,
        ease: "expo.out",
      },
      "-=1"
    )
    .from(
      ".header__marq",
      {
        duration: 2,
        opacity: 0,
        yPercent: 100,
        ease: "expo.out",
      },
      "-=1.5"
    );

  const gsapSq = gsap.utils.toArray(".section-title__square");
  gsapSq.forEach((gSq) => {
    const rotat = gsap.from(gSq, {
      duration: 3,
      rotation: 720,
    });
    ScrollTrigger.create({
      trigger: gSq,
      animation: rotat,
      start: "top bottom",
      scrub: 1.9,
    });
  });

  function createHeaderAnimations() {
    gsap.to(".title_paralax", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: 1.9,
      },
      yPercent: -150,
    });
    gsap.to(".header .stroke", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: 1.9,
      },
      xPercent: 50,
    });
    gsap.to(".header__img", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: 1.9,
      },
      xPercent: -70,
    });
    gsap.to(".header__img img", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: 1.9,
      },
      scale: 1.3,
    });
    gsap.to(".header__marq-wrapp", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: 1.9,
      },
      xPercent: -50,
    });
    gsap.to(".header__marq-star img", {
      scrollTrigger: {
        trigger: ".header",
        start: "top top",
        scrub: 1.9,
      },
      rotate: -720,
    });
  }
  createHeaderAnimations();

  function createAboutAnimations() {
    gsap.from(".about__img", {
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        scrub: 1.9,
      },
      yPercent: 80,
    });
    gsap.from(".about__img img", {
      scrollTrigger: {
        trigger: ".about",
        start: "top bottom",
        scrub: 1.9,
      },
      scale: 1.6,
    });
    gsap.to(".about__txt", {
      scrollTrigger: {
        trigger: ".about__wrapp",
        start: "top bottom",
        scrub: 1.9,
      },
      yPercent: 50,
    });
  }
  createAboutAnimations();

  function createBenefitsAnimations() {
    gsap.from(".benefits__num", {
      x: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
      scrollTrigger: {
        trigger: ".benefits__list",
        start: "top bottom",
        scrub: 1.9,
      },
    });
  }
  createBenefitsAnimations();

  function createPortfolioAnimations() {
    gsap.from(".work__item, .work__item-num", {
      y: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
      scrollTrigger: {
        trigger: ".work",
        start: "top bottom",
        scrub: 1.9,
      },
    });
    gsap.from(".work__item-img img", {
      scale: 1.6,
      scrollTrigger: {
        trigger: ".work__wrapp",
        start: "top bottom",
        scrub: 1.9,
      },
    });
  }
  createPortfolioAnimations();

  function createServAnimations() {
    gsap.from(".serv__item-arrow", {
      x: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
      scrollTrigger: {
        trigger: ".serv__list",
        start: "top bottom",
        scrub: 1.9,
      },
    });
  }
  createServAnimations();

  function createFooterAnimations() {
    gsap.from(".footer__div span", {
      y: (i, el) => 1 - parseFloat(el.getAttribute("data-speed")),
      opacity: 0,
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1.9,
      },
    });
  }
  createFooterAnimations();
});
