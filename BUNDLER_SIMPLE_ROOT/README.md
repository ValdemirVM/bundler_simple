
# Bundler Simple
Um Bundler Simples para não usar webpack

## Instalação sem o diretório "SRC"
### Esse código vai criar a estrutura do projeto diretamente na mesma pasta onde o setup.js está localizado. 
### Não terá a presença da pasta src. 
### Este projeto é para ser instalado na pasta raiz do servidor de teste. 

1. Clone o repositório:

    ```sh
    git clone https://github.com/ValdemirVM/bundler_simple.git
    cd bundler-simple
    ```

2. Instale as dependências do projeto:

    ```sh
    npm install
    ```

3. Execute o script de configuração para criar a estrutura do projeto:

    ```sh
    npm run setup
    ```

4. Para criar a versão de produção do projeto, execute:

    ```sh
    npm run build
    ```

5. As dependencias podem ser executadas separadasmente:
npm run clean
npm run copy
npm run compile-scss
npm run minify-js
npm run minify-css

## Estrutura do projeto "Bundler Simples" gerada pelo `setup.js`:

```
<raiz_do_projeto>/
│
├── components/
│   ├── loading.html
│   ├── noscript.html
│   └── sidebar.html
│
├── css/
│   └── style.css
│
├── img/
│   └── example.png
│
├── js/
│   ├── index.js
│   ├── page1.js
│   ├── page2.js
│   ├── libs/
│   │   └── polyfills.js
│   ├── modules/
│   │   └── commonFunctions.js
│
├── scss/
│   └── style.scss
│
├── index.html
├── page1.html
├── page2.html
└── 404.html
```

### Descrição dos Arquivos e Pastas

