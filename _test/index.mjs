import { EaseClient } from "#ease-discord-js"
import { config } from "dotenv" 
config();

const easeClient = new EaseClient(process.env.BOT_TOKEN);

// Setting the paths for the commands and components
easeClient.set("commandsPath", "./_test/commands");
easeClient.set("componentsPath", "./_test/components");

// Setting default values for the components, you can also set them individually
easeClient.setDefault("button", {style: "Primary"})

const client = easeClient.login();
client.on('ready', async (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
});



