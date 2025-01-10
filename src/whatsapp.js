import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import axios from 'axios';
import pool from './database/db.js';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import path from 'path';
// import mime  from 'mime-types';
import messageServices from './services/messageServices.js';

const { Client, LocalAuth, MessageMedia } = pkg;


// const DOWNLOAD_DIRF = 'C:/Users/rober/Downloads/clientes_fotos/';
// const DOWNLOAD_DIR = 'C:/Users/rober/Downloads/clientes_fotos/';

const __filename = fileURLToPath(import.meta.url); // Caminho completo do arquivo atual
const __dirname = path.dirname(__filename); 
const imgDir = path.join(__dirname, 'img');
const picturesDir = path.join(imgDir, 'pictures');
const documentsDir = path.join(imgDir, 'documents');

const calculateHash = (buffer) => {
    const hash = crypto.createHash('sha256');
    hash.update(buffer);
    return hash.digest('hex');
};

// Inicializa o cliente com autenticação local
const client = new Client({
    authStrategy: new LocalAuth(), 
});

// Exibe o QR Code para conectar ao WhatsApp
client.on('qr', (qr) => {
    console.log('Escaneie o QR Code abaixo:');
    qrcode.generate(qr, { small: true });
});

// Evento quando o cliente está pronto
client.on('ready', () => {
    console.log('Cliente está pronto!');
    
});
client.on('authenticated', () => {
    console.log('Autenticado com sucesso!');
});

