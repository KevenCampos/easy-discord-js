
# EaseDiscordJS

EaseDiscordJS is an unofficial extension of the "discord.js" library. Our extension aims to simplify the development of Discord bots, promoting cleaner code and easier maintenance.

## Features
- Error prevention with user-friendly messages
- Callback functions
- Less code, more efficiency
- Code and performance optimization
- Comprehensive (documentation)["https://camposcodes.gitbook.io/easediscordjs"]


## Installation
```sh
npm install ease-discord-js
```
## Example of use
```js
import { EaseClient } from "ease-discord-js"
const easeClient = new EaseClient("YOUR_TOKEN_HERE");

// Setting the paths for the commands and components
easeClient.set("commandsPath", "./_test/commands"); // Optional
easeClient.set("componentsPath", "./_test/components"); // Optional

// Setting default values for the components, you can also set them individually
easeClient.setDefault("button", {style: "Primary"}) // Optional

const client = easeClient.login();
client.on('ready', async (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
});
```
You can also pass the intents you want to use within the object that will be sent to EasyLogin. If the intents are not passed, all intents will be sent to Discord.

**Example of login using intents:**
```js
import Discord from "discord.js"

const intents = [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.MessageContent
]

const easeClient = new EaseClient("YOUR_TOKEN_HERE");
easeClient.set("intents", intents);

const client = easeClient.login();
client.on('ready', async (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
});
```

This is just a little of our project, to see more details visit our (documentation)["https://camposcodes.gitbook.io/easediscordjs"]
## Authors

- [@KevenCampos](https://www.github.com/KevenCampos)

