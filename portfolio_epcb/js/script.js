// border line will appear as srolled
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Use for count-animation
const counters = document.querySelectorAll(".count");
const speed = 100; // lower = faster

const animateCounters = () => {
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// Run animation when page loads
window.addEventListener("load", animateCounters);

// Also trigger when section becomes visible while scrolling
window.addEventListener("scroll", () => {
  const statsSection = document.querySelector(".hero-number-list-info");
  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (
    sectionTop < windowHeight &&
    !statsSection.classList.contains("animated")
  ) {
    animateCounters();
    statsSection.classList.add("animated");
  }
});
