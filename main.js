const fs = require('fs');

// Bot Discord client
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Bot Configuration
const config = require('./config.json');
const token = config.token, prefix = config.prefix;

// ***

// Load handlers for commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// ***

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	if (!client.commands.has(commandName)) return;
	
	const command = client.commands.get(commandName);
	
	if(!command) return;
	
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// Run the discord bot
client.login(token);
