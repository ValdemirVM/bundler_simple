const fs = require('fs');
const path = require('path');
const terser = require('terser');

// Função para minificar arquivos
async function minifyJS(dir) {
    try {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const itemPath = path.join(dir, item);

            if (fs.statSync(itemPath).isDirectory()) {
                // Recursivamente minificar arquivos nos subdiretórios
                await minifyJS(itemPath);
            } else if (fs.statSync(itemPath).isFile() && path.extname(item) === '.js') {
                const fileContent = fs.readFileSync(itemPath, 'utf8');

                const minified = await terser.minify(fileContent);

                if (minified.error) {
                    console.error(`Erro ao minificar ${item}:`, minified.error);
                    continue;
                }

                const minifiedPath = path.join(dir, path.basename(item, '.js') + '.min.js');
                fs.writeFileSync(minifiedPath, minified.code, 'utf8');
                console.log(`Arquivo ${item} minificado para ${minifiedPath}`);
            }
        }
    } catch (err) {
        console.error('Erro ao minificar arquivos JS:', err);
    }
}

// Diretório de origem
const jsDir = path.join(__dirname, 'dist/js');

// Iniciar minificação a partir do diretório de origem
minifyJS(jsDir);
