// JavaScript Avançado para o Portfólio

// 1. Tema Claro/Escuro (Dark Mode)
const themeToggle = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeToggle.checked = true;
    }
} else {
    // Define um tema padrão baseado na preferência do sistema, se não houver um salvo
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', 'light-mode');
    }
}

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});

// 2. Smooth Scroll para navegação interna com ajuste de foco
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Garante que o elemento receba foco após o scroll, para acessibilidade
            setTimeout(() => {
                targetElement.focus();
                if (targetElement.tabIndex === -1) { // Se não tiver tabindex, atribui um para ser focável
                    targetElement.setAttribute('tabindex', '-1');
                }
            }, 500);
        }
    });
});

// 3. Efeito Ripple animado em botões e links de projeto
document.querySelectorAll('.button-gradient, .button-gradient-submit, .projeto-item a').forEach(el => {
    el.addEventListener('click', function (e) {
        this.querySelectorAll('.ripple').forEach(ripple => ripple.remove());

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        ripple.addEventListener('animationend', () => ripple.remove());
    });

    // Efeito sutil de scale no hover/leave
    el.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    el.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 4. Fade-in/out das seções com Intersection Observer
const sections = document.querySelectorAll('main section');
const observerOptions = {
    threshold: 0.15 // A seção se torna visível quando 15% dela está na viewport
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: Para observar apenas uma vez e parar
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});
// Garante que a primeira seção já esteja visível ao carregar
document.getElementById('sobre-mim').classList.add('visible');


// 5. Efeito Neon na foto de perfil ao interagir
const profilePhoto = document.querySelector('.profile-photo');
if (profilePhoto) {
    const applyNeonEffect = () => {
        profilePhoto.style.boxShadow = '0 0 40px 8px var(--primary-color), 0 0 80px 16px var(--secondary-color)';
        profilePhoto.style.borderColor = 'var(--primary-color)';
    };

    const removeNeonEffect = () => {
        // Ao sair/perder foco, resetar para as sombras e bordas padrão do tema atual
        if (document.body.classList.contains('dark-mode')) {
            profilePhoto.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
            profilePhoto.style.borderColor = '#333';
        } else {
            profilePhoto.style.boxShadow = '0 8px 32px var(--shadow-medium)';
            profilePhoto.style.borderColor = 'var(--text-light)';
        }
    };

    profilePhoto.addEventListener('mouseenter', applyNeonEffect);
    profilePhoto.addEventListener('mouseleave', removeNeonEffect);
    profilePhoto.addEventListener('focusin', applyNeonEffect);
    profilePhoto.addEventListener('focusout', removeNeonEffect);
}

// 6. Efeito de destaque nos títulos (h2) ao clicar/focar
document.querySelectorAll('h2').forEach(title => {
    title.addEventListener('click', () => {
        // Obtém as cores dinamicamente do CSS, considerando o tema atual
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();

        title.animate([
            { color: primaryColor, letterSpacing: '1px', borderLeftWidth: '6px' },
            { color: secondaryColor, letterSpacing: '2px', borderLeftWidth: '10px' }, // Ajustado para 2px/10px como no CSS
            { color: primaryColor, letterSpacing: '1px', borderLeftWidth: '6px' }
        ], { duration: 600, easing: 'ease-in-out' });
    });
    title.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            title.click(); // Simula o clique para acionar a animação
        }
    });
});

// 7. Funcionalidade de copiar email com feedback visual
const emailContact = document.getElementById('email-contact');
const copyFeedback = document.getElementById('copy-feedback');

if (emailContact && copyFeedback) {
    emailContact.addEventListener('click', function(e) {
        e.preventDefault(); // Impede a navegação padrão do link

        const email = this.textContent.trim();
        navigator.clipboard.writeText(email).then(() => {
            copyFeedback.classList.add('show');
            setTimeout(() => {
                copyFeedback.classList.remove('show');
            }, 2000); // Exibe por 2 segundos
        }).catch(err => {
            console.error('Falha ao copiar email: ', err);
            alert('Erro ao copiar email. Por favor, copie manualmente: ' + email);
        });
        // Ainda abre o cliente de email após copiar
        window.location.href = 'mailto:' + email;
    });
}

// 8. Botão Scroll-to-Top (Melhorado para UX e Acessibilidade)
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
        scrollToTopBtn.style.opacity = "1"; // Torna visível e opaco
    } else {
        scrollToTopBtn.style.display = "none";
        scrollToTopBtn.style.opacity = "0"; // Esconde e torna transparente
    }
});

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 9. Validação simples de formulário (Formspree lida com o principal, mas isso dá feedback imediato)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const messageInput = document.getElementById('form-message');

        if (!nameInput.value.trim()) {
            alert('Por favor, preencha seu nome.');
            nameInput.focus(); // Foca no campo para correção
            e.preventDefault(); // Impede o envio do formulário
            return;
        }
        if (!emailInput.value.trim() || !/\S+@\S+\.\S+/.test(emailInput.value)) {
            alert('Por favor, insira um e-mail válido.');
            emailInput.focus();
            e.preventDefault();
            return;
        }
        if (!messageInput.value.trim()) {
            alert('Por favor, digite sua mensagem.');
            messageInput.focus();
            e.preventDefault();
            return;
        }
        // Se tudo estiver OK, o Formspree lidará com o envio.
        // O alert é só para feedback visual imediato.
        alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
    });
}

// 10. Animação de carregamento suave para a página
window.addEventListener('load', () => {
    document.body.classList.remove('preload');
    // Adicione aqui a lógica de animação de carregamento, se necessário.
});