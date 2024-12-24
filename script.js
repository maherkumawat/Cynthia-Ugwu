gsap.to(".boundingelem", {
  y: 0,
  duration: 1,
  ease: "power4.out",
  stagger: 0.2,
});

var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();
// firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

var footmouenter = document.querySelector("footerright", function () {});

var menu = document.querySelector("#nav h4");

// Toggle menu items on click
menu.addEventListener("click", function () {
  menu.innerHTML = `
    <ul>
      <li>Work</li>
      <li>Playground</li>
      <li>Contact</li>
    </ul>
  `;


  const style = document.createElement("style");
  style.innerHTML = `
    ul {
      display: flex;
      list-style: none;
      gap: 2vw;
      padding: 0;
      margin: 0;
    }

    ul li {
      position: relative; /* Required for pseudo-element positioning */
      margin: 5px 0;
      cursor: pointer;
      font-size: 16px;
      padding-bottom: 5px; /* Add some space for the underline */
    }

    /* Underline effect for each menu item */
ul li::after {
      content: "";
      position: absolute;
      bottom: 0; /* Position at the bottom */
      left: 0;
      width: 0%; /* Start with no underline */
      height: 2px; /* Thickness of the underline */
      background-color: #fff; /* Underline color */
      transition: width 0.4s ease; /* Smooth transition effect */
    }

    /* Hover effect for each menu item */
    ul li:hover::after {
      width: 100%; /* Expand underline to full width */
    }
  `;
  document.head.appendChild(style);
});
