
// 3.Crie uma aplicação que receba uma URL de uma página WEB como entrada e 
// execute uma chamada usando o método GET para a URL e efetue um "parse" 
// na página obtida e exibindo todos os links presentes na página: atributos href 
// contidos dentro de tags <a></a>

import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const url = "https://g1.globo.com/";

// Conexão
fetch(url)
    .then(response => {
        return response.text(); 
    })

    .then(html => {
        return parse(html);
    })

    .then(root => {
        return root.querySelectorAll('a');
    })

    .then(links =>
        links.forEach(element => {
            const href = element.getAttribute('href');
            console.log('Link:', href);
 }));