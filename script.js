const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

function qs(sel, root = document) {
    return root.querySelector(sel);
}

function qsa(sel, root = document) {
    return [...root.querySelectorAll(sel)];
}

function escapeHtml(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
const themeToggle = qs('#themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light');
    updateThemeIcon(true);
}

function updateThemeIcon(isLight) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-moon', !isLight);
    icon.classList.toggle('fa-sun', isLight);
}

themeToggle?.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
});

// ─── Mobile Navigation ────────────────────────────────────────────────────────
const hamburger = qs('.hamburger');
const navLinks = qs('.nav-links');

hamburger?.addEventListener('click', () => {
    const isExpanded = hamburger.classList.toggle('active');
    navLinks?.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isExpanded));
});

qsa('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navLinks?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
    });
});

// ─── Smooth scrolling (respect reduced motion) ────────────────────────────────
qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = qs(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
        });
    });
});

// ─── Fallback project data ────────────────────────────────────────────────────
// Kept in sync with data/projects.json. Used when the JSON file cannot be fetched.
const fallbackProjects = [
    {
        id: 'graduate-job-connect',
        title: 'Graduate Job Connect',
        subtitle: 'Graduate employment and recruitment platform for Ethiopia',
        description: 'A full-stack recruitment platform connecting graduates with employers and job opportunities across Ethiopia. Features role-based accounts, job discovery, applications, and email OTP verification.',
        image: 'data/Graduate Job Connect/image.png',
        gallery: [
            'data/Graduate Job Connect/image copy.png',
            'data/Graduate Job Connect/image copy 2.png',
            'data/Graduate Job Connect/image copy 3.png'
        ],
        tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'bcrypt', 'HTML5', 'CSS3', 'JavaScript'],
        category: 'Web App',
        links: {
            github: 'https://github.com/tedrosweldegebriel465-eng/Graduate-Job-Connect-GJC-'
        },
        highlights: [
            'Graduate and employer accounts',
            'Authentication and role-based access',
            'Job discovery and search',
            'Job applications',
            'Email OTP verification',
            'Administrative functionality'
        ]
    },
    {
        id: 'currency-arbitrage',
        title: 'Currency Arbitrage Detector',
        subtitle: 'Graph-based financial algorithm for detecting arbitrage opportunities',
        description: 'A Python research project that models currency exchange markets as weighted directed graphs and detects potential arbitrage using the Bellman-Ford algorithm. Includes synthetic data generation and exchange rate analysis.',
        image: 'data/currency arbitrage/image.png',
        gallery: [],
        tags: ['Python', 'Bellman-Ford', 'Graph Theory', 'Data Visualization', 'Algorithms'],
        category: 'Algorithms',
        links: {
            github: 'https://github.com/tedrosweldegebriel465-eng/currency-arbitrage'
        },
        highlights: [
            'Currency exchange rate analysis',
            'Weighted directed graph modeling',
            'Negative cycle detection (Bellman-Ford)',
            'Arbitrage opportunity identification',
            'Synthetic data generation'
        ]
    },
    {
        id: 'connecthub',
        title: 'ConnectHub',
        subtitle: 'Social networking application with real-time interaction',
        description: 'A social networking application built with Node.js and Express. Features user registration, JWT authentication, social interaction, and real-time communication via Socket.IO.',
        image: 'data/connecthub/image.png',
        gallery: [],
        tags: ['Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT', 'bcrypt'],
        category: 'Web App',
        links: {
            github: 'https://github.com/tedrosweldegebriel465-eng/ConnectHub'
        },
        highlights: [
            'User registration and authentication',
            'JWT-based session management',
            'Real-time communication (Socket.IO)',
            'Social interaction features',
            'RESTful API design'
        ]
    },
    {
        id: 'ethiopian-gps',
        title: 'Ethiopian GPS Navigation System',
        subtitle: 'Route analysis using graph algorithms and interactive maps',
        description: 'A navigation and route analysis application using graph algorithms to find routes between Ethiopian cities. Built with Python and Flask, featuring interactive Folium maps and network analytics.',
        image: 'data/image samples GPS/image.png',
        gallery: [
            'data/image samples GPS/image copy.png',
            'data/image samples GPS/image copy 2.png',
            'data/image samples GPS/image copy 3.png'
        ],
        tags: ['Python', 'Flask', 'NetworkX', 'Folium', 'Dijkstra', 'A*'],
        category: 'Algorithms',
        links: {
            github: 'https://github.com/tedrosweldegebriel465-eng/ethiopian-gps-navigation-system'
        },
        highlights: [
            'Shortest-path calculations (Dijkstra & A*)',
            'Interactive map visualizations (Folium)',
            'Route analysis between Ethiopian cities',
            'Network analytics and centrality',
            'Geographic distance calculations'
        ]
    },
    {
        id: 'merkatostock',
        title: 'MerkatoStock — Inventory Management',
        subtitle: 'Web-based inventory system for business stock management',
        description: 'A web-based inventory management system helping businesses manage products, suppliers, and stock operations. Includes role-based access, CSV reporting, and activity logging.',
        image: 'data/image samples IMS/Home.png',
        gallery: [
            'data/image samples IMS/login.png',
            'data/image samples IMS/dashboard.png',
            'data/image samples IMS/Categories.png',
            'data/image samples IMS/Suppliers.png',
            'data/image samples IMS/users.png'
        ],
        tags: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
        category: 'Web App',
        links: {
            github: 'https://github.com/tedrosweldegebriel465-eng/ims-inventory-management-system'
        },
        highlights: [
            'Role-based access control',
            'Product and supplier management',
            'Stock-in and stock-out tracking',
            'Inventory history',
            'CSV reports',
            'Activity logs'
        ]
    },
    {
        id: 'ai-learning-tutor',
        title: 'AI Learning Tutor',
        subtitle: 'AI-based education assistant for students',
        description: 'An AI-powered application to help students learn faster with personalized explanations, practice exercises, and guided feedback. Currently in active development.',
        image: 'data/AI Learning Tutor (In Progress)/image.png',
        gallery: [],
        tags: ['AI', 'Education', 'In Progress'],
        category: 'In Progress',
        links: {},
        highlights: [
            'Personalized learning support',
            'Practice and feedback loops',
            'Education-focused UX'
        ],
        status: 'In Progress'
    }
];

