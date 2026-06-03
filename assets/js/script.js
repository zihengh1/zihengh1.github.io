'use strict';

const sidebar = document.querySelector("[data-sidebar]");
const sidebarButton = document.querySelector("[data-sidebar-btn]");
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const clientLogos = document.querySelectorAll(".clients-item img");

sidebarButton.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  sidebarButton.setAttribute("aria-expanded", sidebar.classList.contains("active"));
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetPage = link.getAttribute("aria-controls");

    pages.forEach((page) => {
      page.classList.toggle("active", page.dataset.page === targetPage);
    });

    navigationLinks.forEach((navLink) => {
      navLink.classList.toggle("active", navLink === link);
      if (navLink === link) {
        navLink.setAttribute("aria-current", "page");
      } else {
        navLink.removeAttribute("aria-current");
      }
    });

    window.scrollTo(0, 0);
  });
});

clientLogos.forEach((logo) => {
  const fallback = logo.nextElementSibling;

  if (!fallback || !fallback.classList.contains("clients-label")) return;

  const showFallback = () => {
    logo.hidden = true;
    fallback.hidden = false;
  };

  logo.addEventListener("error", showFallback);

  if (logo.complete && logo.naturalWidth === 0) {
    showFallback();
  }
});
