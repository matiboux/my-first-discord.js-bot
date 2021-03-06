const fs = require('fs');

// Bot Discord client
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

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

	// Split the string by unescaped spaces and parse escaped characters
	const args = message.content.slice(prefix.length).split(/(?<!\\) +/).map(arg => arg.replace('\\ ', ' '));
	
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	
	if (!command) return;
	
	if ((command.guildOnly || command.adminOnly) && message.channel.type !== 'text')
		return message.reply('I can\'t execute that command inside DMs!');
	if (command.adminOnly && message.member && !message.member.hasPermission('ADMINISTRATOR'))
		return message.reply('Only an Administrator can execute that command.');
	if (command.args && !args.length) {
		const reply = [];
		
		reply.push(`You didn't provide any arguments, ${message.author}!`);
		
		if (command.usage)
			reply.push(`\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``);

		return message.channel.send(reply);
	}
	
	if (!cooldowns.has(command.name))
		cooldowns.set(command.name, new Discord.Collection());

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// ***

client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

// ***

// Run the discord bot
client.login(token);
