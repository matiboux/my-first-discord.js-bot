const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;

		if (!args.length) {
			const data = [];
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => `\`${command.name}\``).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
				});
		}
		
		const commandName = args[0].toLowerCase();
		const command = commands.get(commandName)
			|| commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return message.reply('that\'s not a valid command!');
		
		const messageEmbed = new Discord.MessageEmbed()
			.setColor('#808080')
			.setTitle(`Command: ${command.name}`)
			.setFooter('MatiBot');
			
		if (command.aliases) messageEmbed.addField('Aliases', command.aliases.join(', '));
		if (command.description) messageEmbed.setDescription(command.description);
		if (command.usage) messageEmbed.addField('Usage', `${prefix}${command.name} ${command.usage}`);
		
		messageEmbed.addField('Arguments required?', command.args ? 'Yes' : 'No', true);
		messageEmbed.addField('Is server-only?', command.guildOnly ? 'Yes' : 'No', true);
		messageEmbed.addField('Cooldown', `${command.cooldown || 3} second(s)`);

		message.channel.send(messageEmbed);
	},
};
