# WhatsApp Viewer - Frontend

Interface web para visualização de conversas do WhatsApp exportadas.

## Tecnologias

- React 18
- Vite
- Axios (HTTP client)

## Requisitos

- Node.js 20+

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

### Variáveis de Ambiente

- `VITE_API_URL` - URL do backend da aplicação

**Desenvolvimento:**
```
VITE_API_URL=http://localhost:3001/api
```

**Produção:**
```
VITE_API_URL=https://outros-primazzo-back.8a2h9d.easypanel.host/api
```

## Desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## Build para Produção

```bash
npm run build
```

Os arquivos de build estarão na pasta `dist/`

## Preview da Build

```bash
npm run preview
```

## Docker

### Build

```bash
docker build -t whatsapp-viewer-frontend .
```

### Run

```bash
docker run -p 80:80 whatsapp-viewer-frontend
```

## Deploy no Easypanel

### Opção 1: Servir via Nginx (Recomendado)

1. Crie um novo serviço no Easypanel
2. Conecte ao repositório do frontend
3. Configure a variável de ambiente `VITE_API_URL` com a URL do backend
4. Deploy!

O Dockerfile já está configurado para usar Nginx e servir os arquivos estáticos.

### Opção 2: Servir pelo Backend

Se preferir, você pode fazer o build do frontend e copiar a pasta `dist/` para o backend servir os arquivos estáticos. Neste caso, não precisa de um serviço separado.

## Estrutura de Pastas

```
frontend/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── Login.jsx        # Página de login
│   ├── main.jsx         # Entry point
│   └── *.css           # Estilos
├── index.html          # HTML principal
├── vite.config.js      # Configuração do Vite
├── package.json        # Dependências
├── Dockerfile          # Container Docker
└── .env               # Configurações (não versionado)
```

## Configuração da API

A URL da API é configurada via variável de ambiente `VITE_API_URL`. O Vite automaticamente expõe variáveis que começam com `VITE_` para o código do frontend.

Para usar no código:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

## Licença

MIT
