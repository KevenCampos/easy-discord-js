import Discord from 'discord.js';
import { CustomError } from '../index.mjs';

export default class ActionRowComponent {
    constructor(...components) {
        try {
            if (components.length === 0) throw new CustomError('cyan', '>> ActionRowComponent requires at least one component');
            if (components.length > 5) throw new CustomError('cyan', '>> ActionRowComponent can only have up to 5 components');
            if (components[0].length > 0) components = components[0];

            this.row = new Discord.ActionRowBuilder();
            this.row.addComponents(components);
    
            return this.row;
        }catch(error){
            throw new CustomError('cyan', error.message);
        }
    }
}