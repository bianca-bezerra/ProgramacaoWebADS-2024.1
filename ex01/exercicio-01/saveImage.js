// 2.Crie um programa em que permita baixar, via HTTP e usando o método GET, 
// um arquivo de imagem (escolha um tipo apenas - jpg ou gif...)

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Informações da imagem
const url = "https://cachorronatureba.com.br/wp-content/uploads/Dachshund11.jpg";
const dir = "./midia";
const nome = "Dachshund.jpg";

// Configuração de caminho
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const caminho = path.join(dir, nome);

// Conexão
fetch(url)
.then(response => response.buffer())
.then(buffer => {
   
    fs.writeFile(caminho, buffer, (erro) => {
        if (erro) {
            console.error('Erro ao salvar a imagem:', erro);
        } else {
            console.log('Imagem salva com sucesso:', caminho);
        }
    });
})
