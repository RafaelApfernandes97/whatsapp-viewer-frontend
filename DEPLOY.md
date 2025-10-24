# Guia de Deploy - Frontend

## Deploy no Easypanel

### 1. Criar Novo Serviço

1. Acesse o Easypanel
2. Vá para seu projeto
3. Clique em "Create Service" → "App"
4. Escolha "From Source"

### 2. Configurar Repositório

- **Repository URL**: URL do repositório frontend (GitHub/GitLab)
- **Branch**: `main` ou `master`
- **Build Method**: Docker

### 3. Configurar Variáveis de Ambiente

No Easypanel, vá para a aba "Environment" e adicione:

```
VITE_API_URL=https://seu-backend.easypanel.host/api
```

**IMPORTANTE**:
- Use a URL completa do backend (incluindo `https://`)
- Adicione `/api` no final
- Exemplo: `https://primazzo-viewer-api.easypanel.host/api`

### 4. Configurar Domínio

1. Vá para a aba "Domains"
2. Adicione um domínio personalizado ou use o domínio gerado
3. Habilite HTTPS (recomendado)

### 5. Configurar Porta

- O Dockerfile expõe a porta **80** (Nginx)
- No Easypanel, configure a porta como **80**

### 6. Deploy

1. Clique em "Deploy"
2. Aguarde o build completar (pode demorar alguns minutos)
3. Verifique os logs para confirmar sucesso

### 7. Verificar Aplicação

1. Acesse o domínio configurado
2. Você deve ver a tela de login
3. Teste o login com usuário e senha do backend

## Opção Alternativa: Deploy Estático

Se preferir não usar um serviço separado, você pode servir o frontend pelo backend:

### Build Local

```bash
# Clone o repositório
git clone <seu-repo-frontend>
cd whatsapp-viewer-frontend

# Configure a variável de ambiente
echo "VITE_API_URL=/api" > .env

# Instale dependências e faça build
npm install
npm run build
```

### Copiar para Backend

```bash
# Copie a pasta dist/ para o diretório public/ do backend
cp -r dist/* ../whatsapp-viewer-backend/public/
```

Dessa forma, o backend servirá o frontend automaticamente.

## Problemas Comuns

### Erro: "Network Error" ao fazer login

- A variável `VITE_API_URL` está incorreta ou não configurada
- Verifique se a URL do backend está correta e acessível
- Confirme que o backend está rodando

### Erro de CORS

- Configure o backend para permitir requisições do domínio do frontend
- No backend, adicione o domínio do frontend nas configurações de CORS

### Build falhando: "vite: not found"

- Certifique-se de que o Dockerfile está correto
- O `npm ci` deve instalar todas as dependências (incluindo devDependencies)
- Não use `--only=production` no estágio de build

### Página em branco após deploy

- Verifique os logs do browser (Console)
- Confirme que `VITE_API_URL` está configurada corretamente
- Verifique se os arquivos foram copiados corretamente

## Configuração de Recursos

Recomendado para produção:

- **CPU**: 0.1 - 0.25 vCPU (Nginx é leve)
- **Memory**: 128MB - 256MB
- **Replicas**: 1 (ou mais para alta disponibilidade)

## CORS (Cross-Origin Resource Sharing)

Se o frontend e backend estiverem em domínios diferentes, configure CORS no backend:

```javascript
// No backend (server.js)
const cors = require('cors');
app.use(cors({
  origin: 'https://seu-frontend.easypanel.host',
  credentials: true
}));
```

## Cache e Performance

O Nginx já está configurado para cachear arquivos estáticos. Para melhor performance:

1. Use CDN se disponível
2. Configure cache headers no Nginx (se necessário)
3. Minimize o tamanho do bundle (Vite já otimiza)

## Atualização

Para atualizar a aplicação:

1. Faça push das mudanças para o repositório
2. No Easypanel, clique em "Redeploy" ou configure auto-deploy
3. Aguarde o build completar
4. Faça um hard refresh no browser (Ctrl+F5) para limpar cache
