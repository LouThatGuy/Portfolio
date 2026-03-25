const aboutSection = document.getElementById('about-section');
const projectsSection = document.getElementById('projects-section');
const contactSection = document.getElementById("contact-section");
const aboutCard = document.getElementById('aboutCard');
const projectsScroll = document.getElementById('projectsScroll');
const sideNav = document.getElementById('sideNav');

let onAbout = true;
let transitioning = false;

setTimeout(() => {
    aboutCard.classList.add('revealed');
}, 300);

function lockScroll() {
    document.body.style.overflow = 'hidden';
}

function unlockProjectsScroll() {
    projectsScroll.style.overflowY = 'auto';
}

lockScroll();

function revealSectionsInstant() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('visible');
    });
}

function scrollToProjects() {
    if (transitioning) return;
    transitioning = true;
    onAbout = false;

    aboutSection.classList.add('slide-up');
    aboutSection.classList.remove('active-section');
    aboutSection.style.pointerEvents = 'none';
    aboutSection.style.opacity = '0';
    aboutSection.style.zIndex = '-1';

    projectsSection.classList.add('active-section');
    projectsSection.style.pointerEvents = 'all';
    projectsSection.style.transform = 'translateY(100%)';
    projectsSection.style.opacity = '0';

    contactSection.style.transform = 'translateY(100%)';
    contactSection.style.opacity = '0';
    contactSection.style.pointerEvents = 'none';
    contactSection.classList.remove('active-section');

    requestAnimationFrame(() => {
        projectsSection.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
        projectsSection.style.transform = 'translateY(0)';
        projectsSection.style.opacity = '1';
    });

    setTimeout(() => {
        transitioning = false;
        unlockProjectsScroll();
        setupProjectsNav();
        sideNav.classList.add('visible');
        revealSectionsInstant();
    }, 750);
}

function scrollToAbout() {
    if (transitioning) return;
    transitioning = true;
    onAbout = true;

    projectsSection.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
    projectsSection.style.transform = 'translateY(100%)';
    projectsSection.style.opacity = '0';
    projectsSection.style.pointerEvents = 'none';

    contactSection.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
    contactSection.style.transform = 'translateY(100%)';
    contactSection.style.opacity = '0';
    contactSection.style.pointerEvents = 'none';

    aboutSection.style.opacity = '1';
    aboutSection.style.zIndex = '';
    aboutSection.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
    aboutSection.style.transform = 'translateY(0)';
    aboutSection.style.opacity = '1';
    aboutSection.classList.remove('slide-up');
    aboutSection.classList.add('active-section');
    aboutSection.style.pointerEvents = 'all';

    sideNav.classList.remove('visible');
    projectsScroll.scrollTo({ top: 0 });

    setTimeout(() => {
        projectsSection.classList.remove('active-section');
        transitioning = false;
        lockScroll();
    }, 750);
}

function toggleSocials() {
    const icons = document.getElementById('socialIcons');
    icons.classList.toggle('open');
}

function setupProjectsNav() {
    const sections = projectsScroll.querySelectorAll('.section');
    const navItems = sideNav ? sideNav.querySelectorAll('.nav-item') : [];

    function revealSections() {
        const triggerBottom = projectsScroll.scrollTop + projectsScroll.clientHeight;

        sections.forEach(section => {
            if (triggerBottom > section.offsetTop + 100) {
                section.classList.add('visible');
            }
        });
    }

    setTimeout(() => {
        revealSections();
    }, 50);

    projectsScroll.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            if (projectsScroll.scrollTop >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });

        revealSections();
    });

    navItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(item.getAttribute('href'));
            if (target) {
                projectsScroll.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    projectsScroll.addEventListener('scroll', () => {
        if (projectsScroll.scrollTop <= 0) {
            projectsScroll.scrollTop = 0;
        }
    });
}

let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        showSplashIdle();
    }, 30000);
}

function showSplashIdle() {
    const splash = document.getElementById('splash');
    splash.classList.remove('hidden');
    splash.classList.add('idle');
}

const _origEnter = window.enterSite;
window.enterSite = function() {
    const splash = document.getElementById('splash');
    splash.classList.add('hidden');
    splash.classList.remove('idle');
    document.body.classList.remove('splash-active');
    resetInactivityTimer();
    if (typeof music !== 'undefined') {
        music.play().then(() => {
            btn.textContent = "♪ Music: ON";
            isPlaying = true;
        }).catch(() => {});
    }
}

['mousemove','keydown','mousedown','touchstart','scroll','click'].forEach(e => {
    document.addEventListener(e, resetInactivityTimer, { passive: true });
});

function scrollToContact() {
    if (transitioning) return;
    transitioning = true;

    const contactSection = document.getElementById("contact-section");

    aboutSection.classList.remove('active-section');
    aboutSection.style.pointerEvents = 'none';
    aboutSection.style.opacity = '0';
    aboutSection.style.zIndex = '-1';

    projectsSection.classList.remove('active-section');
    projectsSection.style.pointerEvents = 'none';
    projectsSection.style.opacity = '0';

    sideNav.classList.remove('visible');

    contactSection.classList.add('active-section');
    contactSection.style.pointerEvents = 'all';
    contactSection.style.transform = 'translateY(100%)';
    contactSection.style.opacity = '0';

    requestAnimationFrame(() => {
        contactSection.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
        contactSection.style.transform = 'translateY(0)';
        contactSection.style.opacity = '1';
    });

    setTimeout(() => {
        transitioning = false;
    }, 750);
}

function sendMessage(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert("Fill everything out.");
        return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    if (!emailValid) {
        alert("Invalid email.");
        return;
    }

    fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.value, email: email.value, message: message.value })
    })
    .then(res => {
        if (res.ok) {
            alert("Message sent.");
            form.reset();
        } else {
            alert("Something failed.");
        }
    })
    .catch(() => {
        alert("Network error.");
    });
}

resetInactivityTimer();

window.scrollToProjects = scrollToProjects;
window.scrollToContact = scrollToContact;
window.scrollToAbout = scrollToAbout;
window.toggleSocials = toggleSocials;