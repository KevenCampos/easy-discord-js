import Discord from 'discord.js';

export default class ActionRowComponent {
    constructor(...components) {
        try {
            if (components.length === 0) throw new Error('>> ActionRowComponent requires at least one component');
            if (components.length > 5) throw new Error('>> ActionRowComponent can only have up to 5 components');
            if (components[0].length > 0) components = components[0];

            this.row = new Discord.ActionRowBuilder();
            this.row.addComponents(components);
    
            return this.row;
        }catch(error){
            throw new Error(error.message);
        }
    }
}