async function loadProjects() {
    try {
        const res = await fetch('data/projects.json', { cache: 'no-store' });
        if (!res.ok) return fallbackProjects;
        const data = await res.json();
        if (Array.isArray(data?.projects) && data.projects.length) return data.projects;
        return fallbackProjects;
    } catch {
        return fallbackProjects;
    }
}

// ─── Projects render + filter/search ─────────────────────────────────────────
const projectsGrid = qs('#projectsGrid');
const projectFilters = qs('#projectFilters');
const projectSearch = qs('#projectSearch');

let projects = fallbackProjects;
let allCategories = ['All', ...new Set(projects.map(p => p.category))];
let activeCategory = 'All';
let searchTerm = '';

function renderFilters() {
    if (!projectFilters) return;
    projectFilters.innerHTML = allCategories.map(cat => {
        const isActive = cat === activeCategory;
        return `<button class="filter-btn${isActive ? ' active' : ''}" type="button" role="tab" aria-selected="${isActive}" data-category="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`;
    }).join('');
}

function matchesProject(p) {
    const inCategory = activeCategory === 'All' || p.category === activeCategory;
    const hay = `${p.title} ${p.subtitle ?? ''} ${p.description} ${(p.tags ?? []).join(' ')}`.toLowerCase();
    const inSearch = !searchTerm || hay.includes(searchTerm);
    return inCategory && inSearch;
}

function buildImageSrc(src) {
    // Encode spaces properly for HTML src attributes
    return src ? src.replace(/ /g, '%20') : '';
}

