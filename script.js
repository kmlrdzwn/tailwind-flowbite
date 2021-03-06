/* ================================= */
/* === Collapse Class for NavBar === */
/* ========= From Flowbite ========= */
/* ================================= */

const Default = {
  triggerEl: null,
  onCollapse: () => {},
  onExpand: () => {},
  onToggle: () => {},
};

class Collapse {
  constructor(targetEl = null, options) {
    this._targetEl = targetEl;
    this._triggerEl = options ? options.triggerEl : Default.triggerEl;
    this._options = { ...Default, ...options };
    this._visible = false;
    this._init();
  }

  _init() {
    if (this._triggerEl) {
      if (this._triggerEl.hasAttribute("aria-expanded")) {
        this._visible = this._triggerEl.getAttribute("aria-expanded") === "true" ? true : false;
      } else {
        // fix until v2 not to break previous single collapses which became dismiss
        this._visible = this._targetEl.classList.contains("hidden") ? false : true;
      }

      this._triggerEl.addEventListener("click", () => {
        this._visible ? this.collapse() : this.expand();
      });
    }
  }

  collapse() {
    this._targetEl.classList.add("hidden");
    if (this._triggerEl) {
      this._triggerEl.setAttribute("aria-expanded", "false");
    }
    this._visible = false;

    // callback function
    this._options.onCollapse(this);
  }

  expand() {
    this._targetEl.classList.remove("hidden");
    if (this._triggerEl) {
      this._triggerEl.setAttribute("aria-expanded", "true");
    }
    this._visible = true;

    // callback function
    this._options.onExpand(this);
  }

  toggle() {
    if (this._visible) {
      this.collapse();
    } else {
      this.expand();
    }
  }
}

window.Collapse = Collapse;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-collapse-toggle]").forEach((triggerEl) => {
    const targetEl = document.getElementById(triggerEl.getAttribute("data-collapse-toggle"));
    new Collapse(targetEl, {
      triggerEl: triggerEl,
    });
  });
});

/* ================================= */
/* =========== Dark Mode =========== */
/* ================================= */

var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

/* ================================= */
/* =======   Pricing Toggle  ======= */
/* ================================= */

// TODO: Refactor?

const litePerMonth = "RM50";
const basicPerMonth = "RM100";
const premiumPerMonth = "RM300";

const litePerYear = "RM500";
const basicPerYear = "RM1000";
const premiumPerYear = "RM3000";

const btnMonth = document.getElementById("btnMonth");
const btnYear = document.getElementById("btnYear");

const price1 = document.getElementById("price1");
const price2 = document.getElementById("price2");
const price3 = document.getElementById("price3");

const duration = document.querySelectorAll(".duration");

btnMonth.addEventListener("click", () => {
  btnMonth.classList.add("border-gray-200", "bg-white");

  btnYear.classList.remove("border-gray-200", "bg-white");

  price1.innerText = litePerMonth;
  price2.innerText = basicPerMonth;
  price3.innerText = premiumPerMonth;

  duration.forEach((dur) => (dur.innerText = "/month"));
});

btnYear.addEventListener("click", () => {
  btnYear.classList.add("border-gray-200", "bg-white");

  btnMonth.classList.remove("border-gray-200", "bg-white");

  price1.innerText = litePerYear;
  price2.innerText = basicPerYear;
  price3.innerText = premiumPerYear;

  duration.forEach((dur) => (dur.innerText = "/year"));
});

/* ================================= */
/* ==== Appear NavBar On Scroll ==== */
/* ================================= */

const sectionHeroEl = document.querySelector("#home");
const nav = document.querySelector("#navbar");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      navbar.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      navbar.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

/* ================================= */
/* == Smooth scrolling animation  == */
/* ================================= */

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
