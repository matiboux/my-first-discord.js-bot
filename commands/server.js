module.exports = {
	name: 'server',
	description: 'General information about the server',
	guildOnly: true,
	execute(message, args) {
		message.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
	},
};
