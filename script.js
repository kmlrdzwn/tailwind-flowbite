// Collapse Class for NavBar

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

// Dark Mode

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
