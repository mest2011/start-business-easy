# Empreendedor Digital - Portal SPA

O **Empreendedor Digital** é uma Single Page Application (SPA) moderna desenvolvida para centralizar a gestão de negócios digitais. O portal oferece ferramentas completas para marketing, vendas, finanças e presença online, com foco em usabilidade e design premium.

---

## Tecnologias Utilizadas

- **Core**: React 19 + TypeScript
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS
- **Ícones**: Font Awesome 6
- **Persistência**: `localStorage` (API Layer simulada)
- **Design**: Fiel aos wireframes originais com foco em UX/UI moderna.

---

## Módulos Principais

### Dashboard Central
Visão panorâmica do negócio, integrando métricas de todos os módulos, lista de tarefas e notificações em tempo real.

### Central de Marketing
Gestão de campanhas publicitárias, controle de orçamento dinâmico e recomendações inteligentes de IA para otimização de verba.

### Pipeline de Vendas (Funil)
Quadro Kanban interativo para gestão de leads, acompanhamento de metas mensais e captura rápida de novos contatos.

### Planejamento Financeiro
Controle rigoroso de fluxo de caixa, gestão de Contas a Pagar/Receber com sistema de baixa manual e exportação de extratos em CSV.

### Presença Digital
Hub de ativos digitais, monitoramento de SSL/Domínio, checklist de presença online e auditoria básica de SEO.

### Gestão de Mídias Sociais
Calendário de conteúdo interativo para planejamento, agendamento de posts e visualização de rascunhos.

---

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
1. Clone o repositório.
2. Navegue até a pasta do aplicativo:
   ```bash
   cd app
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Desenvolvimento
Inicie o servidor local:
```bash
npm run dev
```

### Build de Produção
Gere os arquivos otimizados para deploy:
```bash
npm run build
```

---

## Publicação no GitHub Pages

Siga este tutorial para publicar seu projeto gratuitamente no GitHub Pages.

### 1. Preparação do Repositório
Certifique-se de que seu projeto está em um repositório no GitHub.

### 2. Instale o pacote de deploy
No terminal, dentro da pasta `app`, execute:
```bash
npm install gh-pages --save-dev
```

### 3. Configure o `package.json`
Adicione a propriedade `homepage` no topo do arquivo (substitua `seu-usuario` e `nome-do-repo`):
```json
"homepage": "http://seu-usuario.github.io/nome-do-repo",
```

E adicione os scripts de deploy:
```json
"scripts": {
  ...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist --add"
}
```

### 4. Configure o `vite.config.ts`
Certifique-se de que a propriedade `base` está correta:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/nome-do-repo/', // Ex: '/tools/'
})
```

### 5. Deploy
Execute o comando final:
```bash
npm run deploy
```

O projeto será buildado e enviado automaticamente para a branch `gh-pages`. Vá em **Settings > Pages** no seu repositório no GitHub e selecione a branch `gh-pages` como fonte.

---

## Licença

Este projeto é de uso privado e educacional.
© 2025 Empreendedor Digital.
