import Discord from "discord.js";
import { CustomError } from "../index.mjs";

export default class {
    constructor(embedData) {
        try {

            if (embedData.color === 'RANDOM') embedData.color = Math.floor(Math.random() * 16777215);

            this.title = embedData.title;
            this.description = embedData.description;
            this.color = embedData.color;
            this.footer = embedData.footer;
            this.fields = embedData.fields;
            this.author = embedData.author;
            this.image = embedData.image;
            this.thumbnail = embedData.thumbnail;
            this.timestamp = embedData.timestamp;
    
            this.embed = new Discord.EmbedBuilder();
    
            if (this.fields) {
                this.fields.forEach(field => {
                    if (!field.name || !field.value) return new CustomError('cyan', '>> Field name and value are required');
                    this.embed.addFields({name: field.name, value: field.value, inline: field.inline || false});
                })
            }
    
            if (this.title) this.embed.setTitle(this.title);
            if (this.description) this.embed.setDescription(this.description);
            if (this.color) this.embed.setColor(this.color);    
            if (this.footer) this.embed.setFooter(this.footer);
            if (this.author) this.embed.setAuthor(this.author);
            if (this.image) this.embed.setImage(this.image);
            if (this.thumbnail) this.embed.setThumbnail(this.thumbnail);
            if (this.timestamp) this.embed.setTimestamp();

            return this.embed;

        }catch (error){
            throw new CustomError('cyan', error.message);
        }
    }

}