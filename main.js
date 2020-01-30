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
	else if (command === 'kick') {
		if (!msg.mentions.users.size)
			return msg.reply(`${msg.author}, you need to tag a user in order to kick them!`);
		
		const taggedUser = msg.mentions.users.first();
		msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
	}
	else if (command === 'avatar') {
		if (!msg.mentions.users.size)
			return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL}>`);

		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
		});

		// Send the array of strings as a message (joined by \n)
		msg.channel.send(avatarList);
	}
	else if (command === 'prune') {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return msg.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount < 1 || amount > 100) {
			return msg.reply('you need to input a number between 2 and 100.');
		}

		msg.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			msg.channel.send('there was an error trying to prune messages in this channel!');
		});
	}
});

// Run the discord bot
client.login(token);
