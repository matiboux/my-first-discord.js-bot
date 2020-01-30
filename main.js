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
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (command === 'ping') {
		msg.channel.send('Pong.');
	}
	else if (command === 'beep') {
		msg.channel.send('Boop.');
	}
	else if (command === 'server') {
		msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
	}
	else if (command === 'user-info') {
		msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
	}
	else if (command === 'args-info') {
		if (!args.length) {
			return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
		}

		msg.channel.send(`Arguments (${args.length}): ${args}`);
	}
});

// Run the discord bot
client.login(token);
