/* Jayden Yu — portfolio behaviour.
   Everything here is progressive: with JS off the page is fully readable. */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- scroll reveal ---------------------------------------------- */

  function initReveal() {
    var pending = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!pending.length) return;

    function showAll() {
      pending.forEach(function (el) { el.classList.add("in"); });
      pending = [];
    }

    if (reduced.matches || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        reveal(e.target);
      });
    }, { rootMargin: "0px 0px -15% 0px", threshold: 0 });

    function reveal(el) {
      el.classList.add("in");
      io.unobserve(el);
      var i = pending.indexOf(el);
      if (i > -1) pending.splice(i, 1);
      if (!pending.length) teardown();
    }

    pending.forEach(function (el) { io.observe(el); });

    /* IntersectionObserver only reports at delivery ticks, so a fast flick,
       an anchor jump or a restored scroll position can carry an element past
       the viewport between two ticks and leave it hidden for good. This sweep
       is the safety net: anything already scrolled into view gets shown
       regardless of whether the observer ever noticed it. */
    var queued = false;

    function sweep() {
      queued = false;
      var limit = window.innerHeight * 0.85;
      pending.slice().forEach(function (el) {
        if (el.getBoundingClientRect().top < limit) reveal(el);
      });
    }

    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    }

    function teardown() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("load", onScroll);
    sweep();
  }

  /* ---------- nav: mobile overlay ---------------------------------------- */

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      links.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- nav: transparent over a cover, fills past it ---------------- */

  function initCoverNav() {
    var nav = document.querySelector(".nav.over-cover");
    var cover = document.querySelector(".cover");
    if (!nav || !cover) return;

    function sync() {
      var past = window.scrollY > cover.offsetHeight - nav.offsetHeight - 8;
      nav.classList.toggle("filled", past);
    }
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
  }

  /* ---------- custom cursor ---------------------------------------------- */

  function initCursor() {
    if (reduced.matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var dot = document.createElement("div");
    dot.className = "cursor";
    dot.setAttribute("aria-hidden", "true");
    dot.innerHTML = "<span>View</span>";
    document.body.appendChild(dot);

    var x = -100, y = -100, raf = null;

    function draw() {
      dot.style.transform =
        "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)";
      raf = null;
    }

    document.addEventListener("mousemove", function (e) {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(draw);
    }, { passive: true });

    document.addEventListener("mouseover", function (e) {
      var thumb = e.target.closest(".thumb, .next-band");
      var link = e.target.closest("a, button, [role='button']");
      dot.classList.toggle("on-thumb", !!thumb);
      dot.classList.toggle("on-link", !!link && !thumb);
    });

    document.addEventListener("mouseleave", function () {
      dot.style.opacity = "0";
    });
    document.addEventListener("mouseenter", function () {
      dot.style.opacity = "1";
    });
  }

  /* ---------- go ---------------------------------------------------------- */

  function boot() {
    initReveal();
    initNav();
    initCoverNav();
    initCursor();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