function renderProjects() {
    if (!projectsGrid) return;
    const filtered = projects.filter(matchesProject);

    if (filtered.length === 0) {
        projectsGrid.innerHTML = `<div class="project-card" style="padding:1.5rem;"><h3>No projects found</h3><p style="color:var(--text-secondary);margin-top:.5rem;">Try a different filter or search term.</p></div>`;
        return;
    }

    projectsGrid.innerHTML = filtered.map(p => `
        <article class="project-card">
            <div class="project-image">
                <img loading="lazy" src="${escapeHtml(buildImageSrc(p.image))}" alt="${escapeHtml(p.title)} screenshot">
                <div class="project-overlay">
                    <button class="project-link" type="button" data-project-open="${escapeHtml(p.id)}" aria-label="View ${escapeHtml(p.title)} details">
                        <i class="fas fa-up-right-from-square" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div class="project-content">
                ${p.status ? `<span class="project-status">${escapeHtml(p.status)}</span>` : ''}
                <h3>${escapeHtml(p.title)}</h3>
                <p>${escapeHtml(p.description)}</p>
                <div class="project-tech" aria-label="Technologies used">
                    ${(p.tags ?? []).slice(0, 6).map(t => `<span>${escapeHtml(t)}</span>`).join('')}
                </div>
                <div class="project-links">
                    <button type="button" class="project-btn" data-project-open="${escapeHtml(p.id)}">Details <i class="fas fa-arrow-right" aria-hidden="true"></i></button>
                    ${p.links?.live ? `<a href="${escapeHtml(p.links.live)}" target="_blank" rel="noreferrer" class="project-btn">Live <i class="fas fa-external-link-alt" aria-hidden="true"></i></a>` : ''}
                    ${p.links?.github ? `<a href="${escapeHtml(p.links.github)}" target="_blank" rel="noreferrer" class="project-btn">GitHub <i class="fab fa-github" aria-hidden="true"></i></a>` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

projectFilters?.addEventListener('click', (e) => {
    const btn = e.target.closest?.('button[data-category]');
    if (!btn) return;
    activeCategory = btn.getAttribute('data-category') || 'All';
    renderFilters();
    renderProjects();
});

projectSearch?.addEventListener('input', (e) => {
    searchTerm = String(e.target.value || '').trim().toLowerCase();
    renderProjects();
});

renderFilters();
renderProjects();

// Load from JSON (overrides fallback if successful)
loadProjects().then((loaded) => {
    projects = loaded;
    allCategories = ['All', ...new Set(projects.map(p => p.category))];
    activeCategory = 'All';
    renderFilters();
    renderProjects();
});

// ─── Modal ────────────────────────────────────────────────────────────────────
const modal = qs('#projectModal');
const modalBody = qs('#projectModalBody');
let lastActiveEl = null;

function setModalOpen(open) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open && lastActiveEl && typeof lastActiveEl.focus === 'function') {
        lastActiveEl.focus();
    }
}

function openProjectModal(id) {
    const p = projects.find(x => x.id === id);
    if (!p || !modalBody) return;
    lastActiveEl = document.activeElement;

    const gallery = Array.isArray(p.gallery) ? p.gallery : [];

    modalBody.innerHTML = `
        <div class="modal-hero">
            <img src="${escapeHtml(buildImageSrc(p.image))}" alt="${escapeHtml(p.title)} screenshot">
        </div>
        ${gallery.length ? `
            <div style="margin-top:1rem;">
                <h3 style="margin-bottom:.6rem;">Screenshots</h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap:.75rem;">
                    ${gallery.map((src, i) => `
                        <img
                            src="${escapeHtml(buildImageSrc(src))}"
                            alt="${escapeHtml(p.title)} screenshot ${i + 2}"
                            style="width:100%;height:110px;object-fit:cover;border-radius:8px;border:1px solid var(--border);"
                            loading="lazy"
                        >
                    `).join('')}
                </div>
            </div>
        ` : ''}
        <div class="modal-header">
            <div>
                <h2 id="modalTitle" style="margin-bottom:0.35rem;">${escapeHtml(p.title)}</h2>
                <p style="color:var(--text-secondary);">${escapeHtml(p.subtitle ?? '')}</p>
            </div>
            <div class="modal-actions" aria-label="Project links">
                ${p.links?.live ? `<a class="pill" href="${escapeHtml(p.links.live)}" target="_blank" rel="noreferrer">Live <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ''}
                ${p.links?.github ? `<a class="pill" href="${escapeHtml(p.links.github)}" target="_blank" rel="noreferrer">GitHub <i class="fab fa-github" aria-hidden="true"></i></a>` : ''}
            </div>
        </div>
        <div style="margin-top:1rem;">
            <h3 style="margin-bottom:.5rem;">Overview</h3>
            <p style="color:var(--text-secondary);">${escapeHtml(p.description)}</p>
        </div>
        ${p.status ? `
            <div style="margin-top:1rem;">
                <span class="project-status">${escapeHtml(p.status)}</span>
            </div>
        ` : ''}
        ${p.highlights?.length ? `
            <div style="margin-top:1rem;">
                <h3 style="margin-bottom:.5rem;">Features</h3>
                <ul style="color:var(--text-secondary); padding-left:1.2rem; line-height:1.8;">
                    ${p.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
        ${p.tags?.length ? `
            <div style="margin-top:1rem;">
                <h3 style="margin-bottom:.5rem;">Tech Stack</h3>
                <div class="project-tech">
                    ${p.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
                </div>
            </div>
        ` : ''}
    `;

    setModalOpen(true);
    qs('.modal-close', modal)?.focus?.();
}

document.addEventListener('click', (e) => {
    const openBtn = e.target.closest?.('[data-project-open]');
    if (openBtn) {
        const id = openBtn.getAttribute('data-project-open');
        if (id) openProjectModal(id);
        return;
    }
    if (e.target.closest?.('[data-modal-close]')) {
        setModalOpen(false);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') {
        setModalOpen(false);
    }
});

// ─── Navbar scroll + scrollspy ────────────────────────────────────────────────
const navbar = qs('.navbar');
const sections = qsa('section[id]');
const navAnchors = qsa('.nav-links a[href^="#"]');

function setActiveNav(id) {
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
    });
}

const spy = ('IntersectionObserver' in window)
    ? new IntersectionObserver((entries) => {
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveNav(visible.target.id);
    }, { rootMargin: '-20% 0px -70% 0px', threshold: [0.1, 0.2, 0.3] })
    : null;

sections.forEach(s => spy?.observe(s));

function onScroll() {
    const y = window.pageYOffset || 0;
    if (navbar) {
        navbar.style.background = 'var(--bg-primary)';
        navbar.style.boxShadow = y > 100 ? 'var(--shadow)' : 'none';
    }
    const back = qs('#backToTop');
    if (back) back.classList.toggle('visible', y > 500);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Back to top ──────────────────────────────────────────────────────────────
qs('#backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

// ─── Contact form feedback ────────────────────────────────────────────────────
const contactForm = qs('.contact-form');
contactForm?.addEventListener('submit', (e) => {
    const submitBtn = qs('button[type="submit"]', contactForm);
    if (!submitBtn) return;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';
    submitBtn.disabled = true;
    // Netlify handles the actual submission; re-enable after delay as fallback
    setTimeout(() => {
        submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane" aria-hidden="true"></i>';
        submitBtn.disabled = false;
    }, 5000);
});

// ─── Dynamic footer year ──────────────────────────────────────────────────────
const footerYear = qs('#footerYear');
if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
}

// ─── Typing effect (skip for reduced motion) ──────────────────────────────────
const heroRole = qs('.hero-role');
const heroCursor = qs('.hero-cursor');

if (heroRole && !prefersReducedMotion) {
    const roles = [
        'Junior Full-Stack Developer',
        'Web Application Developer',
        'Software Development Enthusiast'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeTimer = null;

    // Hide the static cursor blink while typing (JS drives visibility via text)
    if (heroCursor) heroCursor.style.animation = 'none';

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            charIndex--;
            heroRole.textContent = currentRole.substring(0, charIndex);
        } else {
            charIndex++;
            heroRole.textContent = currentRole.substring(0, charIndex);
        }

        // Show/hide cursor
        if (heroCursor) heroCursor.style.opacity = '1';

        let delay = isDeleting ? 42 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing — pause then start deleting
            isDeleting = true;
            if (heroCursor) heroCursor.style.animation = 'blink 1s step-end infinite';
            delay = 2200;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting — move to next role
            isDeleting = false;
            if (heroCursor) heroCursor.style.animation = 'none';
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        } else {
            if (heroCursor) heroCursor.style.animation = 'none';
        }

        typeTimer = setTimeout(typeEffect, delay);
    }

    // Initial delay before starting
    typeTimer = setTimeout(typeEffect, 900);
} else {
    // Reduced motion: just show the first role statically, hide animated cursor
    if (heroRole) heroRole.textContent = 'Junior Full-Stack Developer';
    if (heroCursor) heroCursor.style.display = 'none';
}

// ─── About section: scroll reveal ────────────────────────────────────────────
(function initAboutReveal() {
    if (prefersReducedMotion) {
        qsa('.about-reveal').forEach(el => el.classList.add('is-visible'));
        return;
    }

    const aboutContainer = qs('.about .container');
    if (!aboutContainer) return;

    // Tag direct children for staggered reveal
    [...aboutContainer.children].forEach(el => el.classList.add('about-reveal'));

    if (!('IntersectionObserver' in window)) {
        qsa('.about-reveal').forEach(el => el.classList.add('is-visible'));
        return;
    }

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    qsa('.about-reveal').forEach(el => revealObs.observe(el));
})();

// ─── Experience section: scroll reveal ───────────────────────────────────────
(function initExpReveal() {
    if (prefersReducedMotion) return;
    if (!('IntersectionObserver' in window)) return;

    // Tag each exp-panel for staggered reveal
    qsa('.exp-panel').forEach(panel => panel.classList.add('exp-reveal'));

    const expObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                expObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    qsa('.exp-reveal').forEach(el => expObs.observe(el));
})();

// ─── Console greeting ─────────────────────────────────────────────────────────
console.log('%cTedros Weldegebriel — Junior Full-Stack Developer', 'color: #38bdf8; font-size: 14px; font-weight: 800;');
console.log('%cAksum University · CGPA 3.75/4.00', 'color: #94a3b8; font-size: 12px;');
