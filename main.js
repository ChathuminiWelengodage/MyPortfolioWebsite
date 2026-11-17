/* ============================================================
   CHATHUMINI WELENGODAGE — PORTFOLIO MAIN JS
   All interactive features, animations, and utilities
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    /* ──────────────────────────────────────────────
       1. TYPED.JS — Animated Text
    ────────────────────────────────────────────── */
    const typed = new Typed(".typed-text", {
        strings: ["Data Analytics", "Business Analysis", "Quality Assurance",],
        typeSpeed: 80,
        backSpeed: 60,
        backDelay: 1500,
        loop: true,
    });


    /* ──────────────────────────────────────────────
       2. CUSTOM CURSOR
    ────────────────────────────────────────────── */
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");

    let ringX = 0, ringY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (dot) {
            dot.style.left = mouseX + "px";
            dot.style.top = mouseY + "px";
        }
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        if (ring) {
            ring.style.left = ringX + "px";
            ring.style.top = ringY + "px";
        }
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Grow ring on interactive elements
    document.querySelectorAll("a, button, .skill-card, .project-card, .article-card, .stat-card").forEach(el => {
        el.addEventListener("mouseenter", () => ring && ring.classList.add("hovered"));
        el.addEventListener("mouseleave", () => ring && ring.classList.remove("hovered"));
    });

    document.addEventListener("mouseleave", () => {
        if (dot) dot.style.opacity = "0";
        if (ring) ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
        if (dot) dot.style.opacity = "1";
        if (ring) ring.style.opacity = "1";
    });


    /* ──────────────────────────────────────────────
       3. SCROLL PROGRESS BAR
    ────────────────────────────────────────────── */
    const progressBar = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = progress + "%";
    });


    /* ──────────────────────────────────────────────
       4. HEADER SCROLL EFFECTS & ACTIVE NAV
    ────────────────────────────────────────────── */
    const header = document.getElementById("header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    const onScroll = () => {
        const y = window.scrollY;

        // Header shrink
        if (header) {
            header.classList.toggle("scrolled", y > 50);
        }

        // Back to top button
        const btn = document.getElementById("back-to-top");
        if (btn) btn.classList.toggle("visible", y > 400);

        // Active nav link
        let current = "";
        sections.forEach(section => {
            if (y >= section.offsetTop - 120) current = section.getAttribute("id");
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", onScroll);


    /* ──────────────────────────────────────────────
       5. MOBILE NAV TOGGLE
    ────────────────────────────────────────────── */
    const menuBtn = document.getElementById("menu-icon");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            const expanded = menuBtn.getAttribute("aria-expanded") === "true";
            menuBtn.setAttribute("aria-expanded", String(!expanded));
            menuBtn.classList.toggle("active");
            navbar.classList.toggle("active");
            document.body.style.overflow = navbar.classList.contains("active") ? "hidden" : "";
        });

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuBtn.classList.remove("active");
                navbar.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (!header.contains(e.target) && navbar.classList.contains("active")) {
                menuBtn.classList.remove("active");
                navbar.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            }
        });
    }


    /* ──────────────────────────────────────────────
       6. DARK / LIGHT THEME TOGGLE
    ────────────────────────────────────────────── */
    const themeBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "dark";
    htmlEl.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const current = htmlEl.getAttribute("data-theme");
            const next = current === "dark" ? "light" : "dark";
            htmlEl.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon";
        }
    }


    /* ──────────────────────────────────────────────
       7. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
    ────────────────────────────────────────────── */
    const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));


    /* ──────────────────────────────────────────────
       9. COUNTER ANIMATION (Stats)
    ────────────────────────────────────────────── */
    const statNumbers = document.querySelectorAll(".stat-number");

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute("data-target"));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        let count = 0;
        const duration = 1500;
        const step = target / (duration / 16);

        const timer = setInterval(() => {
            count += step;
            if (count >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(count);
            }
        }, 16);
    }


    /* ──────────────────────────────────────────────
       10. PROJECT FILTER TABS
    ────────────────────────────────────────────── */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            projectCards.forEach((card, i) => {
                const category = card.getAttribute("data-category");
                const match = filter === "all" || category === filter;

                card.style.transition = "opacity 0.4s ease, transform 0.4s ease";

                if (match) {
                    card.classList.remove("hidden");
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, i * 80);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";
                    setTimeout(() => card.classList.add("hidden"), 400);
                }
            });
        });
    });


    /* ──────────────────────────────────────────────
       11. PARTICLE BACKGROUND (Home)
    ────────────────────────────────────────────── */
    const particleContainer = document.getElementById("particles");

    if (particleContainer) {
        const count = window.innerWidth > 768 ? 25 : 10;
        for (let i = 0; i < count; i++) {
            const p = document.createElement("div");
            p.classList.add("particle");
            p.style.left = Math.random() * 100 + "%";
            p.style.setProperty("--dur", (6 + Math.random() * 10) + "s");
            p.style.setProperty("--d", (Math.random() * 8) + "s");
            p.style.width = (2 + Math.random() * 3) + "px";
            p.style.height = p.style.width;
            p.style.opacity = Math.random() * 0.5;
            particleContainer.appendChild(p);
        }
    }


    /* ──────────────────────────────────────────────
       12. CONTACT FORM VALIDATION & SUBMISSION
    ────────────────────────────────────────────── */
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const successBox = document.getElementById("form-success");
const errorBox = document.getElementById("form-error");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields.");
        return;
    }

    // Hide previous messages
    successBox.style.display = "none";
    errorBox.style.display = "none";

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.querySelector(".btn-text").style.display = "none";
    submitBtn.querySelector(".btn-loading").style.display = "inline";

    try {
        await emailjs.sendForm(
            "service_p28c9wm",
            "template_ob8hiri",
            contactForm,
            {
                publicKey: "m-PLMtMKIcwYePsb5"
            }
        );

        // Show success message
        successBox.style.display = "flex";

        // Clear form
        contactForm.reset();

    } catch (error) {
        console.error("EmailJS Error:", error);

        errorBox.style.display = "flex";
        errorBox.querySelector("p").textContent =
            "Sorry, your message could not be sent. Please try again.";
    } finally {
        // Restore button
        submitBtn.disabled = false;
        submitBtn.querySelector(".btn-text").style.display = "inline";
        submitBtn.querySelector(".btn-loading").style.display = "none";
    }
});



    /* ──────────────────────────────────────────────
       13. BACK TO TOP BUTTON
    ────────────────────────────────────────────── */
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    /* ──────────────────────────────────────────────
       14. SMOOTH SCROLL FOR NAV LINKS (backup)
    ────────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                const offset = document.getElementById("header").offsetHeight || 72;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });

});
