// =================================================================================
// PORTFOLIO SCRIPT - V2.0
// Organizado em módulos para melhor legibilidade e manutenção.
// =================================================================================

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------------------------
    // MÓDULO: INICIALIZAÇÃO E ELEMENTOS GLOBAIS
    // -----------------------------------------------------------------------------
    const App = {
        // Seletores de elementos DOM
        elements: {
            themeToggle: document.getElementById('checkbox'),
            progressBar: document.getElementById('progress-bar'),
            scrollToTopBtn: document.getElementById('scrollToTopBtn'),
            mobileNavToggle: document.querySelector('.mobile-nav-toggle'),
            mobileNav: document.getElementById('mobile-nav'),
            navLinks: document.querySelectorAll('.mobile-nav a, .desktop-nav a'),
            toastContainer: document.getElementById('toast-container'),
            projectsGrid: document.getElementById('projects-grid'),
            projectFiltersContainer: document.getElementById('project-filters'),
            searchInput: document.getElementById('search-input'),
            projectModal: document.getElementById('project-modal'),
            modalBody: document.getElementById('modal-body'),
            modalCloseBtn: document.querySelector('.modal-close'),
            currentYearSpan: document.getElementById('current-year'),
            contactForm: document.querySelector('.contact-form'),
        },
        // Estado da aplicação
        state: {
            allProjects: [],
            konamiCode: [],
            konamiPattern: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], // ↑↑↓↓←→←→BA
        },
        // Inicializador principal
        init() {
            // Inicializa todos os módulos
            ThemeManager.init();
            ScrollManager.init();
            Navigation.init();
            ProjectManager.init();
            Effects.init();
            FormHandler.init();

            // Define o ano atual no footer
            if (this.elements.currentYearSpan) {
                this.elements.currentYearSpan.textContent = new Date().getFullYear();
            }
        }
    };

    // -----------------------------------------------------------------------------
    // MÓDULO: GERENCIADOR DE TEMA (CLARO/ESCURO)
    // -----------------------------------------------------------------------------
    const ThemeManager = {
        init() {
            const currentTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (currentTheme) {
                document.body.classList.add(currentTheme);
                if (currentTheme === 'dark-mode') App.elements.themeToggle.checked = true;
            } else if (prefersDark) {
                document.body.classList.add('dark-mode');
                App.elements.themeToggle.checked = true;
                localStorage.setItem('theme', 'dark-mode');
            }

            App.elements.themeToggle.addEventListener('change', this.toggleTheme);
        },
        toggleTheme() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        }
    };

    // -----------------------------------------------------------------------------
    // MÓDULO: GERENCIADOR DE SCROLL E ANIMAÇÕES
    // -----------------------------------------------------------------------------
    const ScrollManager = {
        init() {
            window.addEventListener('scroll', this.handleScroll);
            App.elements.scrollToTopBtn.addEventListener('click', this.scrollToTop);
            this.initIntersectionObserver();
        },
        handleScroll() {
            // Lógica da barra de progresso
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            App.elements.progressBar.style.width = `${scrollProgress}%`;

            // Lógica do botão "Voltar ao Topo"
            if (scrollTop > 300) {
                App.elements.scrollToTopBtn.style.display = 'block';
            } else {
                App.elements.scrollToTopBtn.style.display = 'none';
            }
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        initIntersectionObserver() {
            const sections = document.querySelectorAll('main section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            sections.forEach(section => observer.observe(section));
        }
    };

    // -----------------------------------------------------------------------------
    // MÓDULO: NAVEGAÇÃO (DESKTOP E MOBILE)
    // -----------------------------------------------------------------------------
    const Navigation = {
        init() {
            App.elements.mobileNavToggle.addEventListener('click', this.toggleMobileNav);
            App.elements.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (document.body.classList.contains('mobile-nav-open')) {
                        this.toggleMobileNav();
                    }
                });
            });
            // Adiciona overlay para fechar menu
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', this.toggleMobileNav);
        },
        toggleMobileNav() {
            document.body.classList.toggle('mobile-nav-open');
            App.elements.mobileNav.classList.toggle('open');
            document.querySelector('.overlay').classList.toggle('open');
            const isExpanded = App.elements.mobileNavToggle.getAttribute('aria-expanded') === 'true';
            App.elements.mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
        }
    };

    // -----------------------------------------------------------------------------
    // MÓDULO: GERENCIADOR DE PROJETOS (FETCH, RENDER, FILTRO, BUSCA, MODAL)
    // -----------------------------------------------------------------------------
    const ProjectManager = {
        async init() {
            this.showSkeletonLoader();
            try {
                const response = await fetch('projects.json');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                App.state.allProjects = await response.json();
                this.renderFilterButtons();
                this.renderProjects(App.state.allProjects);
            } catch (error) {
                console.error("Falha ao carregar projetos:", error);
                App.elements.projectsGrid.innerHTML = `<p style="color: var(--secondary-color);">Não foi possível carregar os projetos. Tente novamente mais tarde.</p>`;
            }
            this.addEventListeners();
        },
        addEventListeners() {
            App.elements.projectFiltersContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    this.handleFilterClick(e.target);
                }
            });
            App.elements.searchInput.addEventListener('input', this.debounce(this.handleSearch, 300));
            App.elements.projectsGrid.addEventListener('click', (e) => {
                const projectCard = e.target.closest('.project-card');
                if (!projectCard) return;

                // Rastreia evento para o Google Analytics
                if (typeof gtag === 'function') {
                    gtag('event', 'click', {
                        'event_category': 'Projetos',
                        'event_label': projectCard.dataset.projectName
                    });
                }

                // Abre o modal
                const detailsButton = e.target.closest('.details-btn');
                if (detailsButton) {
                    const projectId = detailsButton.dataset.id;
                    this.openModal(projectId);
                }
            });
            App.elements.modalCloseBtn.addEventListener('click', this.closeModal);
            App.elements.projectModal.addEventListener('click', (e) => {
                 if (e.target === App.elements.projectModal) this.closeModal();
            });
        },
        renderProjects(projects) {
            App.elements.projectsGrid.innerHTML = ''; // Limpa o grid
            if (projects.length === 0) {
                App.elements.projectsGrid.innerHTML = `<p>Nenhum projeto encontrado.</p>`;
                return;
            }
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.dataset.projectName = project.title;

                const technologiesHTML = project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('');

                const badgesHTML = project.badges.map(badge => {
                    const badgeClass = `badge badge-${badge.toLowerCase().replace(' ', '-')}`;
                    return `<span class="${badgeClass}">${badge}</span>`;
                }).join('');

                const githubButton = project.isPublic && project.githubURL
                    ? `<a href="${project.githubURL}" target="_blank" rel="noopener noreferrer" class="github-btn" aria-label="Ver ${project.title} no GitHub"><i class="fab fa-github"></i> GitHub</a>`
                    : `<a class="github-btn disabled" aria-label="Repositório privado"><i class="fab fa-github"></i> Privado</a>`;

                projectCard.innerHTML = `
                    <div class="card-image-container">
                        <img src="${project.image}" alt="Imagem do projeto ${project.title}" class="card-image" loading="lazy">
                        ${!project.isPublic ? '<i class="fas fa-lock privacy-icon" title="Repositório Privado"></i>' : ''}
                        <div class="card-badges">${badgesHTML}</div>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${project.title}</h3>
                        <p class="card-description">${project.description}</p>
                        <div class="card-tags">${technologiesHTML}</div>
                        <div class="card-language">
                            <span class="language-color-dot" style="background-color: ${this.getLanguageColor(project.language)};"></span>
                            <span>${project.language}</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="card-date">${this.formatDate(project.lastUpdate)}</span>
                        <div class="card-buttons">
                            ${githubButton}
                            <button class="details-btn" data-id="${project.id}">Ver Detalhes</button>
                        </div>
                    </div>
                `;
                App.elements.projectsGrid.appendChild(projectCard);
            });
        },
        renderFilterButtons() {
            const categories = ['Todos', ...new Set(App.state.allProjects.map(p => p.category))];
            const statusOrder = ['Concluído', 'Em Desenvolvimento', 'Planejado', 'Futuro'];
            const statuses = ['Status', ...statusOrder];

            let buttonsHTML = categories.map(cat => `<button class="filter-btn ${cat === 'Todos' ? 'active' : ''}" data-filter="${cat}">${cat}</button>`).join('');

            let statusDropdownHTML = `<div class="status-filter">
                <select id="status-select" class="filter-btn">
                    ${statuses.map(stat => `<option value="${stat}">${stat}</option>`).join('')}
                </select>
            </div>`;

            App.elements.projectFiltersContainer.innerHTML = buttonsHTML + statusDropdownHTML;
            document.getElementById('status-select').addEventListener('change', (e) => this.handleFilterClick(e.target, true));
        },
        handleFilterClick(target, isStatus = false) {
            if (!isStatus) {
                document.querySelectorAll('#project-filters .filter-btn').forEach(btn => btn.classList.remove('active'));
                target.classList.add('active');
            }
            this.filterAndRender();
        },
        handleSearch(event) {
            ProjectManager.filterAndRender();
        },
        filterAndRender() {
            const activeCategory = document.querySelector('#project-filters .filter-btn.active').dataset.filter;
            const selectedStatus = document.getElementById('status-select').value;
            const searchTerm = App.elements.searchInput.value.toLowerCase();

            let filteredProjects = App.state.allProjects;

            if (activeCategory !== 'Todos') {
                filteredProjects = filteredProjects.filter(p => p.category === activeCategory);
            }
            if (selectedStatus !== 'Status') {
                filteredProjects = filteredProjects.filter(p => p.status === selectedStatus);
            }
            if (searchTerm) {
                filteredProjects = filteredProjects.filter(p =>
                    p.title.toLowerCase().includes(searchTerm) ||
                    p.technologies.some(t => t.toLowerCase().includes(searchTerm))
                );
            }
            this.renderProjects(filteredProjects);
        },
        openModal(projectId) {
            const project = App.state.allProjects.find(p => p.id === projectId);
            if (!project) return;

            const featuresHTML = project.features.map(f => `<li>${f}</li>`).join('');

            App.elements.modalBody.innerHTML = `
                <img src="${project.image}" alt="${project.title}" style="width:100%; border-radius: 8px;">
                <h3>📌 ${project.title}</h3>
                <p>${project.description}</p>
                <h4>🛠️ Tecnologias</h4>
                <div class="card-tags">${project.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                <h4>✨ Características</h4>
                <ul>${featuresHTML}</ul>
                <h4>📊 Estatísticas</h4>
                <p>⭐ ${project.stars} estrelas | 🔱 ${project.forks} forks</p>
            `;
            App.elements.projectModal.classList.add('visible');
            document.body.style.overflow = 'hidden';
        },
        closeModal() {
            App.elements.projectModal.classList.remove('visible');
            document.body.style.overflow = '';
        },
        showSkeletonLoader() {
             App.elements.projectsGrid.innerHTML = Array(3).fill('').map(() => `
                <div class="skeleton-card">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-content">
                        <div class="skeleton-line" style="width: 70%;"></div>
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line" style="width: 85%;"></div>
                    </div>
                </div>
            `).join('');
        },
        // Helpers
        debounce(func, delay) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), delay);
            };
        },
        formatDate(dateString) {
            if (!dateString) return 'Em breve';
            const date = new Date(dateString);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < 30) return `Atualizado há ${diffDays} dias`;
            const diffMonths = Math.floor(diffDays / 30);
            return `Atualizado há ${diffMonths} ${diffMonths > 1 ? 'meses' : 'mês'}`;
        },
        getLanguageColor(language) {
            const colors = {
                "TypeScript": "#3178c6",
                "JavaScript": "#f7df1e",
                "Java": "#007396",
                "PHP": "#777bb4",
                "C#": "#239120",
                "HTML": "#e34c26",
                "CSS": "#563d7c"
            };
            return colors[language] || '#cccccc'; // Cor padrão
        }
    };

    // -----------------------------------------------------------------------------
    // MÓDULO: EFEITOS ESPECIAIS (TOAST, CURSOR, KONAMI)
    // -----------------------------------------------------------------------------
    const Effects = {
        init() {
            this.initCustomCursor();
            document.addEventListener('keydown', this.handleKonamiCode);
        },
        showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            App.elements.toastContainer.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('show');
            }, 100);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        },
        initCustomCursor() {
            // CSS para o cursor é definido em global.css para melhor performance
        },
        handleKonamiCode(e) {
            App.state.konamiCode.push(e.keyCode);
            if (App.state.konamiCode.length > App.state.konamiPattern.length) {
                App.state.konamiCode.shift();
            }
            if (App.state.konamiCode.join(',') === App.state.konamiPattern.join(',')) {
                document.body.classList.add('matrix-mode');
                Effects.showToast('Matrix Mode Ativado! 🕶️', 'success');
            }
        }
    };

    // -----------------------------------------------------------------------------
    // MÓDULO: GERENCIADOR DO FORMULÁRIO DE CONTATO (WEB3FORMS)
    // -----------------------------------------------------------------------------
    const FormHandler = {
        init() {
            if (App.elements.contactForm) {
                 App.elements.contactForm.addEventListener('submit', this.handleSubmit);
            }
        },
        async handleSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const resultContainer = document.getElementById('form-result');
            resultContainer.innerHTML = 'Enviando...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    Effects.showToast('Mensagem enviada com sucesso!', 'success');
                    resultContainer.innerHTML = '';
                    form.reset();
                } else {
                    throw new Error(result.message || 'Ocorreu um erro.');
                }
            } catch (error) {
                Effects.showToast(`Erro: ${error.message}`, 'error');
                resultContainer.innerHTML = `Erro: ${error.message}`;
            }
        }
    };

    // Inicia a aplicação
    App.init();

    // Exporta a função de Toast para ser usada globalmente, se necessário
    window.showToast = Effects.showToast;
});
