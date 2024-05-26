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
