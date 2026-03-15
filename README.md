# 🗂️ Portfolio

Site de portfolio pessoal com painel de administração protegido. Feito com React + Vite, Netlify CMS, e hospedado no Netlify.

---

## 🚀 Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + Vite |
| Roteamento | React Router v6 |
| Estilo | CSS Modules |
| CMS / Admin | Netlify CMS |
| Autenticação do admin | Netlify Identity (só tu tens acesso) |
| Hosting | Netlify |
| Repositório | GitHub |

---

## 📁 Estrutura

```
portfolio/
├── public/
│   ├── admin/
│   │   ├── index.html        # Painel de admin (protegido por login)
│   │   └── config.yml        # Configuração do CMS (campos, coleções)
│   ├── content/
│   │   ├── projects.json     # Dados dos projetos (editados pelo admin)
│   │   └── about.json        # Dados do "Sobre mim"
│   ├── images/               # Imagens dos projetos (geridas pelo CMS)
│   ├── _headers              # Headers de segurança HTTP
│   └── robots.txt
├── src/
│   ├── components/           # Layout, ProjectCard
│   ├── pages/                # Home, Projects, ProjectDetail, About
│   ├── data/                 # useContent.js (fetch de JSON)
│   ├── styles/               # global.css
│   └── App.jsx
├── netlify.toml              # Config de build e redirects
├── vite.config.js
└── .gitignore                # NUNCA faz commit de .env ou segredos
```

---

## ⚡ Setup Local

```bash
# 1. Instala dependências
npm install

# 2. Arranca o servidor de desenvolvimento
npm run dev

# Abre http://localhost:5173
```

---

## 🌍 Deploy no Netlify (passo a passo)

### 1. Cria repositório no GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/SEU-UTILIZADOR/portfolio.git
git push -u origin main
```

### 2. Liga ao Netlify

1. Vai a [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
2. Escolhe o teu repositório GitHub
3. Configurações de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Clica **Deploy site**

### 3. Ativa o Netlify Identity (para o admin)

1. No painel Netlify: **Site settings → Identity → Enable Identity**
2. Em **Registration preferences** → seleciona **Invite only** ⚠️ (CRÍTICO para segurança)
3. Vai a **Identity → Git Gateway → Enable Git Gateway**
4. Convida o teu email: **Identity → Invite users**
5. Aceita o email de convite — só assim consegues entrar no `/admin/`

### 4. Acede ao painel de admin

```
https://SEU-SITE.netlify.app/admin/
```

Faz login com o teu email. Só tu tens acesso.

---

## 🔐 Segurança no GitHub

### O que está protegido:

| Item | Como |
|------|------|
| Credenciais do admin | Netlify Identity (não estão no repo) |
| Variáveis de ambiente | `.env` está no `.gitignore` |
| Painel `/admin/` | Login obrigatório + Invite only |
| Headers HTTP | `_headers` com X-Frame-Options, XSS protection, etc. |
| Indexação do admin | `robots.txt` bloqueia crawlers |

### Nunca commites:
- `.env` ou `.env.local`
- Passwords ou tokens
- Chaves privadas

---

## ✏️ Como adicionar/editar projetos

1. Vai a `https://SEU-SITE.netlify.app/admin/`
2. Faz login
3. Clica em **Projects → New Project**
4. Preenche os campos:
   - Título, categoria, descrição
   - Imagem de capa (upload direto)
   - URL do site ao vivo, GitHub
   - Tecnologias (tags)
   - Documento PDF (opcional)
   - Marcar como destaque
5. Clica **Save** → o site atualiza automaticamente

---

## 🎨 Personalizar o design

Edita as variáveis CSS em `src/styles/global.css`:

```css
:root {
  --accent: #d4a853;    /* cor principal dourada */
  --bg: #0a0a08;        /* fundo escuro */
  --text: #f0ede8;      /* texto principal */
  /* ... */
}
```

---

## 📦 Build manual

```bash
npm run build
# Output em /dist — pronto para deploy
```

---

## 🛠️ Comandos úteis

```bash
npm run dev       # Desenvolvimento local
npm run build     # Build de produção
npm run preview   # Preview do build
```
