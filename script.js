const navigationLinks = Array.from(
  document.querySelectorAll(".nav-link")
);

const sections = Array.from(
  document.querySelectorAll(".page-section")
);

const sidebar = document.querySelector(".sidebar");
const menuButton = document.querySelector(".menu-button");


function getValidSectionId() {
  const hashId = window.location.hash.replace("#", "");

  const sectionExists = sections.some(
    (section) => section.id === hashId
  );

  return sectionExists ? hashId : "about";
}


function showSection(sectionId, scrollToTop = true) {
  sections.forEach((section) => {
    const isCurrentSection =
      section.id === sectionId;

    section.classList.toggle(
      "active-section",
      isCurrentSection
    );

    section.setAttribute(
      "aria-hidden",
      String(!isCurrentSection)
    );
  });


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


  document.title =
    sectionId === "about"
      ? "Lizhuo (Eleanor) Zhou"
      : `${
          sectionId.charAt(0).toUpperCase() +
          sectionId.slice(1)
        } | Lizhuo Zhou`;


  if (scrollToTop) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }
}


navigationLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const sectionId = link
      .getAttribute("href")
      .replace("#", "");

    history.pushState(
      { sectionId },
      "",
      `#${sectionId}`
    );

    showSection(sectionId);

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


window.addEventListener("popstate", () => {
  showSection(getValidSectionId());
});


window.addEventListener("hashchange", () => {
  showSection(getValidSectionId());
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


showSection(getValidSectionId(), false);
