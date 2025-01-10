import messageServices from '../services/messageServices.js';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
    console.log('QR code:', qr);
});

client.on('ready', () => {
    console.log('WhatsApp client está conectado e pronto! \n');
});

client.on('message', async (message) => { 
    const contact = await message.getContact();
    const date = new Date(message.timestamp * 1000);  
    const messageBody = message.body;
    const messageFrom = message.from;
    const dataBody = date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short"})  
    const namePerfil = contact.pushname || contact.name || contact.number;
    await messageServices.recivedMessage(namePerfil,messageFrom, dataBody, messageBody);
 // console.log(`${namePerfil} \n${message.from} \n${date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short"})} \n${message.body} \n --------------------------------------`);

});


export default client;
