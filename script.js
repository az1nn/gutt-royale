// GUTT ROYALE — interactive landing page
const eventDate = new Date("2026-11-27T20:00:00-03:00").getTime();

function updateCountdown() {
  const distance = eventDate - Date.now();
  const ids = ["days", "hours", "minutes", "seconds"];

  if (distance <= 0) {
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "00";
    });
    return;
  }

  const values = [
    Math.floor(distance / (1000 * 60 * 60 * 24)),
    Math.floor((distance / (1000 * 60 * 60)) % 24),
    Math.floor((distance / (1000 * 60)) % 60),
    Math.floor((distance / 1000) % 60)
  ];

  values.forEach((value, index) => {
    const el = document.getElementById(ids[index]);
    if (el) el.textContent = String(value).padStart(2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".reveal, .artist, .experience-card, .partner");

if (reduceMotion) {
  revealTargets.forEach((el) => el.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (!header) return;
  header.style.background = window.scrollY > 40 ? "rgba(5,5,5,.92)" : "rgba(5,5,5,.72)";
}, { passive: true });

const body = document.body;
const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

function closeMenu() {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
  mobileNav.hidden = true;
  body.classList.remove("menu-open");
}

function openMenu() {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", "Fechar menu");
  mobileNav.hidden = false;
  body.classList.add("menu-open");
}

toggle?.addEventListener("click", () => {
  toggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
});

mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
window.addEventListener("resize", () => { if (window.innerWidth > 980) closeMenu(); }, { passive: true });

const navLinks = [...document.querySelectorAll('.nav a[href^="#"], .mobile-nav a[href^="#"]')];
const trackedSections = ["evento", "lineup", "experiencias", "local", "faq"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function setActiveSection(id) {
  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${id}`;
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible?.target?.id) setActiveSection(visible.target.id);
}, { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.2, 0.4] });

trackedSections.forEach((section) => sectionObserver.observe(section));
