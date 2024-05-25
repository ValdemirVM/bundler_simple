const fs = require('fs');
const path = require('path');

// Estrutura do projeto
const projectStructure = {
    "src": {
        "components": {
            "noscript.html": `<div id="msg-noscript">Please enable JavaScript to use this site.</div>`,
            "loading.html": `<div id="loading-page">Loading...</div>`,
            "sidebar.html": `<div id="sidebar-container">Sidebar content here.</div>`
        },
        "css": {
            "style.css": `body { font-family: Arial, sans-serif; }`
        },
        "img": {
            "example.png": "" // You can add your own base64 image data here or leave it empty
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
console.log('Bibliotecas carregadas dinamicamente na Página Inicial!');`,
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
}`
        },
        "index.html": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página Inicial</title>
    <link id="bootstrap-css" rel="stylesheet" href="">
    <link id="fontawesome-css" rel="stylesheet" href="">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Página Inicial</h1>
    <img src="img/example.png" alt="Example Image">
    <script id="jquery-js" src=""></script>
    <script id="bootstrap-js" src=""></script>
    <script src="js/index.js" type="module"></script>
</body>
</html>`,
        "page1.html": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página 1</title>
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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página 2</title>
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
</html>`
    }
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

// Criação da estrutura do projeto
createFiles('.', projectStructure);

console.log('Projeto "Bundler Simples" criado com sucesso!');
