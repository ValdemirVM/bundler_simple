const fs = require('fs');
const path = require('path');

// Estrutura do projeto
const projectStructure = {
    "components": {
        "noscript.html": `<noscript>
    <style type="text/css">
      .container-fluid { display: none; }
      .container { display: none; }
      .row { display: none; }
    </style>
    <p><br /></p>
    <p>SEU NAVEGADOR ESTÁ COM O JAVASCRIPT DESABILITADO!</p>
</noscript>`,
        "loading.html": `<!-- Loading -->
<div class="loading-overlay" id="loadingOverlay">
    <div class="spinner"></div>
    &nbsp;&nbsp;
    <small>CARREGANDO SISTEMA...</small>
</div>`,
        "sidebar.html": `<div id="sidebar-container">Sidebar content here.</div>`
    },
    "css": {
        "style.css": `body { font-family: Arial, sans-serif; }`
    },
    "img": {
        "example.png": "" // Você pode adicionar seus dados de imagem base64 aqui ou deixar em branco
    },
    "js": {
        "index.js": `import { commonFunction } from './modules/commonFunctions.js';

// Função para carregar CSS com timestamp
function loadCSS(href, id) {
    const link = document.getElementById(id);
    const timestamp = new Date().getTime();
    link.href = \`\${href}?v=\${timestamp}\`;
}

// Função para carregar JS com timestamp
function loadJS(src, id) {
    const script = document.getElementById(id);
    const timestamp = new Date().getTime();
    script.src = \`\${src}?v=\${timestamp}\`;
}

// Carregar as bibliotecas CSS de CDN
loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', 'bootstrap-css');
loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css', 'fontawesome-css');

// Carregar as bibliotecas JS de CDN
loadJS('https://code.jquery.com/jquery-3.7.1.min.js', 'jquery-js');
loadJS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', 'bootstrap-js');

commonFunction();
console.log('Bibliotecas carregadas dinamicamente na Página Inicial!');

// Função para esconder o loading de carregamento
function hideLoadingOverlay() {
    setTimeout(function() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }, 1000); // 1000 milissegundos = 1 segundo
}

// Carregar components html
async function loadHTML(url, targetElementId, callback) {
    try {
        // Realiza a requisição HTTP para o URL especificado
        const response = await fetch(url);
        // Converte o corpo da resposta em texto
        const content = await response.text();
        // Obtém o elemento de destino pelo ID
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            // Insere o conteúdo carregado no elemento de destino
            targetElement.innerHTML = content;
            // Executa a função de callback, se fornecida
            if (callback) {
                callback();
            }
        } else {
            console.error(\`Elemento com ID \${targetElementId} não encontrado.\`);
        }
    } catch (error) {
        // Captura e exibe erros, se ocorrerem
        console.error(\`Erro ao carregar o conteúdo de \${url}:\`, error);
    }
}

// Carregar html
document.addEventListener("DOMContentLoaded", () => {
    loadHTML('/components/noscript.html', 'msg-noscript');
    loadHTML('/components/loading.html', 'loading-page', hideLoadingOverlay);
    loadHTML('/components/sidebar.html', 'sidebar-container');
});`,
        "page1.js": `import { commonFunction } from './modules/commonFunctions.js';

// Função para carregar CSS com timestamp
function loadCSS(href, id) {
    const link = document.getElementById(id);
    const timestamp = new Date().getTime();
    link.href = \`\${href}?v=\${timestamp}\`;
}

// Função para carregar JS com timestamp
function loadJS(src, id) {
    const script = document.getElementById(id);
    const timestamp = new Date().getTime();
    script.src = \`\${src}?v=\${timestamp}\`;
}

// Carregar as bibliotecas CSS de CDN
loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', 'bootstrap-css');
loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css', 'fontawesome-css');

// Carregar as bibliotecas JS de CDN
loadJS('https://code.jquery.com/jquery-3.7.1.min.js', 'jquery-js');
loadJS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', 'bootstrap-js');

commonFunction();
console.log('Bibliotecas carregadas dinamicamente na Página 1!');`,
        "page2.js": `import { commonFunction } from './modules/commonFunctions.js';

// Função para carregar CSS com timestamp
function loadCSS(href, id) {
    const link = document.getElementById(id);
    const timestamp = new Date().getTime();
    link.href = \`\${href}?v=\${timestamp}\`;
}

// Função para carregar JS com timestamp
function loadJS(src, id) {
    const script = document.getElementById(id);
    const timestamp = new Date().getTime();
    script.src = \`\${src}?v=\${timestamp}\`;
}

// Carregar as bibliotecas CSS de CDN
loadCSS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', 'bootstrap-css');
loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css', 'fontawesome-css');

// Carregar as bibliotecas JS de CDN
loadJS('https://code.jquery.com/jquery-3.7.1.min.js', 'jquery-js');
loadJS('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', 'bootstrap-js');

commonFunction();
console.log('Bibliotecas carregadas dinamicamente na Página 2!');`,
        "modules": {
            "commonFunctions.js": `export function commonFunction() {
    console.log('Função comum executada!');
}`
        },
        "libs": {
            "polyfills.js": `// Adicione aqui os polyfills necessários`
        }
    },
    "scss": {
        "style.scss": `$primary-color: #3498db;

body {
  font-family: Arial, sans-serif;
  background-color: $primary-color;
  color: #fff;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

img {
  max-width: 100%;
}

/* Sistema de loading */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #333;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 1s linear infinite;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}`
    },
    "index.html": `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="pragma" content="no-cache">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="Valdemir Vinagre Mendes">
    <meta property="og:title" content="">
    <meta property="og:description" content="">
    <meta property="og:image" content="https://meusite.com.br/img/logo.png">
    <meta property="og:url" content="https://meusite.com.br/">
    <title>Meu Site</title>
    <link id="bootstrap-css" rel="stylesheet" href="">
    <link id="fontawesome-css" rel="stylesheet" href="">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="msg-noscript"></div>
    <div id="loading-page"></div>
    <div id="sidebar-container"></div>
    <h1>Página Inicial</h1>
    <img src="img/example.png" alt="Example Image">
    <script id="jquery-js" src=""></script>
    <script id="bootstrap-js" src=""></script>
    <script src="js/index.js" type="module"></script>
</body>
</html>`,
    "page1.html": `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="cache-control" content="public, max-age=604800, immutable"> <!-- 7 dias de cache -->
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="Valdemir Vinagre Mendes">
    <meta property="og:title" content="">
    <meta property="og:description" content="">
    <meta property="og:image" content="https://meusite.com.br/img/logo.png">
    <meta property="og:url" content="https://meusite.com.br/">
    <title>Meu Site</title>
    <link id="bootstrap-css" rel="stylesheet" href="">
    <link id="fontawesome-css" rel="stylesheet" href="">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Página 1</h1>
    <script id="jquery-js" src=""></script>
    <script id="bootstrap-js" src=""></script>
    <script src="js/page1.js" type="module"></script>
</body>
</html>`,
    "page2.html": `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="cache-control" content="public, max-age=604800, immutable"> <!-- 7 dias de cache -->
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="Valdemir Vinagre Mendes">
    <meta property="og:title" content="">
    <meta property="og:description" content="">
    <meta property="og:image" content="https://meusite.com.br/img/logo.png">
    <meta property="og:url" content="https://meusite.com.br/">
    <title>Meu Site</title>
    <link id="bootstrap-css" rel="stylesheet" href="">
    <link id="fontawesome-css" rel="stylesheet" href="">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Página 2</h1>
    <script id="jquery-js" src=""></script>
    <script id="bootstrap-js" src=""></script>
    <script src="js/page2.js" type="module"></script>
</body>
</html>`,
    "404.html": `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Não Encontrada</title>
    <link id="bootstrap-css" rel="stylesheet" href="">
    <link id="fontawesome-css" rel="stylesheet" href="">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Página Não Encontrada</h1>
    <p>Desculpe, mas a página que você está procurando não existe.</p>
    <a href="index.html">Voltar para a Página Inicial</a>
    <script id="jquery-js" src=""></script>
    <script id="bootstrap-js" src=""></script>
</body>
</html>`
};

// Função para criar diretórios e arquivos
function createFiles(basePath, structure) {
    Object.entries(structure).forEach(([key, value]) => {
        const fullPath = path.join(basePath, key);

        if (typeof value === 'string') {
            fs.writeFileSync(fullPath, value);
        } else {
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath);
            }
            createFiles(fullPath, value);
        }
    });
}

// Criação da estrutura do projeto na pasta raiz
createFiles('.', projectStructure);

console.log('Projeto "Bundler Simples" criado com sucesso!');
