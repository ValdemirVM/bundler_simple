//Faz uma copia de um html para dentro de components, somente com o conteudo do body
//node copyPage.js nome-da-pagina
const fs = require('fs');
const path = require('path');

// Verificar se o nome da página foi fornecido como argumento
if (process.argv.length !== 3) {
    console.error('Uso: node copyPage.js nome-da-pagina');
    process.exit(1);
}

const nomePagina = process.argv[2];
const arquivoPrincipal = path.join(__dirname, `${nomePagina}.html`);
const pastaComponents = path.join(__dirname, 'components');
const arquivoComponent = path.join(pastaComponents, `${nomePagina}.html`);

fs.readFile(arquivoPrincipal, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo principal:', err);
        return;
    }

    const bodyStart = data.indexOf('<body>');
    const bodyEnd = data.indexOf('</body>');
    if (bodyStart !== -1 && bodyEnd !== -1) {
        const bodyContent = data.substring(bodyStart + 6, bodyEnd);

        fs.mkdir(pastaComponents, { recursive: true }, (err) => {
            if (err) {
                console.error('Erro ao criar a pasta components:', err);
                return;
            }

            fs.writeFile(arquivoComponent, bodyContent, 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao criar a cópia da página:', err);
                    return;
                }
                console.log('Cópia da página criada com sucesso!');
            });
        });
    } else {
        console.error('Conteúdo da tag body não encontrado.');
    }
});
