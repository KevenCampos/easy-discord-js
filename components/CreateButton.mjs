import Discord from 'discord.js';
import InteractionHandler, { interactionHandlers } from "../handler/InteractionHandler.mjs";

export default class {
    constructor(buttonData) {
        try {
            if (!buttonData.customId && !buttonData.url && !buttonData.callback) throw new Error('>> Button: customId or url or callback is required');
            if (buttonData.customId && buttonData.url) throw new Error('>> Button: customId and url cannot be used together');
            if (!buttonData.label) throw new Error('>> Button label is required');

            this.button = new Discord.ButtonBuilder();
            this.button.setLabel(buttonData.label);
            this.button.setStyle(buttonData.style || 1);
            this.button.setDisabled(buttonData.disabled || false);
            
            if (buttonData.emoji) this.button.setEmoji(buttonData.emoji);
            if (buttonData.url) this.button.setURL(buttonData.url);
            
            if (buttonData.callback && !buttonData.url){
                buttonData.customId = `${buttonData.label.replace(/ /g, "_").toLowerCase()}_${buttonData.style}_${buttonData.disabled}_${buttonData.emoji}`;

                new InteractionHandler({ customId: buttonData.customId, callback: buttonData.callback});
            }
            
            if (buttonData.customId) this.button.setCustomId(buttonData.customId);
            return this.button;
        }catch(error){
            if (error.message.includes("Expected the value to be one of the following enum values:")){
                return new Discord.ButtonBuilder().setLabel("Style Button Invalid").setStyle(4).setDisabled(true).setCustomId(Math.random().toString(36).substring(7));
            }

            throw new Error(error.message);
        }
    }
}