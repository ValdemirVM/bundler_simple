const { execSync } = require('child_process');
const ncp = require('ncp').ncp;
const path = require('path');
const fs = require('fs');

// Diretório de origem e destino para cópia
const sourceDir = path.join(__dirname);
const targetDir = path.join(__dirname, 'dist');

// Opções para a cópia
const options = {
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
