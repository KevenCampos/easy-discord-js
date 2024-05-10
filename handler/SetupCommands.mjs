import Discord from "discord.js";
import path from "node:path";
import fs from "fs";

import { pathToFileURL } from 'url';
import { CustomError } from "../index.mjs";

export default class SetupCommand {
    constructor(client, commandsPath, componentsPath){
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
        
        if (this.commandsPath){
            const files = this.getRecursiveFiles(`${root_path}/${this.commandsPath}`);
            if (!files) throw new CustomError("cyan", `Commands path not found: '${this.commandsPath}'. You need to pass a valid path to the commands folder`);

            for (const file of files) {
                
                const isValidFile = file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith(".ts");
                if (!isValidFile) continue; 

                const commandPath = pathToFileURL(file).href;
                const command = await import(commandPath).catch(err => {
                    throw new CustomError('cyan', `Error on import command: ${err}`)
                });

                if (command?.default) {
                    const isValidCommand = command.default.name && command.default.run;
                    if (!isValidCommand) throw new CustomError('cyan', `Invalid command: ${command.default.name}. Command should have a unique name and a run function`);

                    client.slashCommands.set(command.default.name, command.default);
                    this.SlashsArray.push(command.default);
                }
            }
        }

        if (this.componentsPath){
            const files = this.getRecursiveFiles(`${root_path}/${this.componentsPath}`);
            if (!files) throw new CustomError("cyan", `Components path not found: '${this.componentsPath}'. You need to pass a valid path to the components folder`);

            for (const file of files) {
                const isValidFile = file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith(".ts");
                if (!isValidFile) continue; 

                const componentPath = pathToFileURL(file).href;
                await import(componentPath).catch(err => {
                    throw new CustomError('cyan', `Error on import component: ${err}`)
                });
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

    getRecursiveFiles = (dir) => {
        if (!fs.existsSync(dir)) return null;

        const dirents = fs.readdirSync(dir, { withFileTypes: true });
        const files = dirents.map(dirent => {
            const res = path.resolve(dir, dirent.name);
            return dirent.isDirectory() ? this.getRecursiveFiles(res) : res;
        });
        return Array.prototype.concat(...files);
    }
}