- **components/**: Contém os componentes HTML que serão carregados dinamicamente.
  - `loading.html`: Estrutura do overlay de carregamento.
  - `noscript.html`: Mensagem para navegadores com JavaScript desativado.
  - `sidebar.html`: Estrutura do sidebar.

- **css/**: Contém o arquivo de estilo CSS.
  - `style.css`: Arquivo principal de estilos CSS.

- **img/**: Contém as imagens do projeto.
  - `example.png`: Exemplo de imagem (pode ser substituída ou removida conforme necessário).

- **js/**: Contém os arquivos JavaScript.
  - `index.js`: Script principal da página inicial.
  - `page1.js`: Script principal da página 1.
  - `page2.js`: Script principal da página 2.
  - **libs/**: Contém arquivos de bibliotecas adicionais.
    - `polyfills.js`: Arquivo para polyfills necessários.
  - **modules/**: Contém módulos JavaScript reutilizáveis.
    - `commonFunctions.js`: Arquivo de funções comuns usadas em várias partes do projeto.

- **scss/**: Contém o arquivo de estilo SCSS.
  - `style.scss`: Arquivo principal de estilos SCSS.

- **HTML Files**:
  - `index.html`: Página inicial do site.
  - `page1.html`: Página 1 do site.
  - `page2.html`: Página 2 do site.
  - `404.html`: Página de erro 404 (Página não encontrada).

Essa estrutura deve ajudar a organizar seu projeto de maneira modular e eficiente.

## Instalação

Para configurar o projeto pela primeira vez, execute:

```sh
npm install
```

## Setup Inicial

Para configurar a estrutura inicial do projeto, execute:

```sh
npm run setup
```

Este comando criará a estrutura de diretórios inicial necessária.

## Scripts Disponíveis

### `npm run clean`

Este script limpa o diretório `dist`:

```sh
npm run clean
```

### `npm run copy`

Este script copia os arquivos do diretório raiz para o diretório `dist`:

```sh
npm run copy
```

### `npm run compile-scss`

Este script compila os arquivos SCSS em CSS:

```sh
npm run compile-scss
```

### `npm run minify-js`

Este script minifica os arquivos JavaScript no diretório `dist/js`:

```sh
npm run minify-js
```

### `npm run minify-css`

Este script minifica o arquivo CSS:

```sh
npm run minify-css
```

### `npm run build`

Este script executa o processo completo de build, incluindo limpeza, cópia, compilação de SCSS, e minificação de JavaScript e CSS:

```sh
npm run build
```

## Estrutura dos Arquivos de Build

### `build.js`

Este arquivo executa o processo de build completo, chamando os scripts definidos no `package.json`:

```javascript
const { execSync } = require('child_process');
const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');

const sourceDir = path.join(__dirname);
const targetDir = path.join(__dirname, 'dist');

const options = {
    clobber: true,
};

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

const copy = (source, destination, options) => new Promise((resolve, reject) => {
    ncp(source, destination, options, err => {
        if (err) reject(err);
        else resolve();
    });
});

async function build() {
    try {
        console.log('Limpando diretório dist...');
        execSync('npm run clean', { stdio: 'inherit' });

        console.log('Copiando arquivos...');
        await copy(sourceDir, targetDir, options);
        console.log('Arquivos copiados com sucesso para o diretório "dist"!');

        console.log('Compilando SCSS...');
        execSync('npm run compile-scss', { stdio: 'inherit' });

        console.log('Minificando JavaScript...');
        execSync('npm run minify-js', { stdio: 'inherit' });

        console.log('Minificando CSS...');
        execSync('npm run minify-css', { stdio: 'inherit' });

        console.log('Build concluído com sucesso!');
    } catch (err) {
        console.error('Erro durante o processo de build:', err.message);
        console.error(err.stack);
    }
}

build();
```

### `copyFiles.js`

Este arquivo copia os arquivos do diretório raiz para o diretório `dist`:

```javascript
const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');

// Diretório de origem e destino para cópia
const sourceDir = path.join(__dirname);
const targetDir = path.join(__dirname, 'dist');

// Opções para a cópia
const options = {
    filter: (filename) => {
        const basename = path.basename(filename);
        return !filename.includes('node_modules') && !filename.includes('dist') && basename !== 'dist';
    },
    clobber: true, // Sobrescrever arquivos existentes
};

// Função para criar o diretório `dist` se não existir
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

// Converter ncp para usar promessas
const copy = (source, destination, options) => new Promise((resolve, reject) => {
    ncp(source, destination, options, err => {
        if (err) reject(err);
        else resolve();
    });
});

(async () => {
    try {
        await copy(sourceDir, targetDir, options);
        console.log('Arquivos copiados com sucesso para o diretório "dist"!');
    } catch (err) {
        console.error('Erro ao copiar arquivos:', err);
    }
})();
```

### `minify-js.js`

Este arquivo minifica os arquivos JavaScript no diretório `dist/js`:

```javascript
const terser = require('terser');
const fs = require('fs');
const path = require('path');

const jsFiles = fs.readdirSync(path.join(__dirname, 'dist/js'));

jsFiles.forEach(file => {
    const filePath = path.join(__dirname, 'dist/js', file);
    const minifiedPath = filePath.replace('.js', '.min.js');

    if (fs.statSync(filePath).isFile() && file.endsWith('.js')) {
        const code = fs.readFileSync(filePath, 'utf8');
        terser.minify(code).then(minified => {
            fs.writeFileSync(minifiedPath, minified.code);
            console.log(`Arquivo ${file} minificado para ${minifiedPath}`);
        }).catch(err => {
            console.error(`Erro ao minificar ${file}:`, err);
        });
    }
});
```

### `minify-css.js`

Este arquivo minifica o arquivo CSS gerado:

```javascript
const postcss = require('postcss');
const cssnano = require('cssnano');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'dist/css/style.css');
const outputFile = path.join(__dirname, 'dist/css/style.min.css');

fs.readFile(inputFile, (err, css) => {
    if (err) {
        console.error('Erro ao ler o arquivo CSS:', err);
        return;
    }

    postcss([cssnano])
        .process(css, { from: inputFile, to: outputFile })
        .then(result => {
            fs.writeFile(outputFile, result.css, () => true);
            if (result.map) {
                fs.writeFile(outputFile + '.map', result.map.toString(), () => true);
            }
            console.log(`CSS minificado para ${outputFile}`);
        })
        .catch(error => {
            console.error('Erro ao minificar o CSS:', error);
        });
});
```

### `setup.js`

Este arquivo configura a estrutura inicial do projeto:

```javascript
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

```

## Licença

Este projeto está licenciado sob a licença [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
```

Esta documentação fornece uma visão clara de como configurar, usar e entender os arquivos do seu projeto. Inclui uma descrição da estrutura do projeto, instruções de instalação, explicações dos scripts disponíveis e detalhes sobre os arquivos de build.


