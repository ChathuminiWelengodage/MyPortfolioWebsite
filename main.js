document.addEventListener("DOMContentLoaded", function() {
    // ===== Typed.js Animation =====
    var typed = new Typed(".text", {
        strings: ["Programming", "Database", "System Analysis"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // ===== Navbar Toggle for Mobile =====
    const menuBtn = document.getElementById('menu-icon');
    const navbar = document.querySelector('.header .navbar');


        menuBtn.addEventListener('click', () => {
            const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', String(!expanded));
            menuBtn.classList.toggle('active');
            navbar.classList.toggle('active');
            
        });

        document.querySelectorAll('.header .navbar a').forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    navbar.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    });


