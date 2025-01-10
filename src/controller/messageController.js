import messageService from '../services/messageServices.js';

async function mensagem_bot(req, reply) {
    const { cliente, mensagem } = req.body; 
    await messageService.enviarChat_bot(cliente, mensagem, reply);
   
}

export default { mensagem_bot}
