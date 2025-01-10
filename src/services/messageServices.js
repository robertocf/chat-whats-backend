import client from '../whatsapp.js';

import pkg from 'whatsapp-web.js';
const { MessageMedia } = pkg;

async function enviarChat_bot(cliente, mensagem, reply) {
    try {
        await client.sendMessage(cliente, mensagem);
        // console.log(cliente)
    } catch (error) {
        
    }
}

export default {  enviarChat_bot }
