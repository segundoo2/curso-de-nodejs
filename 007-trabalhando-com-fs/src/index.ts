import fs from 'node:fs';
import path from 'node:path';

const caminhoArquivo = path.resolve('tmp', 'arquivo.txt');
const content = `1 - Deu bom na criação do arquivo!\n2 - Deu bom na criação do arquivo!`;
const meuTextoArquivo = fs.readFileSync(caminhoArquivo, 'utf8');

try {
    //verifica se existe essa pasta e a cria caso não exista
   if(!fs.existsSync(path.resolve('tmp'))){
        fs.mkdirSync(path.resolve('tmp'));
   }
   //verifica se existe esse arquivo e o cria caso não exista
   if(!fs.existsSync(caminhoArquivo)){
        fs.writeFileSync(caminhoArquivo, content, 'utf8');
    }    
    //Adiciona novos conteúdos no arquivo criado.
    fs.writeFileSync(caminhoArquivo, `${meuTextoArquivo}\nteste`);
   //Verifica se existe, caso não exista, cria e renomeia a pasta "nova-pasta-01" para "nova-pasta-02"
   if(!fs.existsSync(path.resolve('tmp', 'nova-pasta-02'))){
        fs.mkdirSync(path.resolve('tmp', 'nova-pasta-01'));
        fs.renameSync(path.resolve('tmp', 'nova-pasta-01'), path.resolve('tmp', 'nova-pasta-02'));
        console.log("Pasta criada com sucesso!");
   } else {
        console.log("Pasta já criada!");
   }
   //verifica se existe, caso não exista, cria e renomeia o arquivo "arquivo-01.txt" para "arquivo-02.txt"
   if(!fs.existsSync(path.resolve('tmp', 'nova-pasta-02', 'arquivo-02.txt'))){
        fs.writeFileSync(path.resolve('tmp', 'nova-pasta-02', 'arquivo-01.txt'), content);
        fs.renameSync(path.resolve('tmp', 'nova-pasta-02', 'arquivo-01.txt'), path.resolve('tmp', 'nova-pasta-02', 'arquivo-02.txt'));
        console.log("Arquivo criado com sucesso!");
    } else {
        console.log("Arquivo já criada!");
    }

    if(!fs.existsSync(path.resolve('tmp', 'nova-pasta-02', 'pode-deletar'))){
        fs.mkdirSync(path.resolve('tmp', 'nova-pasta-02', 'pode-deletar'));
   }

    //remove a pasta nova-pasta-02 após 1 minuto de criada
    setTimeout(() => fs.rmSync(path.resolve('tmp', 'nova-pasta-02', 'pode-deletar'),{ 
        recursive: true
    }), 6000);
    
} catch (error) {
    console.log(error);
}