client.on('message', async (message) => {
    const cliente = message.from;
    const mensagem = message.body;
    const chat = await message.getChat();
    const contact = await message.getContact();
    const name = contact.pushname || contact.name || contact.number; 
    const telefone = contact.number;
    
    const groupId = '120363369934439063@g.us'; // Substitua pelo ID do grupo
    const messagem = 'Olá, grupo! Esta é uma mensagem enviada automaticamente.';

    try {
        await client.sendMessage(groupId, messagem);
        console.log(`Mensagem enviada para o grupo: ${groupId}`);
    } catch (error) {
        console.error('Erro ao enviar mensagem para o grupo:', error);
    }
    // console.log(`Mensagem Recebida de: ${name}`);
    // if (message.body === '') {
    //     if (message.hasMedia) {
    //         try {
    //             const media = await message.downloadMedia();    
    //             if (!media || !media.mimetype) {
    //                 console.warn('Mimetype indefinido. Salvando mídia para análise.');
    //                 const path = `${documentsDir}/${message.id.id}_unknown.jpg`;
    //                 // fs.writeFileSync(path, media.data, { encoding: 'base64' });
    //                 console.log(`Mídia indefinida salva em: ${path}`);
    //                 return; // Interrompe o processamento, já que o tipo é desconhecido
                    
    //             }
    //             if(media.mimetype.includes('audio')){
    //                 const path = `${documentsDir}/${message.id.id}.mp3`;
    //                 const pathsplit = path.split(';')[0];
    //                 fs.writeFileSync(pathsplit, media.data, { encoding: 'base64' });
    //                 console.log(`Mídia salva em: ${pathsplit}`);
    //                 const midia = extension
    //                 messageServices.messageRecived(cliente, pathsplit, chat, midia); 
    //                 console.log(`Caption: ${message.body || 'Nenhum texto encontrado.'}`);
    //             }else{    
    //             console.log(`Mídia recebida! Tipo: ${media.mimetype}`);
    //             // console.log(`Base64: ${media.data}`);    
    //             // Define o caminho do arquivo
    //             const extension = media.mimetype.split('/')[1];
    //             const path = `${documentsDir}/${message.id.id}.${extension}`;
    //             const midia = extension
    //             // console.log(extension);    
    //             // Salva o arquivo
    //             fs.writeFileSync(path, media.data, { encoding: 'base64' });
    //             console.log(`Mídia salva em: ${path}`);    
    //             // Envia para o serviço apropriado
    //             messageServices.messageRecived(cliente, path, chat, midia);
    //             console.log(`Caption: ${message.body || 'Nenhum texto encontrado.'}`);
    //             }
    //         } catch (error) {
    //             console.error('Erro ao processar mídia:', error);
    //         }
    //     }
    // }
    // else{  
    // if(message.body){  
    //     try {            
    //         const cliente = await pool.query('SELECT nome FROM clientes WHERE telefone = $1', [telefone]);
    //         if (cliente.rowCount === 0) {
    //             const query = (`insert into clientes(telefone, nome, created_at)values($1, $2, now())`);
    //             const values = [`${contact.number}@c.us`,`${name}`]
    //             const { rows } = await pool.query(query, values); 
    //         }
    //     } catch (error) {
            
    //     }
    // } 

    // const profilePicUrl = await contact.getProfilePicUrl();
    // if (profilePicUrl) {
    //     try {
    //         const response = await axios.get(profilePicUrl, { responseType: 'arraybuffer' });
    
    //         // Certifique-se de que o diretório existe
    //         const folderPath = path.join(picturesDir); // Caminho para o diretório
    //         if (!fs.existsSync(folderPath)) {
    //             fs.mkdirSync(folderPath, { recursive: true }); // Cria a pasta, se necessário
    //         }
    
    //         // Caminho completo do arquivo
    //         const photoPath = path.join(folderPath, `${telefone}.jpg`);
    
    //         // Baixa e calcula o hash da nova foto
    //         const newPhotoBuffer = Buffer.from(response.data);
    //         const newPhotoHash = calculateHash(newPhotoBuffer);
    
    //         let shouldSave = true;
    
    //         if (fs.existsSync(photoPath)) {
    //             const existingPhotoBuffer = fs.readFileSync(photoPath);
    //             const existingPhotoHash = calculateHash(existingPhotoBuffer);
    
    //             // Se os hashes forem iguais, não precisa salvar novamente
    //             if (newPhotoHash === existingPhotoHash) {
    //                 // console.log(`A foto de perfil do cliente ${telefone} não mudou.`);
    //                 shouldSave = false;
    //             }
    //         }
    
    //         // Salva o arquivo somente se necessário
    //         if (shouldSave) {
    //             fs.writeFileSync(photoPath, newPhotoBuffer);

    //             const query = `UPDATE clientes SET foto_url = '${photoPath}', updated_at = now() WHERE telefone = $1`;
    //             const values = [telefone];
    //             const { rows } = await pool.query(query, values);
    //             console.log(`Foto de perfil de ${telefone} salva em ${photoPath}`);
    //         }
    //     } catch (error) {
    //         console.error(`Erro ao baixar a foto de perfil de ${telefone}:`, error.message);
    //     }
    // }
    

    // // if (message.body === '!foto') {
    // //     try {
    // //         // Caminho absoluto para o arquivo da foto no disco local
    // //         const photoPath = path.resolve('C:\\Users\\rober\\Downloads\\DOC-20240624-WA0201_240624_160155.doc');
    // //         // Verifica se o arquivo existe
    // //         // if (!fs.existsSync(photoPath)) {
    // //         //     console.log('Arquivo não encontrado:', photoPath);
    // //         //     await client.sendMessage(message.from, 'Erro: Arquivo de foto não encontrado.');
    // //         //     return;
    // //         // }
    // //         const mimeType = mime.lookup(photoPath);
    // //         // Carrega a foto como MessageMedia
    // //         const media = MessageMedia.fromFilePath(photoPath);
    // //         console.log(`MIME Type: ${mimeType}`);
    // //         // Envia a foto com uma legenda
    // //         await client.sendMessage(message.from, media, { caption: 'Aqui está sua foto!' });
    // //         console.log('Foto enviada com sucesso!');
    // //     } catch (error) {
    // //         console.error('Erro ao enviar a foto:', error.message);
    // //         await client.sendMessage(message.from, 'Erro ao enviar a foto.');
    // //     }
    // // }
    //     if (message.hasMedia) {
    //         const media = await message.downloadMedia();
    //         if (!media || !media.mimetype) {
    //             console.warn('Mimetype indefinido. Salvando mídia para análise.');
    //             const path = `${documentsDir}/${message.id.id}_unknown.jpg`;
    //             // fs.writeFileSync(path, media.data, { encoding: 'base64' });
    //             console.log(`Mídia indefinida salva em: ${path}`);
    //             return; // Interrompe o processamento, já que o tipo é desconhecido
    //         } 
    //         // Exibe informações sobre a mídia
    //         console.log(`Mídia recebida! Tipo: ${media.mimetype}`);
    //         // console.log(`Base64: ${media.data}`); // Dados da mídia em Base64
    //         // Se desejar, salve o arquivo localmente
    //         if(media.mimetype.includes('audio')){
    //             const path = `${documentsDir}/${message.id.id}.${media.mimetype.split('/')[1]}`;
    //             const pathsplit = path.split(';')[0];
    //             const extensaosplit = extensao.split('.')[1];
    //             // console.log(extensaosplit);
    //             fs.writeFileSync(pathsplit, media.data, { encoding: 'base64' });
    //             // console.log(`Mídia salva em: ${pathsplit}`);
    //             messageServices.messageRecived(cliente, pathsplit, chat); 
    //             console.log(`Caption: ${message.body || 'Nenhum texto encontrado.'}`);
    //         }else{   
    //             const extensao = `${media.filename}`;
    //             const extensaosplit = extensao.split('.')[1];
    //             // console.log(extensaosplit);
    //             const path = `${documentsDir}/${message.id.id}.${extensaosplit}`;
    //             fs.writeFileSync(path, media.data, { encoding: 'base64' });
    //             // console.log(`Mídia salva em: ${path}`);                
    //             messageServices.messageRecived(cliente, path, chat); 
    //             console.log(`Caption: ${message.body || 'Nenhum texto encontrado.'}`); 
    //         }       
    //     } else {                
    //             messageServices.messageRecived(cliente, mensagem, chat);        
    //     }       
    // }
 
});
// Inicializa o cliente
client.initialize();

export default client;
