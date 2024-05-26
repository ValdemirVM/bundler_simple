
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

## Licença

Este projeto é licenciado sob a Creative Commons Attribution 4.0 International (CC BY 4.0).  
<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"><img loading="lazy" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png" target="_blank" width="100"></a>

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
