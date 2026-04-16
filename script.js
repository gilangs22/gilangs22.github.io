const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealTargets = document.querySelectorAll(".hero-copy, .hero-panel, .section");
const typingTarget = document.querySelector(".typing-text");
const skillTabs = document.querySelectorAll(".skill-tab");
const skillPanels = document.querySelectorAll(".skill-panel");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("is-open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav?.classList.remove("is-open");
  });
});

revealTargets.forEach((target) => target.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((target) => observer.observe(target));

if (typingTarget) {
  const roles = typingTarget.dataset.roles.split("|");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex += 1;
      typingTarget.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        isDeleting = true;
        window.setTimeout(type, 1200);
        return;
      }
    } else {
      charIndex -= 1;
      typingTarget.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    window.setTimeout(type, isDeleting ? 36 : 72);
  };

  type();
}

skillTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    skillTabs.forEach((item) => item.classList.remove("is-active"));
    skillPanels.forEach((panel) => panel.classList.remove("is-active"));

    tab.classList.add("is-active");
    document
      .querySelector(`[data-skill-panel="${target}"]`)
      ?.classList.add("is-active");
  });
});

document.addEventListener("pointermove", (event) => {
  document.body.style.setProperty("--spotlight-x", `${event.clientX}px`);
  document.body.style.setProperty("--spotlight-y", `${event.clientY}px`);
});
