import Discord from 'discord.js';
import SetupCommand from './SetupCommands.mjs';
import { defaultSettingsCache, CustomError } from '../index.mjs';
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

export default class EaseClient {
    constructor(token){
        if (!token) throw new CustomError('cyan', '>> Token is required');

        this.intents = allIntents;
        this.token = token;
    }

    login = () => {
        this.client = new Discord.Client({intents: this.intents})
        this.client.login(this.token);
        this.startListening();

        return this.client;
    }

    set = (key, value) => {
        const validKeysAndFunctions = {
            commandsPath: { test: (value) => typeof value === 'string', error: "should be a string"},
            componentsPath: { test: (value) => typeof value === 'string', error: "should be a string"},
            intents: { test: (value) => Array.isArray(value), error: "should be a array"},
        }

        if (!validKeysAndFunctions[key]) throw new CustomError('cyan', `>> set: Key '${key}' not found`);
        if (!validKeysAndFunctions[key].test(value)) throw new CustomError('cyan', `>> set: Value of '${key}' ${validKeysAndFunctions[key].error}`);

        this[key] = value;
    }

    setDefault = (component, value) => {
        const validComponents = ['button', 'select', 'modal'];  

        if (!component) throw new CustomError('cyan', '>> setDefault: Component (string) is required');
        if (!validComponents.includes(component)) throw new CustomError('cyan', `>> setDefault: Component '${component}' not found`);
        if (!value) throw new CustomError('cyan', '>> setDefault: Value (object) is required');

        defaultSettingsCache.set(component, value);
    }

    startListening = () => {
        this.client.on('ready', async () => {
            const setupCommand = new SetupCommand(this.client, this.commandsPath, this.componentsPath);
            await setupCommand.setup();

            this.commands = this.client.slashCommands;
            this.client.easeClient = this;
        })

        this.client.on("interactionCreate", async (interaction) => {
            const runInteractionHandler = this.getInteractionCallback(interaction.customId, interaction) ;
            if (runInteractionHandler) return await runInteractionHandler();
        })
    }

    invokeInteraction = async (interactionCustomId, interaction) => {
        const runInteractionHandler = this.getInteractionCallback(interactionCustomId, interaction);
        if (runInteractionHandler) return await runInteractionHandler();
    }

    invokeCommand = async (commandName, interaction) => {
        const command = this.commands.get(commandName);
        if (!command) return console.log(`Command not found: ${commandName}`);

        await command.run(this.client, interaction);
    }

    getInteractionCallback = (customId, interaction) => {
        let customId_without_params = customId?.split(":")[0];
        const interactionHandler = interactionHandlers.get(customId) || interactionHandlers.get(customId_without_params);

        if (interactionHandler) {
            let params = [];

            if (interactionHandler.useParams) {
                const separate_params = customId.split(":"); // separando os parametros, por exemplo: ['guild_id', 'client_id']
                params = separate_params.slice(1); // pegando os parametros, por exemplo: ['guild_id', 'client_id']
            }

            const callback = interactionHandlers.get(interactionHandler.useParams ? customId_without_params : customId)?.run;
            if (!callback) return console.log(`\x1b[36mCallback not found for customId: ${interaction.customId}\x1b[0m`);

            // vamos retornar a função para ser chamada posteriormente
            return interactionHandler.useParams ? callback.bind(null, this.client, interaction, ...params) : callback.bind(null, this.client, interaction)
        }
    }
}