
async function sendMainMenu(chat) {        
    const menu = `Olá sou assistente virtual da *Agion Tecnologia* 💚.
Seja muito bem vindo!
Estou aqui para te ajudar a conhecer nossos serviços, realizar agendamentos, tirar dúvidas e se necessário posso encaminhá-lo para falar com os nossos Analistas.
Como podemos te ajudar hoje?
    
    Basta digitar o número da opção desejada:
    [ 1 ] - Contratar Serviços
    [ 2 ] - Suporte
    [ 3 ] - Conhecer Nossos Serviços
    [ 4 ] - Horário de Atendimento
    [ 5 ] - Ouvidoria ou Manifestações
    [ 6 ] - Sobre a Agion Tecnologia`;
    chat.sendMessage(menu);

}

async function sendSuport(chat) {
    const submenu = `Basta digitar o número da opção desejada:
[ 1 ] - Agendar Visita Técnica
[ 2 ] - Suporte Remoto
[ 3 ] - Outros Assuntos
[ 0 ] Voltar ao Menu Inicial`;
chat.sendMessage(submenu);  

}

async function sendProblemMenu(chat) {   
    const submenu = `Estou encaminhando o seu atendimento para um de nossos Analistas.
Enquanto isso, para agilizarmos o seu atendimento, poderia nos fornecer as informações abaixo?
    Nome:
    Empresa:
    Descrição do Problema / Solicitação / Dúvida:`;
    chat.sendMessage(submenu);
    
}

async function sendWorkHour(chat) {
    const submenu = `Nosso horário de atendimento é de segunda à sexta-feira, de 08:00h as 18:00h.
Aos sábados, nosso horário de atendimento é 08:00h as 12:00h, exceto feriados.`
    chat.sendMessage(submenu);

}

async function sendSurvery1(chat) {
    const submenu = `Para melhorarmos nosso atendimento, pedimos que pode gentileza escolha a opção que melhor respresenta a sua experiência conosco:
[1] - 😤 Nada satisteito
[2] - 😐 Um pouco satisteito
[3] - 🙂 Satisteito
[4] - 😀 Muito satisteito
[5] - 🤩 Super satisteito`;
    chat.sendMessage(submenu);
}

async function sendSurvery2(chat) {
    const submenu = `Em uma escala de 0 a 10, o quanto você recomendaria nossos serviços para um familiar ou amigo?`;
    chat.sendMessage(submenu);
}

async function sendSaberMais(chat) {
    const submenu = `A tecnologia chegou para mudar o mundo. Com ela, podemos fazer coisas que, no século passado, jamais imaginaríamos que fosse possível. Toda essa inovação afetou diretamente o mundo dos negócios. Sistemas e equipamentos modernos passaram a fazer parte do dia a dia corporativo, proporcionando maior facilidade na execução de tarefas.

Foi baseado nesses pilares que Thiago Coronel, profissional de TI atuante na área de consultoria técnica há mais de 10 anos, resolveu fundar, em 2017, a *Agion Tecnologia*. Uma empresa que pensa adiante e tem, acima de tudo, a inovação como principal ferramenta de trabalho.

O objetivo, desde o início, sempre foi claro: alinhar a tecnologia ao negócio, diminuindo, ainda mais, a distância que há entre a TI e o business.`;
    chat.sendMessage(submenu);
}

async function sendOuvidoria(chat) {
    const submenu = `Sua opinião é muito importante e nos ajudará a aprimorar cada vez mais os nossos serviços.

Que tipo de manifestação você gostaria de registrar?
[ 1 ] - Reclamação
[ 2 ] - Sugestão
[ 3 ] - Dúvida
[ 4 ] - Elogio
[ 0 ] - Voltar ao Menu Inicial`
    chat.sendMessage(submenu);
}
async function sendReclamacao(chat) {
    const submenu = `Por favor, digite a sua reclamação:`
    chat.sendMessage(submenu);
}

export default {sendMainMenu, sendSuport, sendProblemMenu, sendWorkHour, sendSurvery1, sendSurvery2, sendSaberMais, sendOuvidoria, sendReclamacao};