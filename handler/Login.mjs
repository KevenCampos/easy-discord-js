import Discord from 'discord.js';
import SetupCommand from './SetupCommands.mjs';
import { interactionHandlers } from './InteractionHandler.mjs';

const allIntents = [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping
]

export default class Login {
    constructor(options = {}){
        if (!options.token) throw new Error('>> Token is required');
        if (options.commandsPath && typeof options.commandsPath !== 'string') throw new Error('>> CommandsPath must be a string');
        if (options.componentsPath && typeof options.componentsPath !== 'string') throw new Error('>> ComponentsPath must be a string');

        this.intents = options.intents || allIntents;
        this.token = options.token;
        this.commandsPath = options.commandsPath;
        this.componentsPath = options.componentsPath;
        
        this.client = new Discord.Client({intents: this.intents})
        this.client.login(this.token);

        this.startListening();
    }

    startListening = () => {
        this.client.on('ready', async () => {
            new SetupCommand(this.client, this.commandsPath, this.componentsPath);
        })

        this.client.on("interactionCreate", async (interaction) => {
            
            let customId_without_params = interaction?.customId?.split(":")[0];
            const interactionHandler = interactionHandlers.get(interaction.customId) || interactionHandlers.get(customId_without_params);

            if (interactionHandler) {
                let params = [];

                if (interactionHandler.useParams) {
                    const separate_params = interaction.customId.split(":"); // separando os parametros, por exemplo: "customId: 'config_client_secret:guild_id:client_id'"
                    params = separate_params.slice(1); // pegando os parametros, por exemplo: ['guild_id', 'client_id']
                }

                const callback = interactionHandlers.get(interactionHandler.useParams ? customId_without_params : interaction.customId)?.callback;
                if (!callback) return console.log(`Callback not found for customId: ${interaction.customId}`);

                interactionHandler.useParams ? callback.apply(null, [interaction, ...params]) : callback(interaction)
            }
        })
    }
}