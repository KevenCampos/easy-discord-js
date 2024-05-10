import Discord from "discord.js";
import InteractionHandler from "../handler/InteractionHandler.mjs";
import { defaultSettingsCache, CustomError } from '../index.mjs';

const inputTypes = {text: Discord.TextInputBuilder}

export default class {
    constructor(modalData) {
        let {title, inputs, customId, callback} = modalData;

        title = title || defaultSettingsCache.get("modal")?.title;
        customId = customId || defaultSettingsCache.get("modal")?.customId;

        if (!title) {
            throw new CustomError('cyan', '>> Modal title is required');
        }

        if (!inputs || inputs?.length === 0) {
            throw new CustomError('cyan', '>> Modal inputs is required');
        }

        if (!customId && !callback){
            throw new CustomError('cyan', '>> Modal customId or callback is required');
        }

        if (callback){
            customId = `${title.replace(/ /g, "_").toLowerCase()}_${inputs?.length}`;
            new InteractionHandler({ customId: customId, callback: callback});
        }

        this.modal = new Discord.ModalBuilder()
        this.modal.setTitle(title);
        this.modal.setCustomId(customId);

        inputs.forEach(input => {
            if (!input.type) {
                throw new CustomError('cyan', '>> Input type is required');
            }

            if (!input.label) {
                throw new CustomError('cyan', '>> Input label is required');
            }

            if (!input.style) {
                throw new CustomError('cyan', '>> Input style is required');
            }

            if (!input.customId) {
                throw new CustomError('cyan', '>> Input custom_id is required');
            }

            const inputTypeFunction = inputTypes[input.type];
            if (!inputTypeFunction) {
                throw new CustomError('cyan', '>> Invalid input type');
            }

            const newComponent = new inputTypeFunction();

            newComponent.setCustomId(input.customId);
            newComponent.setLabel(input.label);
            newComponent.setStyle(input.style);

            if (input.placeholder) newComponent.setPlaceholder(input.placeholder);

            this.modal.addComponents(new Discord.ActionRowBuilder().addComponents(newComponent))
        })  
    }

    show = async (interaction) => {
        return await interaction.showModal(this.modal);
    }
}