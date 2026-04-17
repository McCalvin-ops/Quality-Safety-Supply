document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a[data-page]").forEach((link) => {
    const matches = link.getAttribute("data-page") === currentPath;
    link.classList.toggle("active", matches);
    if (matches) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const staggerGroups = document.querySelectorAll(".stagger-group");

  staggerGroups.forEach((group) => {
    const items = group.querySelectorAll(".reveal");
    items.forEach((item, index) => {
      item.classList.add("stagger-item");
      item.style.setProperty("--stagger-delay", `${index * 90}ms`);
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const countUpItems = Array.from(
    document.querySelectorAll(".stat-value[data-count], .stat-value[data-counter], .stat-value[data-target]")
  );
  if (countUpItems.length) {
    const animateCount = (element) => {
      const target =
        Number(
          element.getAttribute("data-count") ||
            element.getAttribute("data-counter") ||
            element.getAttribute("data-target")
        ) || 0;
      const suffix =
        element.getAttribute("data-suffix") ||
        (element.textContent && element.textContent.trim().endsWith("%") ? "%" : "");
      const duration = 1200;
      const start = performance.now();

      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        element.textContent = `${value}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              countObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      countUpItems.forEach((item) => countObserver.observe(item));
    } else {
      countUpItems.forEach((item) => animateCount(item));
    }
  }

  const progressBars = Array.from(document.querySelectorAll(".progress-fill"));
  if (progressBars.length) {
    progressBars.forEach((bar) => {
      const fromAttribute = bar.getAttribute("data-progress");
      const fromLegacyStyles =
        bar.style.getPropertyValue("--value") ||
        bar.style.getPropertyValue("--fill") ||
        bar.style.getPropertyValue("--progress");
      const rawTarget = (fromAttribute || fromLegacyStyles || "0").trim();
      const target = rawTarget.includes("%") ? rawTarget : `${rawTarget}%`;
      bar.style.setProperty("--target-width", target);
    });

    if ("IntersectionObserver" in window) {
      const progressObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              progressObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.45 }
      );

      progressBars.forEach((bar) => progressObserver.observe(bar));
    } else {
      progressBars.forEach((bar) => bar.classList.add("is-visible"));
    }
  }

  const contactForm = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");

  if (contactForm && feedback) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      feedback.textContent =
        "Thank you. Your message has been captured. Our team will contact you shortly.";
      contactForm.reset();
    });
  }

  if (nav) {
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        if (navToggle) {
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
});
