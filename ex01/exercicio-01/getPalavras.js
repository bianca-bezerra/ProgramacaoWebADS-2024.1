// 4.Crie uma aplicação que receba uma URL de uma página WEB como entrada e 
// uma palavra ou termo de pesquisa. Execute uma chamada usando o método 
// GET para a URL e efetue um "parse" na página obtida listando todas as 
// ocorrências da palavra na página. Para cada ocorrência, liste as 10 palavras 
// anteriores e as 10 posteriores, caso existam

import chalk from 'chalk';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import { question } from 'readline-sync';

const url = "https://g1.globo.com/pi/piaui/";
const termoBuscado = question(chalk.blue("Digite um termo a ser buscado: "));

async function listarOcorrencias() {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    const text = root.text;

    acharOcorrencias(text, termoBuscado);
}

function acharOcorrencias(texto, termoBuscado) {
    if(texto.includes(termoBuscado)){
        const palavras = texto.match(/[a-zA-ZÀ-ÖØ-öø-ÿ0-9]+/g);

        palavras.forEach((palavra, index) => {
            if (palavra.toLowerCase() === termoBuscado.toLowerCase()) {
                const startIndex = Math.max(0, index - 10);
                const endIndex = Math.min(palavras.length, index + 11);

                const contexto = palavras.slice(startIndex, endIndex).join(' ');
                console.log(`Palavra: ${termoBuscado}`);
                console.log(`Contexto: ${contexto}\n`);
            }
        });
    } else {
        console.log(chalk.red("Palavra não encontrada!"));
    }
}

listarOcorrencias();