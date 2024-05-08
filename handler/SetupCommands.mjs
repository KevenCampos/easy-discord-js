import Discord from "discord.js";
import path from "node:path";
import fs from "fs";
import { pathToFileURL } from 'url';

export default class SetupCommand {
    constructor(client, commandsPath = "./commands", componentsPath = "./components"){
        this.client = client;
        this.SlashsArray = [];

        this.commandsPath = commandsPath;
        this.componentsPath = componentsPath;

        this.setup(client);
    }

    setup = async (client) => {
        const root_path = path.resolve();
        client = client;
        client.slashCommands = new Discord.Collection();
        
        // Lê o diretório de comandos de forma síncrona
        const commandFolders = fs.readdirSync(`${root_path}/${this.commandsPath}`);

        if (commandFolders){
            for (const folder of commandFolders) {
                // Lê os arquivos dentro de cada pasta de comando
                const commandFiles = fs.readdirSync(`${this.commandsPath}/${folder}`).filter(file => (file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith(".ts")) );
    
                for (const file of commandFiles) {
                    // Importa cada arquivo de comando individualmente
                    const commandPath = pathToFileURL(`${root_path}/${this.commandsPath}/${folder}/${file}`).href;
                    const command = await import(commandPath);
    
                    // Verifica se o arquivo exporta um comando válido
                    if (command.default) {
                        client.slashCommands.set(command.default.name, command.default);
                        this.SlashsArray.push(command.default);
                    }
                }
            }
        }
        
        const componentsFolder = fs.readdirSync(`${root_path}/${this.componentsPath}`);
        if (componentsFolder){
            for (const folder of componentsFolder) {
                const componentFiles = fs.readdirSync(`${root_path}/${this.componentsPath}/${folder}`).filter(file => (file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith(".ts")) );

                for (const file of componentFiles) {
                    const componentPath = pathToFileURL(`${root_path}/${this.componentsPath}/${folder}/${file}`).href;
                    await import(componentPath);
                }
            }
        }

        client.guilds.cache.forEach(guild => guild.commands.set(this.SlashsArray))
        this.createInteractionHandler(client);
    }

    createInteractionHandler = (client) => {
        client.on('interactionCreate', async (interaction) => {
            if (interaction.type === Discord.InteractionType.ApplicationCommand) { // Verifica se a interação é do tipo ApplicationCommand (comando de aplicação)
                const cmd = client.slashCommands.get(interaction.commandName)
                if (!cmd) {  // Verifica se o comando de barra recebido existe nos comandos de barra registrados no bot
                    return interaction.reply({content: 'Error on interaction!', ephemeral: true}); // Se o comando não existir, responde com 'Error' e interrompe o processamento desse comando
                }
        
                // Adiciona a propriedade 'member' à interação, associando o membro correspondente ao usuário que enviou a interação
                interaction['member'] = interaction.guild.members.cache.get(interaction.user.id);
                
                // Chama a função run do comando associado à interação, passando o cliente e a interação como argumentos
                cmd.run(client, interaction);
            }
        
            if(interaction.isAutocomplete()) {
                const command = client.slashCommands.get(interaction.commandName)
                if(!command) {
                    return;
                }
          
                try{
                    if (command.autocomplete){
                        await command.autocomplete(interaction);
                    }
                }catch(err){
                    if (err.stack){
                        const stackLines = err.stack.split('\n');
                        const relevantLine = stackLines[1]; // A primeira linha normalmente é a própria mensagem de erro
        
                        console.log("AutoComplete Error: ", err.message, "\nLine:", relevantLine)
                    }else{
                        console.log("AutoComplete Error: ", err.message)
                    }
                }
            }   
        });
    }
}