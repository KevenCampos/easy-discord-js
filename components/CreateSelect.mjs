import Discord from 'discord.js';



export default class {
    UserSelectMenuBuilder(menuData){
        try {
            if (!menuData.customId) throw new Error('>> SelectMenu custom_id is required');
            if (!menuData.placeholder) throw new Error('>> SelectMenu placeholder is required');
            if (!menuData.minValue) menuData.minValue = 1;
            if (!menuData.maxValue) menuData.maxValue = 1;

            this.selectMenu = new Discord.UserSelectMenuBuilder();
            this.selectMenu.setCustomId(menuData.customId);
            this.selectMenu.setPlaceholder(menuData.placeholder);
            this.selectMenu.setMinValues(menuData.minValue);
            this.selectMenu.setMaxValues(menuData.maxValue);

            return this.selectMenu;
        }catch(error){
            throw new Error(error.message);
        }
    }

    StringSelectMenuBuilder(menuData){
        try {
            if (!menuData.customId) throw new Error('>> SelectMenu custom_id is required');
            if (!menuData.placeholder) throw new Error('>> SelectMenu placeholder is required');
            if (!menuData.minValue) menuData.minValue = 1;
            if (!menuData.maxValue) menuData.maxValue = 1;
            if (!menuData.options || menuData.options.length <= 0) throw new Error('>> SelectMenu options is required. You need to pass an array of options');

            this.selectMenu = new Discord.StringSelectMenuBuilder();
            this.selectMenu.setCustomId(menuData.customId);
            this.selectMenu.setPlaceholder(menuData.placeholder);
            this.selectMenu.setMinValues(menuData.minValue);
            this.selectMenu.setMaxValues(menuData.maxValue);
            this.selectMenu.addOptions(menuData.options);

            return this.selectMenu;
        }catch(error){
            throw new Error(error.message);
        }
    }

    ChannelSelectMenuBuilder(menuData){
        try {
            if (!menuData.customId) throw new Error('>> SelectMenu custom_id is required');
            if (!menuData.placeholder) throw new Error('>> SelectMenu placeholder is required');
            if (!menuData.minValue) menuData.minValue = 1;
            if (!menuData.maxValue) menuData.maxValue = 1;
            if (!menuData.type) menuData.type = 1;

            this.selectMenu = new Discord.ChannelSelectMenuBuilder();
            this.selectMenu.setCustomId(menuData.customId);
            this.selectMenu.setPlaceholder(menuData.placeholder);
            this.selectMenu.setMinValues(menuData.minValue);
            this.selectMenu.setMaxValues(menuData.maxValue);
            this.selectMenu.setChannelTypes(menuData.type);

            return this.selectMenu;
        }catch(error){
            throw new Error(error.message);
        }
    }

    RoleSelectMenuBuilder(menuData){
        try {
            if (!menuData.customId) throw new Error('>> SelectMenu custom_id is required');
            if (!menuData.placeholder) throw new Error('>> SelectMenu placeholder is required');
            if (!menuData.minValue) menuData.minValue = 1;
            if (!menuData.maxValue) menuData.maxValue = 1;

            this.selectMenu = new Discord.RoleSelectMenuBuilder();
            this.selectMenu.setCustomId(menuData.customId);
            this.selectMenu.setPlaceholder(menuData.placeholder);
            this.selectMenu.setMinValues(menuData.minValue);
            this.selectMenu.setMaxValues(menuData.maxValue);

            return this.selectMenu;
        }catch(error){
            throw new Error(error.message);
        }
    }
}