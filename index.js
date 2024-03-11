import { config } from 'dotenv'
import { Client, GatewayIntentBits } from 'discord.js'

config();
const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});
discordClient.login(process.env.DISCORD_ID)

discordClient.on('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}!`);
    let channel = discordClient.channels.cache.get(process.env.DISCORD_CHANNEL);
    channel.send(`**Nova mensagem recebida**:
    **Autor:** Teste
    **Telefone:** Teste
    **Email:** Teste
    **Mensagem:** Teste`);
    
});
