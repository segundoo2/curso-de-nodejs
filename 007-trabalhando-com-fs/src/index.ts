import fs from 'node:fs';
import path from 'node:path';

try {
    //verifica se existe essa pasta e criando-a caso não exista
   if(!fs.existsSync(path.resolve('tmp'))){
    fs.mkdirSync(path.resolve('tmp'));
   }
   //verifica se existe esse arquivo e o cria caso não exista
   const caminhoArquivo = path.resolve('tmp', 'arquivo.txt');
   if(!fs.existsSync(caminhoArquivo)){
    const content = `1 - Deu bom na criação do arquivo!\n2 - Deu bom na criação do arquivo!`;
    fs.writeFileSync(caminhoArquivo, content, 'utf8');
   }
   //Adiciona novos conteúdos no arquivo criado.
   const meuTextoArquivo = fs.readFileSync(caminhoArquivo, 'utf8');
   fs.writeFileSync(caminhoArquivo, `${meuTextoArquivo}\n3 - teste`)
   //apresenta no terminal o conteúdo do arquivo
   console.log(
    `Dados do arquivo:\n`,
    fs.readFileSync(caminhoArquivo, 'utf8')
   );
   //Cria uma nova pasta dentro da pasta tmp
   fs.mkdirSync(path.resolve('tmp', 'nova-pasta-01'));
   //renomea o arquivo

} catch (error) {
    console.log(error);
}