import { ApplicationCommandType } from "discord.js";
import { CreateRow, CreateButton, InteractionHandler, CreateModal } from "#ease-discord-js";

export default {
    name: "test",
    description: "command to test the library",
    type: ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        const modal = new CreateModal({
            title: "Test Modal",
            customId: "test_modal",
            inputs: [
                {type: "text", label: "Test Input Short", customId: "test_input", style: "Short"},
                {type: "text", label: "Test Input Paragraph", customId: "test_input2", style: "Paragraph"},
            ],
        })

        return await modal.show(interaction)
    }
}