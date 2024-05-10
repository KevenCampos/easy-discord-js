import Discord from 'discord.js';
import { defaultSettingsCache, CustomError } from '../index.mjs';

export default class {
    UserSelectMenuBuilder(menuData){
        try {
            const customId = menuData.customId || defaultSettingsCache.get("selectMenu")?.customId;
            const placeholder = menuData.placeholder || defaultSettingsCache.get("selectMenu")?.placeholder;
            let minValue = menuData.minValue || defaultSettingsCache.get("selectMenu")?.minValue;
            let maxValue = menuData.maxValue || defaultSettingsCache.get("selectMenu")?.maxValue;

            if (!customId) throw new CustomError('cyan', '>> SelectMenu custom_id is required');
            if (!placeholder) throw new CustomError('cyan', '>> SelectMenu placeholder is required');
            if (!minValue) minValue = 1;
            if (!maxValue) maxValue = 1;

            this.selectMenu = new Discord.UserSelectMenuBuilder();
            this.selectMenu.setCustomId(customId);
            this.selectMenu.setPlaceholder(placeholder);
            this.selectMenu.setMinValues(minValue);
            this.selectMenu.setMaxValues(maxValue);

            return this.selectMenu;
        }catch(error){
            throw new CustomError('cyan', error.message);
        }
    }

    StringSelectMenuBuilder(menuData){
        try {
            const customId = menuData.customId || defaultSettingsCache.get("selectMenu")?.customId;
            const placeholder = menuData.placeholder || defaultSettingsCache.get("selectMenu")?.placeholder;
            let minValue = menuData.minValue || defaultSettingsCache.get("selectMenu")?.minValue;
            let maxValue = menuData.maxValue || defaultSettingsCache.get("selectMenu")?.maxValue;

            if (!customId) throw new CustomError('cyan', '>> SelectMenu custom_id is required');
            if (!placeholder) throw new CustomError('cyan', '>> SelectMenu placeholder is required');
            if (!minValue) minValue = 1;
            if (!maxValue) maxValue = 1;
            if (!menuData.options || menuData.options.length <= 0) throw new CustomError('cyan', '>> SelectMenu options is required. You need to pass an array of options');

            this.selectMenu = new Discord.StringSelectMenuBuilder();
            this.selectMenu.setCustomId(customId);
            this.selectMenu.setPlaceholder(placeholder);
            this.selectMenu.setMinValues(minValue);
            this.selectMenu.setMaxValues(maxValue);

            menuData.options.forEach(option => {
                if (!option.label) throw new CustomError('cyan', '>> SelectMenu option label is required');
                if (!option.value) throw new CustomError('cyan', '>> SelectMenu option value is required');

                const option_builder = new Discord.StringSelectMenuOptionBuilder()
                option_builder.setLabel(option.label);
                option_builder.setValue(String(option.value));

                if (option.emoji) option_builder.setEmoji(option.emoji);
                if (option.description) option_builder.setDescription(option.description);
                if (option.default) option_builder.setDefault(option.default);

                this.selectMenu.addOptions(option_builder);
            });

            return this.selectMenu;
        }catch(error){
            throw new CustomError('cyan', error.message);
        }
    }

    ChannelSelectMenuBuilder(menuData){
        try {
            const customId = menuData.customId || defaultSettingsCache.get("selectMenu")?.customId;
            const placeholder = menuData.placeholder || defaultSettingsCache.get("selectMenu")?.placeholder;
            let minValue = menuData.minValue || defaultSettingsCache.get("selectMenu")?.minValue;
            let maxValue = menuData.maxValue || defaultSettingsCache.get("selectMenu")?.maxValue;
            let type = menuData.type || defaultSettingsCache.get("selectMenu")?.type;

            if (!customId) throw new CustomError('cyan', '>> SelectMenu custom_id is required');
            if (!placeholder) throw new CustomError('cyan', '>> SelectMenu placeholder is required');
            if (!minValue) minValue = 1;
            if (!maxValue) maxValue = 1;
            if (!type) type = Discord.ChannelType.GuildText;

            this.selectMenu = new Discord.ChannelSelectMenuBuilder();
            this.selectMenu.setCustomId(customId);
            this.selectMenu.setPlaceholder(placeholder);
            this.selectMenu.setMinValues(minValue);
            this.selectMenu.setMaxValues(maxValue);
            this.selectMenu.setChannelTypes(type);

            return this.selectMenu;
        }catch(error){
            throw new CustomError('cyan', error.message);
        }
    }

    RoleSelectMenuBuilder(menuData){
        try {
            const customId = menuData.customId || defaultSettingsCache.get("selectMenu")?.customId;
            const placeholder = menuData.placeholder || defaultSettingsCache.get("selectMenu")?.placeholder;
            let minValue = menuData.minValue || defaultSettingsCache.get("selectMenu")?.minValue;
            let maxValue = menuData.maxValue || defaultSettingsCache.get("selectMenu")?.maxValue;

            if (!customId) throw new CustomError('cyan', '>> SelectMenu custom_id is required');
            if (!placeholder) throw new CustomError('cyan', '>> SelectMenu placeholder is required');
            if (!minValue) minValue = 1;
            if (!maxValue) maxValue = 1;

            this.selectMenu = new Discord.RoleSelectMenuBuilder();
            this.selectMenu.setCustomId(customId);
            this.selectMenu.setPlaceholder(placeholder);
            this.selectMenu.setMinValues(minValue);
            this.selectMenu.setMaxValues(maxValue);

            return this.selectMenu;
        }catch(error){
            throw new CustomError('cyan', error.message);
        }
    }
}