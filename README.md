# Portfólio Pessoal Moderno - v2.0

Este é o código-fonte do meu portfólio pessoal, reconstruído para ser moderno, performático e repleto de funcionalidades profissionais. O projeto foi desenvolvido com HTML5, CSS3 e JavaScript puro, com foco em boas práticas de SEO, acessibilidade e experiência do usuário.

## ✨ Funcionalidades Principais

- **Design Responsivo:** Totalmente adaptável para desktops, tablets e dispositivos móveis.
- **Tema Claro/Escuro:** Alternância de tema com persistência no `localStorage` e detecção da preferência do sistema.
- **Seção de Projetos Dinâmica:**
    - Projetos carregados a partir de um arquivo `projects.json`.
    - Filtros por categoria e status.
    - Busca em tempo real por nome ou tecnologia.
    - Modal com detalhes expandidos para cada projeto.
- **Otimizações de Performance:**
    - Lazy loading para imagens.
    - Carregamento `defer` para o JavaScript.
    - Fontes otimizadas com `preconnect`.
- **SEO Avançado:**
    - Meta tags otimizadas (OG, Twitter Cards).
    - Schema.org (JSON-LD) para rich results.
    - `sitemap.xml` e `robots.txt` para melhor indexação.
- **Acessibilidade (WCAG):**
    - Navegação semântica, atributos ARIA e foco gerenciado.
- **Extras Interativos:**
    - Notificações Toast para feedback ao usuário.
    - Barra de progresso de scroll.
    - Cursor customizado e um Easter Egg (Konami Code).

## 🚀 Como Utilizar

Para utilizar este portfólio como base para o seu, siga os passos abaixo.

### 1. Pré-requisitos

- Um editor de código (ex: VS Code).
- Um servidor local para desenvolvimento (ex: Live Server para VS Code).

### 2. Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Personalize o conteúdo:**
   - **`index.html`**:
     - Altere os textos nas seções "Sobre Mim", "Experiência", etc.
     - Substitua a imagem `eu.jpg` pela sua foto de perfil.
     - Na seção `<head>`, atualize as meta tags com suas informações, incluindo o `canonical URL` e os links para `og-image.jpg`.
     - **IMPORTANTE:** No formulário de contato, substitua `"SUA_CHAVE_DE_ACESSO_AQUI"` pela sua chave de acesso do [Web3Forms](https://web3forms.com/).
     - Atualize o código do Google Analytics com o seu ID.

   - **`projects.json`**:
     - Este é o coração da sua seção de projetos. Edite este arquivo para adicionar, remover ou modificar seus projetos.
     - Mantenha a estrutura JSON para cada projeto.
     - As imagens dos projetos devem ser colocadas na pasta `img/projects/`.

   - **`global.css`**:
     - As cores principais dos temas claro e escuro podem ser facilmente alteradas nas variáveis CSS no topo do arquivo (`:root` e `body.dark-mode`).

3. **Arquivos de SEO:**
   - **`sitemap.xml`**: Atualize a `<loc>` com a URL do seu site.
   - **`robots.txt`**: Atualize o link do `Sitemap` com a URL do seu site.

### 3. Executando Localmente

Abra o arquivo `index.html` com o Live Server ou qualquer outro servidor local para visualizar as alterações em tempo real.

## 📁 Estrutura de Arquivos
```
/
├── index.html          # Estrutura principal da página
├── global.css          # Estilos globais e da interface
├── script.js           # Lógica de interatividade e manipulação do DOM
├── projects.json       # Banco de dados dos projetos
├── sitemap.xml         # Mapa do site para SEO
├── robots.txt          # Instruções para crawlers
├── README.md           # Este arquivo
└── img/
    ├── eu.jpg          # Sua foto de perfil
    ├── og-image.jpg    # Imagem para compartilhamento em redes sociais
    └── projects/
        └── ...         # Imagens dos seus projetos
```

## 🎨 Cores das Tecnologias

As cores das tags de tecnologia são definidas no `global.css`. Você pode adicionar novas cores seguindo o padrão:

```css
.tag-typescript { background-color: #3178c6; color: white; }
.tag-nodejs { background-color: #339933; color: white; }
/* Adicione outras tecnologias aqui */
```

Certifique-se de que os nomes das tecnologias no `projects.json` correspondam às classes CSS (em minúsculas).

---

Feito com ❤️ por Vitor Oliveira.
