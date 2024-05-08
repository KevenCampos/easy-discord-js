import Discord from "discord.js";
import crypto from "crypto";
import InteractionHandler from "../handler/InteractionHandler.mjs";

const inputTypes = {text: Discord.TextInputBuilder}

export default class {
    constructor(modalData) {
        let {title, inputs, customId, callback} = modalData;

        if (!title) {
            throw new Error('>> Modal title is required');
        }

        if (!inputs || inputs?.length === 0) {
            throw new Error('>> Modal inputs is required');
        }

        if (!customId && !callback){
            throw new Error('>> Modal customId or callback is required');
        }

        if (callback){
            let modalDataHash = crypto.createHash('sha256').update(title).digest('hex').substring(0, 16);
            customId = modalDataHash;

            new InteractionHandler({ customId: customId, callback: callback});
        }

        this.modal = new Discord.ModalBuilder()
        this.modal.setTitle(title);
        this.modal.setCustomId(customId);

        inputs.forEach(input => {
            if (!input.type) {
                throw new Error('>> Input type is required');
            }

            if (!input.label) {
                throw new Error('>> Input label is required');
            }

            if (!input.style) {
                throw new Error('>> Input style is required');
            }

            if (!input.customId) {
                throw new Error('>> Input custom_id is required');
            }

            const inputTypeFunction = inputTypes[input.type];
            if (!inputTypeFunction) {
                throw new Error('>> Invalid input type');
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