
# EasyDiscordJS

EasyDiscordJS is an unofficial extension of the "discord.js" library. Our extension aims to simplify the development of Discord bots, promoting cleaner code and easier maintenance.

## Features
- Error prevention with user-friendly messages
- Callback functions
- Less code, more efficiency
- Code and performance optimization
- Comprehensive documentation


## Installation
```sh
npm install easy-discord-js
```
## Exemplo de Uso
```js
import { EasyLogin } from '@easy-discord-js';

const token = "your_token_here";

// commandsPath and componentsPath are optional parameters, you can use it to load the folder where your commands and components are located, if you want to do this process manually it is also possible.
const commandsPath = "./commands";
const componentsPath = "./components";

const login = new EasyLogin({token: token, commandsPath, componentsPath});

login.client.on('ready', async (client) => {
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

const login = new EasyLogin({token: token, commandsPath, componentsPath, intents});
login.client.on('ready', async (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
});
```
## Autores

- [@KevenCampos](https://www.github.com/KevenCampos)

