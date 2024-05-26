const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');

// Função para minificar arquivos CSS
async function minifyCSS(file) {
    try {
        const css = fs.readFileSync(file, 'utf8');
        const result = await postcss([cssnano]).process(css, { from: file, to: file.replace('.css', '.min.css') });

        fs.writeFileSync(file.replace('.css', '.min.css'), result.css, 'utf8');
        console.log(`Arquivo ${file} minificado para ${file.replace('.css', '.min.css')}`);
    } catch (err) {
        console.error('Erro ao minificar arquivos CSS:', err);
    }
}

// Diretório de origem
const cssDir = path.join(__dirname, 'dist/css');

// Minificar o arquivo style.css
minifyCSS(path.join(cssDir, 'style.css'));
