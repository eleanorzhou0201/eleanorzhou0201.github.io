const navigationLinks = Array.from(
  document.querySelectorAll(".nav-link")
);

const sections = Array.from(
  document.querySelectorAll(".page-section")
);

const sidebar = document.querySelector(".sidebar");
const menuButton = document.querySelector(".menu-button");


function setActiveNavigation(sectionId) {
  navigationLinks.forEach((link) => {
    const isActive =
      link.getAttribute("href") === `#${sectionId}`;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}


navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link
      .getAttribute("href")
      .replace("#", "");

    setActiveNavigation(targetId);

    sidebar.classList.remove("open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );
  });
});


const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort(
        (first, second) =>
          second.intersectionRatio -
          first.intersectionRatio
      );

    if (visibleSections.length > 0) {
      setActiveNavigation(
        visibleSections[0].target.id
      );
    }
  },
  {
    root: null,
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.05, 0.2, 0.4, 0.6]
  }
);


sections.forEach((section) => {
  sectionObserver.observe(section);
});


menuButton.addEventListener("click", () => {
  const isOpen =
    sidebar.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuButton.setAttribute(
    "aria-label",
    isOpen
      ? "Close navigation"
      : "Open navigation"
  );
});


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    sidebar.classList.remove("open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );
  }
});
