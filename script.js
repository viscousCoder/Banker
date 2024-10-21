"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const buttonScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//for smooth scrolling
buttonScroll.addEventListener("click", function (e) {
  const scroll1 = section1.getBoundingClientRect();
  //for simple
  //   window.scrollTo(
  //     scroll1.left + window.pageXOffset,
  //     scroll1.top + window.pageYOffset,
  //   );

  //second method using smooth property
  //   window.scrollTo({
  //     left: scroll1.left + window.pageXOffset,
  //     top: scroll1.top + window.pageYOffset,
  //     behavior: "smooth",
  //   });
  section1.scrollIntoView({ behavior: "smooth" });
});

//for navlink smooth flow
document.querySelector(".nav__links").addEventListener("click", function (e) {
  // document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//tabbed component
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabContent = document.querySelectorAll(".operations__content");
//for selecting particular button
tabContainer.addEventListener("click", function (e) {
  const clickedButton = e.target.closest(".operations__tab");
  // console.log(clickedButton);
  if (!clickedButton) return;
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clickedButton.classList.add("operations__tab--active");
  tabContent.forEach((e) => e.classList.remove("operations__content--active"));

  //to see the content
  // console.log(clickedButton.dataset.tab);
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add("operations__content--active");
});

//navbar fading
const nav = document.querySelector(".nav");

const handleHover = function (e) {
  // console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    // console.log(e.target.classList);
    const link = e.target;
    // console.log(link);
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    // console.log(siblings,logo);
    siblings.forEach((el) => {
      // console.log(link, "this", el);
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//header
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const sticky = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.isIntersecting);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//section reveal

const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//loading images lazy-laoding

const targetImage = document.querySelectorAll("img[data-src]");
const loadingImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

targetImage.forEach((img) => imageObserver.observe(img));

//slider function
// const slider = function () {
//   const slides = document.querySelectorAll(".slide");
//   const btnLeft = document.querySelector(".slider__btn--left");
//   const btnRight = document.querySelector(".slider__btn--right");
//   const dotContainer = document.querySelector(".dots");

//   let curSlide = 0;
//   const maxSlide = slides.length;

//   // Functions
//   const createDots = function () {
//     slides.forEach(function (_, i) {
//       dotContainer.insertAdjacentHTML(
//         "beforeend",
//         `<button class="dots__dot" data-slide="${i}"></button>`
//       );
//     });
//   };

//   const activateDot = function (slide) {
//     document
//       .querySelectorAll(".dots__dot")
//       .forEach((dot) => dot.classList.remove("dots__dot--active"));

//     document
//       .querySelector(`.dots__dot[data-slide="${slide}"]`)
//       .classList.add("dots__dot--active");
//   };

//   const goToSlide = function (slide) {
//     slides.forEach(
//       (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//     );
//   };

//   // Next slide
//   const nextSlide = function () {
//     if (curSlide === maxSlide - 1) {
//       curSlide = 0;
//     } else {
//       curSlide++;
//     }

//     goToSlide(curSlide);
//     activateDot(curSlide);
//   };

//   const prevSlide = function () {
//     if (curSlide === 0) {
//       curSlide = maxSlide - 1;
//     } else {
//       curSlide--;
//     }
//     goToSlide(curSlide);
//     activateDot(curSlide);
//   };

//   const init = function () {
//     goToSlide(0);
//     createDots();

//     activateDot(0);
//   };
//   init();

//   // Event handlers
//   btnRight.addEventListener("click", nextSlide);
//   btnLeft.addEventListener("click", prevSlide);

//   document.addEventListener("keydown", function (e) {
//     if (e.key === "ArrowLeft") prevSlide();
//     e.key === "ArrowRight" && nextSlide();
//   });

//   dotContainer.addEventListener("click", function (e) {
//     if (e.target.classList.contains("dots__dot")) {
//       const { slide } = e.target.dataset;
//       goToSlide(slide);
//       activateDot(slide);
//     }
//   });
// };
// slider();

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let currentSlide = 0;
  const maxSlide = slides.length;

  //create dots
  const createsDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  //slide function
  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };

  //previous slide
  const previousSlide = function () {
    if (currentSlide == 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };

  const initial = function () {
    gotoSlide(0);
    createsDots();
    activateDot(0);
  };
  initial();

  //event button
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") previousSlide();
    e.key === "ArrowRight" && nextSlide();
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
