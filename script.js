// =================================================================================
// PORTFOLIO SCRIPT - V2.0 (CORRIGIDO)
// Organizado em módulos para melhor legibilidade e manutenção.
// =================================================================================
// =================================================================================
// FIX: Fallback para projetos quando fetch falha (file:// protocol)
// =================================================================================
const FALLBACK_PROJECTS = [
  {
    "id": "mangues",
    "title": "Mangues",
    "category": "Backend",
    "githubURL": "https://github.com/vitor518/Mangues",
    "isPublic": true,
    "technologies": ["TypeScript", "Node.js"],
    "description": "Sistema completo desenvolvido em TypeScript para gerenciamento eficiente de dados. Implementa arquitetura escalável com tipagem forte e padrões modernos de desenvolvimento.",
    "badges": ["RECENTE", "DESTAQUE"],
    "status": "Concluído",
    "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    "language": "TypeScript",
    "stars": 0,
    "forks": 0,
    "lastUpdate": "2025-06-15",
    "features": [
      "Arquitetura escalável",
      "Tipagem forte com TypeScript",
      "Padrões de desenvolvimento modernos",
      "Gerenciamento de dados eficiente"
    ]
  },
  {
    "id": "authjwt",
    "title": "AuthJWT",
    "category": "Backend",
    "githubURL": "https://github.com/vitor518/AuthJWT",
    "isPublic": false,
    "technologies": ["Node.js", "JWT", "Express", "bcrypt"],
    "description": "Sistema robusto de autenticação e autorização utilizando JSON Web Tokens. Implementa refresh tokens, proteção de rotas, middleware de segurança e hash de senhas com bcrypt.",
    "badges": ["SEGURANÇA"],
    "status": "Concluído",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "lastUpdate": "2025-05-20",
    "features": [
      "Autenticação com JWT",
      "Refresh tokens",
      "Middleware de segurança",
      "Hash de senhas com bcrypt"
    ]
  },
  {
    "id": "teodolito",
    "title": "Teodolito",
    "category": "Frontend",
    "githubURL": "https://github.com/vitor518/Teodolito",
    "isPublic": false,
    "technologies": ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    "description": "Aplicação web interativa para cálculos e visualizações de topografia. Interface intuitiva com manipulação de dados geométricos e renderização visual de medições.",
    "badges": ["FRONTEND"],
    "status": "Concluído",
    "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "lastUpdate": "2025-04-10",
    "features": [
      "Visualização de dados topográficos",
      "Interface interativa com Canvas API",
      "Manipulação de dados geométricos",
      "Renderização visual de medições"
    ]
  },
  {
    "id": "docker-lista-de-tarefas",
    "title": "Docker Lista de Tarefas",
    "category": "DevOps",
    "githubURL": "https://github.com/vitor518/DockerLista-de-Tarefas",
    "isPublic": false,
    "technologies": ["HTML", "CSS", "JavaScript", "Docker", "Docker Compose"],
    "description": "Aplicação de gerenciamento de tarefas containerizada demonstrando boas práticas de DevOps. Inclui Dockerfile otimizado, docker-compose e documentação completa de deploy.",
    "badges": ["DEVOPS"],
    "status": "Concluído",
    "image": "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "lastUpdate": "2025-03-30",
    "features": [
      "Containerização com Docker",
      "Orquestração com Docker Compose",
      "Dockerfile otimizado",
      "Documentação de deploy"
    ]
  },
  {
    "id": "api-rest-spring-boot",
    "title": "API REST Spring Boot",
    "category": "Backend",
    "githubURL": null,
    "isPublic": false,
    "technologies": ["Spring Boot 3", "Spring Data JPA", "PostgreSQL", "Swagger", "Docker"],
    "description": "API RESTful profissional com Spring Boot. Implementa validações com Bean Validation, documentação Swagger/OpenAPI, tratamento global de exceções, testes unitários e containerização.",
    "badges": ["DESTAQUE", "BACKEND"],
    "status": "Em Desenvolvimento",
    "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
    "language": "Java",
    "stars": 0,
    "forks": 0,
    "lastUpdate": "2025-06-25",
    "features": [
      "Validações com Bean Validation",
      "Documentação com Swagger/OpenAPI",
      "Tratamento global de exceções",
      "Testes unitários e de integração"
    ]
  }
];
document.addEventListener('DOMContentLoaded', () => {

    // VARIÁVEL GLOBAL DE FALLBACK (SIMULADA, NECESSÁRIO DEFINIR EM AMBIENTE REAL)
    // const FALLBACK_PROJECTS = [ ... ]; 

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
    // MÓDULO: EFEITOS ESPECIAIS (TOAST, CURSOR, KONAMI)
    // MOVIDO PARA CIMA PARA QUE ThemeManager POSSA CHAMAR showToast
    // -----------------------------------------------------------------------------
    const Effects = {
        init() {
            this.initCustomCursor();
            document.addEventListener('keydown', this.handleKonamiCode);
            // Não mostra toast automático no toggle de tema por padrão
        },
        showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.textContent = message;
            if (!App.elements.toastContainer) return; // Evita erro se o container não existir
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
            // Lógica do cursor customizado (geralmente só precisa do CSS)
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
        },
        // Substitui ícones <i> por SVGs mais detalhados quando Font Awesome não carregar
        replaceIconsWithSVG() {
			const svgMap = {
				'fa-node-js': {
					label: 'Node.js',
					svg: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
					<g fill="#83CD29">
						<path d="M128 8l104 60v120l-104 60L24 188V68z"/>
					</g>
					<text x="128" y="160" font-size="96" text-anchor="middle" fill="#fff" font-family="Helvetica, Arial, sans-serif" font-weight="700">N</text>
				</svg>`
				},
				'fa-react': {
					label: 'React',
					svg: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
					<g fill="none" stroke="#61DAFB" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
						<ellipse cx="128" cy="128" rx="80" ry="28"/>
						<ellipse cx="128" cy="128" rx="28" ry="80" transform="rotate(60 128 128)"/>
						<ellipse cx="128" cy="128" rx="28" ry="80" transform="rotate(-60 128 128)"/>
					</g>
					<circle cx="128" cy="128" r="16" fill="#61DAFB"/>
				</svg>`
				},
				'fa-js': {
					label: 'JavaScript',
					svg: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
					<rect width="256" height="256" rx="24" fill="#F7DF1E"/>
					<text x="128" y="170" font-size="120" text-anchor="middle" fill="#000" font-family="Arial, sans-serif" font-weight="700">JS</text>
				</svg>`
				},
				'fa-java': {
					label: 'Java',
					svg: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
					<g fill="#007396">
						<path d="M64 56c30-18 62-18 92 0-12 10-44 12-46 28-2 18 34 26 46 30-26 16-66 20-92 10 16-18 16-40 0-68z" opacity="0.95"/>
					</g>
					<text x="128" y="200" font-size="26" text-anchor="middle" fill="#007396" font-family="Arial, sans-serif">Java</text>
				</svg>`
				},
				'fa-docker': {
					label: 'Docker',
					svg: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
					<rect x="18" y="90" width="220" height="80" rx="12" fill="#2496ED"/>
					<g fill="#fff">
						<rect x="36" y="68" width="32" height="20"/>
						<rect x="74" y="56" width="32" height="20"/>
						<rect x="112" y="68" width="32" height="20"/>
						<rect x="150" y="56" width="32" height="20"/>
					</g>
				</svg>`
				},
				'fa-github': {
					label: 'GitHub',
					svg: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
					<rect width="256" height="256" rx="24" fill="#24292E"/>
					<path d="M128 52c-42 0-76 34-76 76 0 33 21 61 50 71 4 1 6-2 6-4v-14c-20 4-24-9-24-9-3-8-8-10-8-10-6-4 1-4 1-4 6 1 10 6 10 6 6 10 16 7 20 6 1-5 3-7 6-9-16-2-33-8-33-37 0-8 3-15 8-20-1-2-4-10 1-21 0 0 6-2 20 8 6-2 13-3 20-3s14 1 20 3c14-10 20-8 20-8 5 11 2 19 1 21 5 5 8 12 8 20 0 29-17 35-33 37 3 3 6 8 6 16v24c0 2 2 5 6 4 29-10 50-38 50-71 0-42-34-76-76-76z" fill="#fff"/>
				</svg>`
				},
				'fa-html5': {
					label: 'HTML5',
					svg: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
					<path d="M40 24h176l-16 184L128 232 56 208 40 24z" fill="#E34F26"/>
					<path d="M128 196l40-11 8-90H128v101z" fill="#fff" opacity="0.9"/>
				</svg>`
				},
				'fa-css3-alt': {
					label: 'CSS3',
					svg: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
					<path d="M40 24h176l-16 184L128 232 56 208 40 24z" fill="#264DE4"/>
					<path d="M128 196l40-11 8-90H128v101z" fill="#fff" opacity="0.9"/>
				</svg>`
				}
			};

			document.querySelectorAll('i').forEach(i => {
				const classes = Array.from(i.classList);
				const key = classes.find(c => svgMap[c]);
				if (!key) return;
				const { label, svg } = svgMap[key];
				const span = document.createElement('span');
				span.setAttribute('role', 'img');
				span.setAttribute('aria-label', label);
				span.className = 'icon-fallback';
				span.innerHTML = svg;
				i.replaceWith(span);
			});
		},
    };


    // -----------------------------------------------------------------------------
    // MÓDULO: GERENCIADOR DE TEMA (CLARO/ESCURO)
    // Lógica duplicada e erro de sintaxe corrigidos.
    // -----------------------------------------------------------------------------
    const ThemeManager = {
        init() {
            // Verifica se o elemento existe antes de tentar acessá-lo
            if (!App.elements.themeToggle) return; 
            
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

            // Adiciona o listener APENAS UMA VEZ
            App.elements.themeToggle.addEventListener('change', this.toggleTheme);
        },
        toggleTheme() {
            const wrapper = document.querySelector('.theme-switch-wrapper');

            // Adiciona animação de pulso
            if (wrapper) {
                wrapper.classList.add('pulse');
                setTimeout(() => wrapper.classList.remove('pulse'), 600);
            }
            

            // O 'this' aqui é o elemento 'App.elements.themeToggle' (o checkbox)
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
            if (App.elements.scrollToTopBtn) {
                App.elements.scrollToTopBtn.addEventListener('click', this.scrollToTop);
            }
            this.initIntersectionObserver();
        },
        handleScroll() {
            // Lógica da barra de progresso
            if (App.elements.progressBar) {
                const scrollTop = document.documentElement.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollProgress = (scrollTop / scrollHeight) * 100;
                App.elements.progressBar.style.width = `${scrollProgress}%`;
            }

            // Lógica do botão "Voltar ao Topo"
            if (App.elements.scrollToTopBtn) {
                if (document.documentElement.scrollTop > 300) {
                    App.elements.scrollToTopBtn.style.display = 'block';
                } else {
                    App.elements.scrollToTopBtn.style.display = 'none';
                }
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
            if (App.elements.mobileNavToggle) {
                App.elements.mobileNavToggle.addEventListener('click', this.toggleMobileNav);
            }
            
            App.elements.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Fecha o menu móvel ao clicar em um link
                    if (document.body.classList.contains('mobile-nav-open')) {
                        this.toggleMobileNav();
                    }
                });
            });
            
            // Adiciona overlay para fechar menu (não criar duplicado se já existir no HTML)
            let overlay = document.querySelector('.overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'overlay';
                document.body.appendChild(overlay);
            }
            overlay.addEventListener('click', this.toggleMobileNav);
        },
        // Usamos uma arrow function ou bind para manter o 'this' como 'Navigation'
        // ou definimos como função normal e acessamos elementos globais, como feito aqui.
        toggleMobileNav() {
            if (App.elements.mobileNav) App.elements.mobileNav.classList.toggle('open');
            const overlayEl = document.querySelector('.overlay');
            if (overlayEl) overlayEl.classList.toggle('open');
            const toggleBtn = App.elements.mobileNavToggle;
            if (toggleBtn) {
                const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
                toggleBtn.setAttribute('aria-expanded', String(!expanded));
            }
        }
    };

    // -----------------------------------------------------------------------------
    // MÓDULO: GERENCIADOR DE PROJETOS (FETCH, RENDER, FILTRO, BUSCA, MODAL)
    // Vírgula após init() corrigida.
    // -----------------------------------------------------------------------------
    const ProjectManager = {
        imageObserver: null,
        modalFocusHandler: null,
        previouslyFocusedElement: null,
        async init() {
            this.showSkeletonLoader();
            try {
                // Tenta carregar do JSON
                const response = await fetch('projects.json');
                if (!response.ok) throw new Error('Usando fallback');
                App.state.allProjects = await response.json();
            } catch (error) {
                console.warn("Carregando projetos do fallback (modo local):", error);
                // Usa fallback se fetch falhar (FALLBACK_PROJECTS está definido no topo do script)
                App.state.allProjects = typeof FALLBACK_PROJECTS !== 'undefined' ? FALLBACK_PROJECTS : [];
                // informa no console; evita spam de toast automático para o usuário nesse fluxo
                console.info("Projetos carregados via FALLBACK_PROJECTS:", App.state.allProjects.length);
            }
            this.renderFilterButtons();
            this.renderProjects(App.state.allProjects);
            this.addEventListeners();
        },
        addEventListeners() {
            if (App.elements.projectFiltersContainer) {
                App.elements.projectFiltersContainer.addEventListener('click', (e) => {
                    if (e.target.classList.contains('filter-btn')) {
                        this.handleFilterClick(e.target);
                    }
                });
            }
            if (App.elements.searchInput) {
                App.elements.searchInput.addEventListener('input', this.debounce(this.handleSearch, 300));
            }
            
            if (App.elements.projectsGrid) {
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
            }
            
            if (App.elements.modalCloseBtn) {
                App.elements.modalCloseBtn.addEventListener('click', this.closeModal);
            }

            if (App.elements.projectModal) {
                App.elements.projectModal.addEventListener('click', (e) => {
                    if (e.target === App.elements.projectModal) this.closeModal();
                });
            }
            // Listeners para exportar projetos
            const exportTsBtn = document.getElementById('export-ts');
            const exportMdBtn = document.getElementById('export-md');
            if (exportTsBtn) exportTsBtn.addEventListener('click', () => this.exportAsTypeScript());
            if (exportMdBtn) exportMdBtn.addEventListener('click', () => this.exportAsMarkdown());
        },
        renderProjects(projects) {
            if (!App.elements.projectsGrid) return;
            App.elements.projectsGrid.innerHTML = '';
            if (projects.length === 0) {
                App.elements.projectsGrid.innerHTML = `<p class="no-projects">Nenhum projeto encontrado. Tente redefinir os filtros.</p>`;
                return;
            }
            if (this.imageObserver) {
                this.imageObserver.disconnect();
                this.imageObserver = null;
            }
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.dataset.projectName = project.title;
 
                const technologiesHTML = project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('');
 
                const badgesHTML = project.badges ? project.badges.map(badge => {
                    const badgeClass = `badge badge-${badge.toLowerCase().replace(' ', '-')}`;
                    return `<span class="${badgeClass}">${badge}</span>`;
                }).join('') : '';
 
                const githubButton = project.isPublic && project.githubURL
                    ? `<a href="${project.githubURL}" target="_blank" rel="noopener noreferrer" class="github-btn" aria-label="Ver ${project.title} no GitHub"><i class="fab fa-github"></i> GitHub</a>`
                    : `<a class="github-btn disabled" aria-label="Repositório privado"><i class="fab fa-github"></i> Privado</a>`;
 
                const imgPlaceholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
                projectCard.innerHTML = `
                     <div class="card-image-container">
                        <img src="${imgPlaceholder}" data-src="${project.image}" alt="Imagem do projeto ${project.title}" class="card-image lazy" loading="lazy" aria-hidden="false">
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
            this.initImageObserver();
            if (!window.FA_AVAILABLE) {
                Effects.replaceIconsWithSVG();
            }
        },
        initImageObserver() {
            if ('IntersectionObserver' in window) {
                const imgs = document.querySelectorAll('img.lazy');
                this.imageObserver = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            const src = img.dataset.src;
                            if (src) {
                                img.src = src;
                                img.classList.remove('lazy');
                                obs.unobserve(img);
                            }
                        }
                    });
                }, { rootMargin: '100px 0px', threshold: 0.01 });
                document.querySelectorAll('img.lazy').forEach(img => this.imageObserver.observe(img));
            } else {
                // Fallback: carrega todas imediatamente
                document.querySelectorAll('img.lazy').forEach(img => {
                    if (img.dataset.src) img.src = img.dataset.src;
                });
            }
        },
        attachModalFocusTrap(modalEl) {
            this.previouslyFocusedElement = document.activeElement;
            const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
            const focusable = modalEl.querySelectorAll(focusableSelector);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            // ensure modal content is focusable
            const modalContent = modalEl.querySelector('.modal-content');
            if (modalContent) modalContent.focus();

            this.modalFocusHandler = (e) => {
                if (e.key === 'Tab') {
                    if (focusable.length === 0) {
                        e.preventDefault();
                        return;
                    }
                    if (e.shiftKey) { /* shift+tab */
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else { /* tab */
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                } else if (e.key === 'Escape' || e.key === 'Esc') {
                    e.preventDefault();
                    this.closeModal();
                }
            };
            document.addEventListener('keydown', this.modalFocusHandler);
        },
        detachModalFocusTrap() {
            if (this.modalFocusHandler) {
                document.removeEventListener('keydown', this.modalFocusHandler);
                this.modalFocusHandler = null;
            }
            if (this.previouslyFocusedElement && this.previouslyFocusedElement.focus) {
                this.previouslyFocusedElement.focus();
            }
            this.previouslyFocusedElement = null;
        },
        openModal(projectId) {
            const project = App.state.allProjects.find(p => p.id === projectId);
            if (!project) return;

            const featuresHTML = project.features ? project.features.map(f => `<li>${f}</li>`).join('') : '<li>Nenhuma característica detalhada.</li>';

            if (!App.elements.modalBody || !App.elements.projectModal) return;

            App.elements.modalBody.innerHTML = `
                <img src="${project.image}" alt="${project.title}" style="width:100%; max-height: 400px; object-fit: cover; border-radius: 8px;">
                <h3 id="modal-title">📌 ${project.title}</h3>
                <p>${project.longDescription || project.description}</p>
                <h4>🛠️ Tecnologias</h4>
                <div class="card-tags">${project.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                <h4>✨ Características</h4>
                <ul>${featuresHTML}</ul>
                <h4>📊 Estatísticas</h4>
                <p>⭐ ${project.stars || 0} estrelas | 🔱 ${project.forks || 0} forks</p>
                <div class="modal-buttons-footer">
                    ${project.githubURL ? `<a href="${project.githubURL}" target="_blank" rel="noopener noreferrer" class="github-btn full-width-btn" aria-label="Ver ${project.title} no GitHub"><i class="fab fa-github"></i> Ver no GitHub</a>` : ''}
                     ${project.liveDemoURL && project.liveDemoURL !== "#" ? `<a href="${project.liveDemoURL}" target="_blank" rel="noopener noreferrer" class="live-demo-btn full-width-btn" aria-label="Ver Demo ao Vivo de ${project.title}"><i class="fas fa-external-link-alt"></i> Demo ao Vivo</a>` : ''}
                </div>
            `;
            App.elements.projectModal.classList.add('visible');
            App.elements.projectModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            // attach focus trap
            this.attachModalFocusTrap(App.elements.projectModal);
        },
        closeModal() {
            if (!App.elements.projectModal) return;
            App.elements.projectModal.classList.remove('visible');
            App.elements.projectModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            // detach focus trap and restore focus
            this.detachModalFocusTrap();
        },
        // ---- Export helpers ----
        exportAsTypeScript() {
            const content = `export const PROJECTS = ${JSON.stringify(App.state.allProjects, null, 2)} as const;\n`;
            this.downloadFile(content, 'projects.ts', 'application/typescript');
        },
        exportAsMarkdown() {
            const md = App.state.allProjects.map(p => {
                return `## ${p.title}\n\n**Categoria:** ${p.category}\n\n**Status:** ${p.status}\n\n**Tecnologias:** ${p.technologies.join(', ')}\n\n**Descrição:**\n\n${p.description}\n\n---\n`;
            }).join('\n');
            this.downloadFile(md, 'projects.md', 'text/markdown');
        },
        downloadFile(content, filename, mime) {
            const blob = new Blob([content], { type: mime });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        },
        // Helpers
        debounce(func, delay) {
            let timeout;
            return function (...args) {
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

            if (diffDays <= 7) return `Atualizado há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;

            const diffMonths = Math.floor(diffDays / 30);
            if (diffMonths <= 12) return `Atualizado há ${diffMonths} ${diffMonths > 1 ? 'meses' : 'mês'}`;

            const diffYears = Math.floor(diffDays / 365);
            return `Atualizado há ${diffYears} ${diffYears > 1 ? 'anos' : 'ano'}`;
        },
        getLanguageColor(language) {
            const colors = {
                "TypeScript": "#3178c6",
                "JavaScript": "#f7df1e",
                "Java": "#007396",
                "PHP": "#777bb4",
                "C#": "#239120",
                "HTML": "#e34c26",
                "CSS": "#563d7c",
                "Python": "#3572A5",
                "C++": "#f34b7d",
                "Go": "#00ADD8"
            };
            return colors[language] || '#cccccc'; // Cor padrão
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
            
            if (resultContainer) {
                resultContainer.innerHTML = 'Enviando...';
            }
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                
                if (result.success) {
                    Effects.showToast('Mensagem enviada com sucesso!', 'success');
                    if (resultContainer) resultContainer.innerHTML = '✅ Mensagem enviada!';
                    form.reset();
                } else {
                    // Adicionando tratamento para erros comuns de Web3Forms (ex: campo inválido)
                    let errorMessage = result.message || 'Ocorreu um erro desconhecido.';
                    if (result.errors && result.errors.length > 0) {
                        errorMessage = result.errors.map(err => err.message).join(', ');
                    }
                    throw new Error(errorMessage);
                }
            } catch (error) {
                Effects.showToast(`Erro: ${error.message}`, 'error');
                if (resultContainer) resultContainer.innerHTML = `❌ Erro: ${error.message}`;
            }
        }
    };

    // Inicia a aplicação
    App.init();

    // Exporta a função de Toast para ser usada globalmente, se necessário
    window.showToast = Effects.showToast;

    // DEBUG: Verifica se Font Awesome carregou e aplica fallback inteligente
    window.addEventListener('load', () => {
        const faTest = document.querySelector('.fab, .fas');
        let faAvailable = false;
        if (faTest) {
            const styles = window.getComputedStyle(faTest, ':before');
            const fontFamily = styles.getPropertyValue('font-family') || '';
            faAvailable = fontFamily.toLowerCase().includes('font awesome');
        }
        // Define flag global para uso posterior (ex.: depois da renderização dos projetos)
        window.FA_AVAILABLE = !!faAvailable;
        if (window.FA_AVAILABLE) {
            console.log('✅ Font Awesome carregado com sucesso!');
        } else {
            console.warn('❌ Font Awesome NÃO carregou - aplicando fallback SVG.');
            Effects.replaceIconsWithSVG();
        }
    });
});