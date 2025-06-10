# 🎮⚔️ RPG Portfolio - Gabriel Teles Rosa

Uma experiência épica de portfolio inspirada em RPG, combinando desenvolvimento frontend moderno com design temático medieval.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-pink?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

## 🏆 Sobre o Projeto

Este portfolio representa a jornada de **Gabriel Teles Rosa**, um Frontend Developer apaixonado por RPGs, apresentando suas habilidades técnicas através de uma experiência interativa inspirada em D&D.

### ✨ Características Principais

- 🎲 **Sistema RPG Interativo** - Ficha de personagem D&D funcional
- 📊 **Visualização de Skills** - Barras de progresso animadas para tecnologias
- 🎯 **Sistema de Achievements** - Conquistas desbloqueáveis
- 🌙 **Dark/Light Mode** - Tema dinâmico com persistência
- 📧 **Formulário de Contato** - Integração real com EmailJS
- 🎨 **Animações Épicas** - Partículas mágicas e efeitos visuais
- 📱 **Design Responsivo** - Experiência otimizada para todos os dispositivos
- ♿ **Acessibilidade** - Conformidade com padrões WCAG

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações

### Funcionalidades
- **EmailJS** - Sistema de envio de emails
- **Lucide React** - Ícones modernos e acessíveis
- **Font Optimization** - Google Fonts com display:swap

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação automática de código
- **TypeScript** - Verificação de tipos

## 📁 Estrutura do Projeto

```
rpg-portfolio/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── layout.tsx          # Layout principal com SEO
│   │   ├── page.tsx            # Página principal
│   │   └── globals.css         # Estilos globais
│   ├── components/             # Componentes reutilizáveis
│   │   └── CharacterSheet.tsx  # Ficha do personagem
│   ├── hooks/                  # Custom hooks
│   │   └── useRPGSystem.ts     # Lógica do sistema RPG
│   ├── types/                  # Definições TypeScript
│   │   └── character.ts        # Interfaces do personagem
│   ├── config/                 # Configurações
│   │   └── constants.ts        # Constantes da aplicação
│   └── data/                   # Dados estáticos
│       └── character.ts        # Dados do personagem
├── public/                     # Assets estáticos
├── tailwind.config.ts          # Configuração Tailwind
├── tsconfig.json               # Configuração TypeScript
└── package.json                # Dependências
```

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js 18.0 ou superior
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/BielTeles/rpg-portfolio.git
   cd rpg-portfolio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o EmailJS** (opcional)
   - Acesse [EmailJS](https://www.emailjs.com/)
   - Configure seu serviço de email
   - Atualize as credenciais em `src/config/constants.ts`

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

## 📧 Configuração do EmailJS

Para ativar o sistema de contato:

1. Crie uma conta no [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email
3. Crie um template de email
4. Atualize o arquivo `src/config/constants.ts`:

```typescript
export const EMAIL_CONFIG = {
  SERVICE_ID: "seu_service_id",
  TEMPLATE_ID: "seu_template_id",
  PUBLIC_KEY: "sua_public_key",
} as const;
```

## 🎯 Funcionalidades Implementadas

### ✅ Sistema RPG Completo
- Ficha de personagem D&D autêntica
- Atributos com modificadores calculados
- Sistema de skills por categoria
- Saving throws funcionais
- Sistema de experiência e level

### ✅ Interatividade
- Rolagem de dados D20
- Sistema de achievements
- Animações de partículas mágicas
- Hover effects épicos

### ✅ Seções do Portfolio
- **Character Sheet** - Informações pessoais e skills
- **Quest Log** - Projetos e experiências
- **Adventure Timeline** - Histórico profissional
- **Hall of Fame** - Certificações e conquistas
- **Tavern Contact** - Formulário de contato

### ✅ Otimizações
- SEO otimizado com metadados completos
- Performance otimizada
- Lazy loading de componentes
- Font optimization
- Image optimization

## 🏗️ Boas Práticas Implementadas

### Arquitetura
- **Separação de responsabilidades** - Hooks, componentes, dados
- **Tipagem forte** - TypeScript em toda aplicação
- **Modularização** - Componentes reutilizáveis
- **Configuração centralizada** - Constants e configs separados

### Performance
- **Code splitting** - Carregamento otimizado
- **Memoização** - useCallback e useMemo
- **Lazy loading** - Componentes sob demanda
- **Font optimization** - Google Fonts otimizadas

### Acessibilidade
- **Semantic HTML** - Estrutura semântica
- **ARIA labels** - Acessibilidade para screen readers
- **Keyboard navigation** - Navegação por teclado
- **Color contrast** - Contraste adequado

### SEO
- **Meta tags** - Open Graph e Twitter Cards
- **Structured data** - Schema.org
- **Sitemap** - Mapeamento de páginas
- **Performance** - Core Web Vitals otimizados

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar aplicação
npm start

# Linting
npm run lint

# Linting com correção automática
npm run lint:fix
```

## 📊 Métricas de Performance

- **Lighthouse Score**: 95+ em todas as categorias
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🎨 Design System

### Paleta de Cores
- **Primária**: Âmbar/Dourado (RPG theme)
- **Secundária**: Vermelho medieval
- **Acentos**: Azul, Verde, Roxo para raridades
- **Dark Mode**: Cinza escuro com acentos dourados

### Tipografia
- **Headings**: Cinzel (Medieval serif)
- **Body**: Inter (Modern sans-serif)
- **Code**: Fira Code (Monospace)

### Componentes
- Cards com bordas temáticas
- Botões com animações épicas
- Barras de progresso animadas
- Modais com efeitos mágicos

## 🔧 Personalização

Para personalizar o portfolio:

1. **Dados Pessoais**: Edite `src/data/character.ts`
2. **Configurações**: Modifique `src/config/constants.ts`
3. **Estilos**: Ajuste `tailwind.config.ts`
4. **Animações**: Configure `src/hooks/useRPGSystem.ts`

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Gabriel Teles Rosa**
- GitHub: [@BielTeles](https://github.com/BielTeles)
- LinkedIn: [Gabriel Teles Rosa](https://linkedin.com/in/gabriel-teles-rosa)
- Email: gabriel.teles@example.com

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**

**Desenvolvido com ❤️ e muita ☕ em Goiânia, Brasil**
