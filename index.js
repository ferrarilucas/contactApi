import {config} from 'dotenv'
import {Client, GatewayIntentBits} from 'discord.js'

export const handler = async (event) => {
    config();

    const {name, phone, email, message} = event;

    const discordClient = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages
        ]
    });
    try {
        if (!name || !phone || !email || !message) {
            throw new Error('Campos obrigatórios não preenchidos');
        }


        await discordClient.login(process.env.DISCORD_ID)
        console.log(`Logged in as ${discordClient.user.tag}!`);

        await discordClient.guilds.fetch();

        let channel = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL);
        if (!channel) throw new Error("Channel not found");

        const menssage = `
        **Nova mensagem recebida:**:
        **Autor:** ${name}
        **Telefone:** ${phone}
        **Email:** ${email}
        **Mensagem:** ${message}
        `;
        console.log(menssage);


        await channel.send(menssage);

        await discordClient.destroy();

        return {
            statusCode: 200,
            body: JSON.stringify('Mensagem enviada com sucesso!'),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(`Erro ao enviar mensagem: ${error}`),
        };
    }



}