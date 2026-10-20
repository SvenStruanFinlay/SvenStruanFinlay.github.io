// Site behaviour: circular menu, home-page typewriter and the top-bar tagline.
(function () {
  // circular menu
  var button = document.getElementById("cn-button");
  var wrapper = document.getElementById("cn-wrapper");
  var overlay = document.getElementById("cn-overlay");
  if (button && wrapper && overlay) {
    var open = false;
    var setOpen = function (state) {
      open = state;
      button.textContent = state ? "–" : "Menu";
      button.setAttribute("aria-expanded", state ? "true" : "false");
      wrapper.classList.toggle("opened-nav", state);
      overlay.classList.toggle("on-overlay", state);
    };
    button.addEventListener("click", function (e) { e.stopPropagation(); setOpen(!open); });
    wrapper.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", function () { if (open) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && open) setOpen(false); });
  }

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // home-page typewriter: types each line, then leaves a blinking cursor
  var target = document.getElementById("typedtext");
  if (target) {
    var lines = (target.getAttribute("data-lines") || "").split("|");
    if (reduced) {
      target.innerHTML = lines.join("<br>");
    } else {
      var li = 0, ci = 0, done = [];
      var tick = function () {
        var line = lines[li] || "";
        target.innerHTML = done.concat(line.slice(0, ci)).join("<br>") + '<span class="cursor">_</span>';
        if (ci < line.length) { ci++; setTimeout(tick, 55); }
        else if (li < lines.length - 1) { done.push(line); li++; ci = 0; setTimeout(tick, 260); }
      };
      tick();
    }
  }

  // top-bar tagline (typed.js, as on the original site)
  var tag = document.getElementById("typed");
  if (tag && window.Typed && !reduced) {
    new Typed("#typed", {
      strings: [
        "I take new products from 0→1.",
        "I lead teams through launch.",
        "I write the PRD and the technical design.",
        "I am a saxophonist.",
        "I am a coffee drinker.",
        "I am a product engineer."
      ],
      typeSpeed: 28, backSpeed: 18, backDelay: 1600, smartBackspace: true, loop: true
    });
  } else if (tag) {
    tag.textContent = "I take new products from 0→1.";
  }
})();
