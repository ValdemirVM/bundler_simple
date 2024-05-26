# Bundler Simple  - by Valdemir VM
## Um Bundler Simples para não usar webpack

Este projeto organiza várias páginas HTML, cada uma com seu próprio arquivo JS, e permite a importação de módulos necessários. A estrutura do projeto inclui uma pasta para componentes com snippets HTML reutilizáveis que são carregados dinamicamente usando JavaScript, além de utilizar SCSS para estilização.

## Licença
Este projeto é licenciado sob a Creative Commons Attribution 4.0 International (CC BY 4.0).  
<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"><img loading="lazy" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png" target="_blank" width="100"></a>

## Estrutura do Projeto

```plaintext
bundler-simples/
├── src/
│   ├── components/
│   │   ├── noscript.html
│   │   ├── loading.html
│   │   ├── sidebar.html
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   └── example.png
│   ├── js/
│   │   ├── index.js
│   │   ├── page1.js
│   │   ├── page2.js
│   │   ├── modules/
│   │   │   └── commonFunctions.js
│   │   └── libs/
│   │       └── polyfills.js
│   ├── scss/
│   │   └── style.scss
│   ├── index.html
│   ├── page1.html
│   ├── page2.html
│   └── 404.html
├── dist/
├── setup.js
├── package.json
└── README.md
```

# Descrição dos Arquivos
## src/components/
- noscript.html: Mensagem de aviso para navegadores com JavaScript desabilitado.
- loading.html: Overlay de carregamento do sistema.
- sidebar.html: Conteúdo da barra lateral.
- 
## src/css/
style.css: Estilos CSS principais.

## src/img/
example.png: Imagem de exemplo (pode ser substituída por uma imagem real).

## src/js/
index.js: JavaScript principal para a página inicial.
page1.js: JavaScript específico para a Página 1.
page2.js: JavaScript específico para a Página 2.
modules/commonFunctions.js: Funções comuns reutilizáveis.
libs/polyfills.js: Polyfills necessários.

## src/scss/
style.scss: Arquivo SCSS principal para estilização.

## Páginas HTML
index.html: Página inicial do site.
page1.html: Página 1 do site.
page2.html: Página 2 do site.
404.html: Página de erro "Não Encontrada".

## Outros Arquivos
setup.js: Script para criação da estrutura do projeto.
package.json: Arquivo de configuração do npm.
README.md: Este arquivo, contendo informações sobre o projeto.

# Instalação e Uso
## Pré-requisitos
### Node.js e npm instalados no seu sistema.
### Passos de Instalação
1- Clone o repositório ou crie uma nova pasta e copie os arquivos setup.js e package.json para a pasta raiz do projeto.

2- Instale as dependências do projeto executando o seguinte comando no terminal:
npm install

3- Execute o script de setup para criar a estrutura do projeto:
npm run setup

4- Para construir o projeto para produção, execute:
npm run build

# Scripts Disponíveis
setup: Cria a estrutura do projeto.
build: Limpa a pasta dist, copia os arquivos do src, compila o SCSS e minifica os arquivos JS e CSS.
clean: Limpa a pasta dist.
copy: Copia os arquivos do src para a pasta dist.
compile-scss: Compila os arquivos SCSS para CSS.
minify: Minifica os arquivos JS e CSS.
minify-js: Minifica os arquivos JS.
minify-css: Minifica os arquivos CSS.

# BUNDLER_SIMPLE_ROOT
Os arquivos desta pasta instalam e trabalham diretamente com o servidor de teste. O setup.js instala o projeto em sua mesma pasta, e o package.js envia os arquivos de produção paara a pasta "dist".

# Considerações Finais
Este projeto foi criado para fornecer uma estrutura básica e simples para o desenvolvimento web sem a necessidade de utilizar ferramentas complexas como o Webpack. Sinta-se à vontade para modificar e expandir conforme suas necessidades.


Este `README.md` fornece uma visão clara da estrutura do projeto, orientações de instalação e uso, bem como uma descrição dos arquivos e scripts disponíveis.
