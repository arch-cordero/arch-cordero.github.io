(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: transparent over hero, solid after ---------- */
  var header = document.getElementById('site-header');
  var hero = document.querySelector('.hero');

  if (header && hero) {
    var updateHeader = function () {
      var threshold = hero.offsetHeight - header.offsetHeight;
      header.classList.toggle('is-solid', window.scrollY > threshold);
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    updateHeader();
  }

  /* ---------- Hero slideshow ---------- */
  if (hero) {
    // The slideshow runs regardless of prefers-reduced-motion: a slow
    // crossfade is acceptable; only the Ken Burns pan (CSS) is motion-gated.
    var slides = hero.querySelectorAll('.hero__slide');
    if (slides.length > 1) {
      var current = 0;
      var INTERVAL = 7000;

      var materialize = function (slide) {
        var tpl = slide.querySelector('template');
        if (tpl) {
          slide.appendChild(tpl.content.cloneNode(true));
          tpl.remove();
        }
        var img = slide.querySelector('img');
        return img && img.decode ? img.decode().catch(function () {}) : Promise.resolve();
      };

      setInterval(function () {
        var next = (current + 1) % slides.length;
        materialize(slides[next]).then(function () {
          slides[current].classList.remove('is-active');
          slides[next].classList.add('is-active');
          current = next;
        });
      }, INTERVAL);
    }
  }

  /* ---------- Mosaic: expand project in place ---------- */
  var mosaic = document.getElementById('mosaic');
  var panel = document.getElementById('project-panel');

  if (mosaic && panel) {
    var inner = panel.querySelector('.panel__inner');
    var closeBtn = panel.querySelector('.panel__close');
    var openTile = null;
    var resizeObserver = null;

    var updateSpan = function () {
      var style = window.getComputedStyle(mosaic);
      var rowH = parseFloat(style.gridAutoRows) || 220;
      var gap = parseFloat(style.rowGap) || 0;
      var contentH = inner.offsetHeight;
      var span = Math.max(1, Math.ceil((contentH + gap) / (rowH + gap)));
      panel.style.setProperty('--span', span);
    };

    var closePanel = function (restoreFocus) {
      if (!openTile) return;
      panel.classList.remove('is-open');
      panel.hidden = true;
      inner.innerHTML = '';
      openTile.setAttribute('aria-expanded', 'false');
      if (resizeObserver) resizeObserver.disconnect();
      if (restoreFocus) openTile.focus();
      openTile = null;
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    var openPanel = function (tile) {
      var slug = tile.getAttribute('data-slug');
      var tpl = mosaic.querySelector('template[data-project="' + slug + '"]');
      if (!tpl) return;

      if (openTile === tile) {
        closePanel(true);
        return;
      }
      if (openTile) closePanel(false);

      inner.innerHTML = '';
      inner.appendChild(tpl.content.cloneNode(true));
      tile.after(panel);
      panel.hidden = false;
      updateSpan();

      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(updateSpan);
        resizeObserver.observe(inner);
      }

      openTile = tile;
      tile.setAttribute('aria-expanded', 'true');
      history.replaceState(null, '', '#' + slug);

      requestAnimationFrame(function () {
        panel.classList.add('is-open');
        var top = tile.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: top, behavior: reducedMotion ? 'auto' : 'smooth' });
      });
    };

    mosaic.addEventListener('click', function (event) {
      var tile = event.target.closest('.mosaic__tile');
      if (!tile) return;
      event.preventDefault();
      openPanel(tile);
    });

    closeBtn.addEventListener('click', function () {
      closePanel(true);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closePanel(true);
    });

    /* Deep link: /#<slug> opens that project */
    var initial = window.location.hash.slice(1);
    if (initial) {
      var target = document.getElementById(initial);
      if (target && target.classList.contains('mosaic__tile')) {
        openPanel(target);
      }
    }
  }
})();
