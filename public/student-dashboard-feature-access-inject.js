(function () {
  var FEATURE_KEY = "schoolCompliance";
  var TARGET_NAME = "School Compliance";
  /** Locked until parent sends `prism-feature-access-sync` (demo default). */
  var entitled = false;

  function normalize(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function findTitleElement(tile) {
    var headings = tile.querySelectorAll("h1, h2, h3, h4, span, a, p");
    for (var i = 0; i < headings.length; i++) {
      var el = headings[i];
      if (normalize(el.textContent) === TARGET_NAME) return el;
    }
    return null;
  }

  function findComplianceTiles() {
    var tiles = [];
    document.querySelectorAll('[data-name="' + TARGET_NAME + '"]').forEach(function (el) {
      tiles.push(el);
    });

    document.querySelectorAll("h1, h2, h3").forEach(function (heading) {
      if (normalize(heading.textContent) !== TARGET_NAME) return;
      var tile =
        heading.closest('[data-name="' + TARGET_NAME + '"]') ||
        heading.closest("section") ||
        heading.closest("[class*='rounded']") ||
        heading.parentElement;
      if (tile && tiles.indexOf(tile) === -1) tiles.push(tile);
    });

    return tiles;
  }

  function markHidden(el) {
    el.classList.add("feature-access-locked-student-tile__hidden");
    el.setAttribute("aria-hidden", "true");
    el.style.display = "none";
  }

  function hideTileBody(tile, titleEl) {
    if (!titleEl) return;

    var headerRow =
      titleEl.closest("[class*='items-center']") ||
      titleEl.closest("header") ||
      titleEl.parentElement;
    if (headerRow) headerRow.classList.add("feature-access-locked-student-tile__head");

    var contentRoot = titleEl.closest("a") || tile;
    Array.prototype.forEach.call(contentRoot.children, function (child) {
      if (headerRow && (child === headerRow || child.contains(headerRow))) return;
      markHidden(child);
    });

    tile.querySelectorAll(":scope > *").forEach(function (child) {
      if (child.contains(headerRow)) return;
      if (child === headerRow) return;
      markHidden(child);
    });
  }

  function showTileBody(tile) {
    tile.querySelectorAll(".feature-access-locked-student-tile__hidden").forEach(function (el) {
      el.classList.remove("feature-access-locked-student-tile__hidden");
      el.removeAttribute("aria-hidden");
      el.style.display = "";
    });
    tile.querySelectorAll(".feature-access-locked-student-tile__head").forEach(function (el) {
      el.classList.remove("feature-access-locked-student-tile__head");
    });
  }

  function insertLockAfterTitle(titleEl) {
    if (!titleEl || !titleEl.parentElement) return;

    var host = titleEl.parentElement;
    var wrap = host;
    if (!wrap.classList.contains("feature-access-lock-inline-host")) {
      wrap = document.createElement("span");
      wrap.className = "feature-access-lock-inline-host";
      host.insertBefore(wrap, titleEl);
      wrap.appendChild(titleEl);
    }
    if (wrap.querySelector(".feature-access-student-tile-lock")) return;

    var lock = document.createElement("span");
    lock.className = "feature-access-student-tile-lock";
    lock.setAttribute("aria-hidden", "true");
    lock.innerHTML = '<i class="fa-solid fa-lock"></i>';
    wrap.appendChild(lock);
  }

  function unlockTile(tile) {
    tile.removeAttribute("data-feature-access-patched");
    tile.removeAttribute("data-feature-access");
    tile.classList.remove("feature-access-locked-student-tile");
    tile.removeAttribute("role");
    tile.removeAttribute("aria-label");
    showTileBody(tile);
    var lock = tile.querySelector(".feature-access-student-tile-lock");
    if (lock) lock.remove();
    tile.querySelectorAll(".feature-access-lock-inline-host").forEach(function (wrap) {
      while (wrap.firstChild) {
        wrap.parentElement.insertBefore(wrap.firstChild, wrap);
      }
      wrap.remove();
    });
  }

  window.addEventListener("message", function (event) {
    var data = event.data;
    if (!data || data.type !== "prism-feature-access-sync") return;
    if (data.features && Object.prototype.hasOwnProperty.call(data.features, FEATURE_KEY)) {
      entitled = !!data.features[FEATURE_KEY].entitled;
      if (entitled) {
        document
          .querySelectorAll('[data-feature-access-patched="' + FEATURE_KEY + '"]')
          .forEach(unlockTile);
      } else {
        patchTiles();
      }
    }
  });

  function patchTiles() {
    if (entitled) return;

    findComplianceTiles().forEach(function (tile) {
      if (tile.getAttribute("data-feature-access-patched") === FEATURE_KEY) return;

      var titleEl = findTitleElement(tile);
      if (!titleEl) return;

      tile.setAttribute("data-feature-access-patched", FEATURE_KEY);
      tile.setAttribute("data-feature-access", FEATURE_KEY);
      tile.classList.add("feature-access-locked-student-tile");
      tile.setAttribute("role", "button");
      tile.setAttribute(
        "aria-label",
        TARGET_NAME + " is locked. Learn how to get access.",
      );

      insertLockAfterTitle(titleEl);
      hideTileBody(tile, titleEl);

      if (tile.dataset.featureAccessClickWired === "1") return;
      tile.dataset.featureAccessClickWired = "1";
      tile.addEventListener(
        "click",
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          window.parent.postMessage(
            { type: "prism-feature-access-request", featureKey: FEATURE_KEY },
            "*",
          );
        },
        true,
      );
    });
  }

  var observer = new MutationObserver(patchTiles);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  patchTiles();
})();
