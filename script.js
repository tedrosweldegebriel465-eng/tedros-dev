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

// Theme Toggle
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

// Mobile Navigation
const hamburger = qs('.hamburger');
const navLinks = qs('.nav-links');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('active');
});

qsa('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navLinks?.classList.remove('active');
    });
});

// Smooth scrolling for anchor links (respect reduced motion)
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

// Fallback data (used if data/projects.json can't be loaded)
const fallbackProjects = [
    {
        id: 'graduate-job-connect',
        title: 'Graduate Job Connect (Job Portal)',
        subtitle: 'Role-based job portal for graduates, employers, and admins',
        description: 'University project job portal with role-based authentication, job posting, applications, admin management, and CV upload.',
        image: 'data/Graduate Job Connect/image.png',
        tags: ['PHP', 'MySQL', 'CSS', 'JavaScript'],
        category: 'Web App',
        links: {
            github: 'https://github.com/tedrosweldegebriel465-eng/Aksum-University---Web-project'
        },
        highlights: ['Role-based authentication', 'Job posting & applications', 'Admin dashboard', 'CV upload']
    },
    {
        id: 'ethiopian-gps',
        title: 'Ethiopian GPS Navigation System',
        subtitle: 'Graph algorithms + analytics + interactive web dashboard',
        description: 'GPS navigation simulation using Dijkstra’s algorithm, geographic calculations, and network analytics, with a Flask-powered interactive dashboard and map visualizations.',
        image: 'data/image samples GPS/image copy.png',
        tags: ['Python', 'Flask', 'Dijkstra', 'Folium', 'Data Viz'],
        category: 'Data / Algorithms',
        links: {
            github: 'https://github.com/tedrosweldegebriel465-eng/Design-and-Analysis-Algorithm-Project'
        },
        highlights: ['Shortest path routing (Dijkstra)', 'Network analytics (centrality)', 'Interactive map dashboard', 'Reports & visualizations']
    },
    {
        id: 'inventory-system',
        title: 'Inventory System (Web Project)',
        subtitle: 'Inventory workflows + management screens',
        description: 'Inventory system web project built for university work. Includes core inventory workflows and management UI.',
        image: 'data/image samples IMS/image copy.png',
        tags: ['PHP', 'CSS', 'JavaScript'],
        category: 'Web App',
        links: {
            github: 'https://github.com/tedrosweldegebriel465-eng/Aksum-University---Web---project'
        },
        highlights: ['Inventory workflows', 'Simple admin-style UI', 'Responsive layout']
    },
    {
        id: 'ai-tutor',
        title: 'AI Learning Tutor (In Progress)',
        subtitle: 'AI-based education assistant for students',
        description: 'An AI-based app to help students learn faster with explanations, practice, and personalized guidance. (Currently in development.)',
        image: 'data/AI Learning Tutor (In Progress)/{1D961B25-3D7A-4977-ADD6-30FECA419095}.png',
        tags: ['AI', 'Education', 'In Progress'],
        category: 'In Progress',
        links: {},
        highlights: ['Personalized learning support', 'Practice + feedback loops', 'Education-focused UX'],
        status: 'In Progress'
    },
    {
        id: 'ai-classroom',
        title: 'AI Classroom Tools (In Progress)',
        subtitle: 'AI utilities for teachers and learning content',
        description: 'A second AI-based educational application focused on helping teachers and improving learning content workflows. (Currently in development.)',
        image: 'data/AI Learning Tutor (In Progress)/image.png',
        tags: ['AI', 'Education', 'In Progress'],
        category: 'In Progress',
        links: {},
        highlights: ['Teacher workflows', 'Content support', 'Better classroom experience'],
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

const writing = [
    {
        title: 'CSS Grid vs Flexbox (Quick guide)',
        date: '2026-04-12',
        excerpt: 'When to use Grid vs Flexbox, and the mental models that make layouts easier.',
        href: '#'
    },
    {
        title: 'JavaScript performance checklist',
        date: '2026-03-29',
        excerpt: 'The small things that add up: rendering, event listeners, and avoiding unnecessary work.',
        href: '#'
    }
];

// Writing render
const writingGrid = qs('#writingGrid');
if (writingGrid) {
    writingGrid.innerHTML = writing.map(post => {
        const date = new Date(post.date);
        const pretty = isNaN(date.getTime()) ? escapeHtml(post.date) : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        return `
            <article class="blog-card">
                <div class="blog-content">
                    <span class="blog-date">${pretty}</span>
                    <h3>${escapeHtml(post.title)}</h3>
                    <p>${escapeHtml(post.excerpt)}</p>
                    <a href="${escapeHtml(post.href)}" class="read-more">Read More →</a>
                </div>
            </article>
        `;
    }).join('');
}

// Projects render + filter/search
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
                <img loading="lazy" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}">
                <div class="project-overlay">
                    <button class="project-link" type="button" data-project-open="${escapeHtml(p.id)}" aria-label="Open ${escapeHtml(p.title)} details">
                        <i class="fas fa-up-right-from-square"></i>
                    </button>
                </div>
            </div>
            <div class="project-content">
                <h3>${escapeHtml(p.title)}</h3>
                <p>${escapeHtml(p.description)}</p>
                <div class="project-tech">
                    ${(p.tags ?? []).slice(0, 6).map(t => `<span>${escapeHtml(t)}</span>`).join('')}
                </div>
                <div class="project-links">
                    <button type="button" class="project-btn" data-project-open="${escapeHtml(p.id)}">Details <i class="fas fa-arrow-right"></i></button>
                    ${p.links?.live ? `<a href="${escapeHtml(p.links.live)}" target="_blank" rel="noreferrer" class="project-btn">Live <i class="fas fa-external-link-alt"></i></a>` : ''}
                    ${p.links?.github ? `<a href="${escapeHtml(p.links.github)}" target="_blank" rel="noreferrer" class="project-btn">GitHub <i class="fab fa-github"></i></a>` : ''}
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

// Load generated projects (Python can keep this updated)
loadProjects().then((loaded) => {
    projects = loaded;
    allCategories = ['All', ...new Set(projects.map(p => p.category))];
    activeCategory = 'All';
    renderFilters();
    renderProjects();
});

// Modal
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
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}">
        </div>
        ${gallery.length ? `
            <div style="margin-top:0.9rem;">
                <h3 style="margin-bottom:.5rem;">Screenshots</h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:.75rem;">
                    ${gallery.map(src => `
                        <a href="${escapeHtml(src)}" target="_blank" rel="noreferrer" class="pill" style="justify-content:center;">
                            <i class="fas fa-image"></i> Open
                        </a>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        <div class="modal-header">
            <div>
                <h2 style="margin-bottom:0.35rem;">${escapeHtml(p.title)}</h2>
                <p>${escapeHtml(p.subtitle ?? p.description)}</p>
            </div>
            <div class="modal-actions" aria-label="Project links">
                ${p.links?.live ? `<a class="pill" href="${escapeHtml(p.links.live)}" target="_blank" rel="noreferrer">Live <i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
                ${p.links?.github ? `<a class="pill" href="${escapeHtml(p.links.github)}" target="_blank" rel="noreferrer">GitHub <i class="fab fa-github"></i></a>` : ''}
            </div>
        </div>
        <div style="margin-top:1rem;">
            <h3 style="margin-bottom:.5rem;">Overview</h3>
            <p style="color:var(--text-secondary);">${escapeHtml(p.description)}</p>
        </div>
        ${(p.status ? `
            <div style="margin-top:1rem;">
                <h3 style="margin-bottom:.5rem;">Status</h3>
                <p style="color:var(--text-secondary);">${escapeHtml(p.status)}</p>
            </div>
        ` : '')}
        ${(p.highlights?.length ? `
            <div style="margin-top:1rem;">
                <h3 style="margin-bottom:.5rem;">Highlights</h3>
                <ul style="color:var(--text-secondary); padding-left:1.2rem;">
                    ${p.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                </ul>
            </div>
        ` : '')}
        ${(p.tags?.length ? `
            <div style="margin-top:1rem;">
                <h3 style="margin-bottom:.5rem;">Tech</h3>
                <div class="project-tech">
                    ${p.tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
                </div>
            </div>
        ` : '')}
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

// Animate skill bars + stats (IntersectionObserver)
const skillBars = qsa('.skill-progress');
const stats = qsa('.stat-number');

const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.classList.contains('skill-progress') && !el.style.width) {
            const width = el.getAttribute('data-width');
            el.style.width = width + '%';
        }
        if (el.classList.contains('stat-number') && !el.hasAttribute('data-animated')) {
            el.setAttribute('data-animated', 'true');
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (!Number.isFinite(target)) return;
            let current = 0;
            const steps = 50;
            const increment = target / steps;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = String(target);
                    clearInterval(timer);
                } else {
                    el.textContent = String(Math.floor(current));
                }
            }, prefersReducedMotion ? 5 : 20);
        }
        io.unobserve(el);
    });
}, { threshold: 0.25 }) : null;

skillBars.forEach(el => io?.observe(el));
stats.forEach(el => io?.observe(el));

// Navbar scroll effect + scrollspy active section
const navbar = qs('.navbar');
const sections = qsa('section[id]');
const navAnchors = qsa('.nav-links a[href^="#"]');

function setActiveNav(id) {
    navAnchors.forEach(a => {
        const href = a.getAttribute('href');
        a.classList.toggle('active', href === `#${id}`);
    });
}

const spy = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActiveNav(visible.target.id);
}, { rootMargin: '-20% 0px -70% 0px', threshold: [0.1, 0.2, 0.3] }) : null;

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

// Back to top
qs('#backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

// Form submission feedback
const contactForm = qs('.contact-form');
contactForm?.addEventListener('submit', () => {
    const submitBtn = qs('button[type="submit"]', contactForm);
    if (!submitBtn) return;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 3000);
});

// Dynamic year in footer
const footerYear = qs('.footer-content p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', String(year));
}

// Typing effect (skip for reduced motion)
const heroTitle = qs('.hero-text h2');
if (heroTitle && !prefersReducedMotion) {
    const roles = ['Front-End Developer', 'UI Enthusiast', 'Problem Solver'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        heroTitle.textContent = isDeleting
            ? currentRole.substring(0, Math.max(0, charIndex - 1))
            : currentRole.substring(0, Math.min(currentRole.length, charIndex + 1));

        charIndex += isDeleting ? -1 : 1;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
        if (isDeleting && charIndex <= 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        setTimeout(typeEffect, isDeleting ? 50 : 90);
    }

    setTimeout(typeEffect, 400);
}

// Console greeting
console.log('%cWelcome to Tedros\' Portfolio', 'color: #38bdf8; font-size: 14px; font-weight: 800;');