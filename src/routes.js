import messageController from './controller/messageController.js';
import path from 'path';
import fastifyStatic from '@fastify/static';

async function routes(fastify) {
  
  const __dirname = path.resolve(); // Use path.resolve para obter o diretório atual

  // Registro do plugin para servir arquivos estáticos
  // fastify.register(fastifyStatic, {
  //   root: path.join(__dirname, 'src/img/documents'), // Ajuste o caminho conforme a estrutura do seu projeto
  //   prefix: '/documents/', // Prefixo público
  // });

  // fastify.post('/atendimentos/mensagem', messageController.mensagem);
  
  fastify.post('/atendimentos/mensagem_bot', messageController.mensagem_bot);

  // fastify.get('/atendimentos/mensagens/:id', messageController.trocaMensagem);

  // fastify.post('/atendimentos/encerrar', messageController.mensagem_end);
  // fastify.post('/atendimentos/encerrar/pesquisa', messageController.mensagem_pesquisa);

  // fastify.post('/atendimentos/iniciar', messageController.atendimento_start);

  // fastify.post('/atendimentos/clientes', messageController.clienteCadastro);
  // fastify.get('/atendimentos/clientes', messageController.listarClientes);
  // fastify.put('/atendimentos/clientes/:id', messageController.clienteAtualiza);


  // fastify.get('/atendimentos/listar', messageController.listarAtendimentos);

  // fastify.post('/atendimentos/media', messageController.enviarMedia);

  // fastify.get('/', { websocket: true }, (socket /* WebSocket */, req /* FastifyRequest */) => {
  //   socket.on('nova_mensagem', message => {
  //   })
  // })

}

export default routes;

