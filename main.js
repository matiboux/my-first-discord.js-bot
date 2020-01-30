// Bot Discord client
const Discord = require('discord.js');
const client = new Discord.Client();

// Bot Configuration
const config = require('./config.json');
const token = config.token, prefix = config.prefix;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === `${prefix}ping`) {
		msg.channel.send('Pong.');
	} else if (msg.content === `${prefix}beep`) {
		msg.channel.send('Boop.');
	} else if (msg.content === `${prefix}server`) {
		msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
	} else if (msg.content === `${prefix}user-info`) {
		msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
	}
});

// Run the discord bot
client.login(token);
