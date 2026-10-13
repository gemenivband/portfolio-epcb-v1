// ========================================
// HEADER SCROLL EFFECT
// ========================================
const header = document.querySelector(".header");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 0);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// ========================================
// MOBILE NAVIGATION
// ========================================
const mobileNavButton = document.querySelector(".btn-mobile-nav");
const mainNavigation = document.querySelector(".header .main-navigation");
const navigationLinks = document.querySelectorAll(
  ".header .main-navigation .main-nav-link",
);

function closeMobileNav() {
  if (!header || !mobileNavButton) return;
  header.classList.remove("nav-open");
  mobileNavButton.setAttribute("aria-expanded", "false");
  mobileNavButton.setAttribute("aria-label", "Open navigation menu");
  document.body.style.overflow = "";
}

function openMobileNav() {
  if (!header || !mobileNavButton) return;
  header.classList.add("nav-open");
  mobileNavButton.setAttribute("aria-expanded", "true");
  mobileNavButton.setAttribute("aria-label", "Close navigation menu");
  document.body.style.overflow = "hidden";
}

if (mobileNavButton && mainNavigation && header) {
  mobileNavButton.addEventListener("click", () => {
    const isOpen = mobileNavButton.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMobileNav();
    else openMobileNav();
  });

  // Hide the menu automatically after selecting HOME, ABOUT, or WORKS.
  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // Escape key closes the menu.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileNav();
  });

  // Restore the desktop layout when resizing above the mobile breakpoint.
  const desktopMediaQuery = window.matchMedia("(min-width: 59.001em)");
  desktopMediaQuery.addEventListener("change", (event) => {
    if (event.matches) closeMobileNav();
  });
}

// ========================================
// COUNTER ANIMATION
// Runs once when each counter becomes visible.
// ========================================
const counters = document.querySelectorAll(".count");

function animateCounter(counter) {
  if (counter.dataset.animated === "true") return;
  counter.dataset.animated = "true";

  const target = Number(counter.dataset.target);
  if (!Number.isFinite(target)) return;

  const duration = 1500;
  const startTime = performance.now();
  const prefix = counter.textContent.trim().startsWith("+") ? "+" : "";

  function updateCount(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(target * easedProgress);
    counter.textContent = prefix + value;

    if (progress < 1) requestAnimationFrame(updateCount);
    else counter.textContent = prefix + target;
  }

  requestAnimationFrame(updateCount);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach(animateCounter);
}
