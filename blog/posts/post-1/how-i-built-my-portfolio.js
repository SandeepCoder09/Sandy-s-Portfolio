// ── READING PROGRESS ──────────────────────────────────────
      window.addEventListener(
        "scroll",
        () => {
          const doc = document.documentElement;
          const scrollTop = doc.scrollTop || document.body.scrollTop;
          const scrollHeight = doc.scrollHeight - doc.clientHeight;
          const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
          document.getElementById("progressBar").style.width = pct + "%";
        },
        { passive: true },
      );

      // ── TOC ACTIVE SECTION ────────────────────────────────────
      const sections = document.querySelectorAll("h2[id]");
      const tocItems = document.querySelectorAll(".toc-item");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              tocItems.forEach((t) => t.classList.remove("active"));
              const match = document.querySelector(
                `.toc-item[href="#${e.target.id}"]`,
              );
              if (match) match.classList.add("active");
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      sections.forEach((s) => observer.observe(s));

      // ── SHARE ─────────────────────────────────────────────────
      function shareTwitter() {
        const text = encodeURIComponent(document.title);
        const url = encodeURIComponent(window.location.href);
        window.open(
          `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
          "_blank",
        );
      }
      function copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const btn = document.querySelectorAll(".share-btn")[1];
          btn.textContent = "✓ Copied!";
          setTimeout(() => (btn.textContent = "🔗 Copy"), 2000);
        });
      }

      // ── CURSOR ────────────────────────────────────────────────
      const g = document.getElementById("cursorGlow");
      if (g)
        document.addEventListener("mousemove", (e) => {
          g.style.left = e.clientX + "px";
          g.style.top = e.clientY + "px";
        });