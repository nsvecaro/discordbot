const { Client, GatewayIntentBits, Events } = require('discord.js');
const config = require('./config.json');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
  ] 
});

client.once(Events.ClientReady, () => {
  console.log('✅ Bot online!');
});

// Učitaj messageCreate event
require('./events/messageCreate')(client, config);

client.login(config.token);