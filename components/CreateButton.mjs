import Discord from 'discord.js';
import InteractionHandler from "../handler/InteractionHandler.mjs";
import { defaultSettingsCache, CustomError } from '../index.mjs';

export default class {
    constructor(buttonData) {
        try {
            let customId = buttonData.customId || defaultSettingsCache.get("button")?.customId;
            const style = buttonData.style || defaultSettingsCache.get("button")?.style;
            const label = buttonData.label || defaultSettingsCache.get("button")?.label;
            const disabled = buttonData.disabled || defaultSettingsCache.get("button")?.disabled;
            const emoji = buttonData.emoji || defaultSettingsCache.get("button")?.emoji;

            if (!customId && !buttonData.url && !buttonData.onClick) throw new CustomError('cyan', '>> Button: customId or url or onClick is required');
            if (customId && buttonData.url) throw new CustomError('cyan', '>> Button: customId and url cannot be used together');
            if (!label) throw new CustomError('cyan', '>> Button label is required');

            this.button = new Discord.ButtonBuilder();
            this.button.setLabel(label);
            this.button.setStyle(style || 1);
            this.button.setDisabled(disabled || false);
            
            if (emoji) this.button.setEmoji(emoji);
            if (buttonData.url) this.button.setURL(buttonData.url);
            
            if (buttonData.onClick && !buttonData.url){
                customId = `${label.replace(/ /g, "_").toLowerCase()}_${style}_${disabled}_${emoji}`;
                new InteractionHandler({ customId: customId, run: buttonData.onClick});
            }
            
            if (customId) this.button.setCustomId(customId);
            return this.button;
        }catch(error){
            if (error.message.includes("Expected the value to be one of the following enum values:")){
                return new Discord.ButtonBuilder().setLabel("Style Button Invalid").setStyle(4).setDisabled(true).setCustomId(Math.random().toString(36).substring(7));
            }

            throw new CustomError('cyan', error.message);
        }
    }
}