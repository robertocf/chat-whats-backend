import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import fastifyWebsocket from '@fastify/websocket';

import routes from './routes.js';

dotenv.config();

const fastify = Fastify({ logger: false });

fastify.register(cors,{
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

fastify.register(fastifyWebsocket)
fastify.register(routes)

fastify.listen({port: 3333, host: '0.0.0.0'}, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Servidor rodando em: ${address}`);
});

export default fastify
