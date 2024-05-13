import { ApplicationCommandType } from "discord.js";
import { CreateRow, CreateButton, InteractionHandler, CreateModal } from "#ease-discord-js";

export default {
    name: "test",
    description: "command to test the library",
    type: ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        return interaction.reply({components: [new CreateRow([new CreateButton({label: "Click me", style: "Primary", customId: "click_me:blue"})])]}); // Create a row with a button
    }
}   

new InteractionHandler({
    customId: "only_handler",
    useParams: true,

    run: async(client, interaction, param1, param2) => {
        return interaction.reply({content: "Handler acioned! param: " + String(param1) + " - " + String(param2), ephemeral: true});
    }
})

new InteractionHandler({
    customId: "click_me",
    useParams: true, 

    run: async(client, interaction, color) => {
        console.log(color)
        return client.easeClient.invokeInteraction("only_handler:blue:seucu", interaction);
    }
})