module.exports = {
	name: 'isadmin',
	description: 'Check if a user is admin',
	guildOnly: true,
	usage: '[user]',
	execute(message, args) {
		if (!message.mentions.members.size)
		{
			if (message.member.hasPermission('ADMINISTRATOR'))
				return message.reply('You are an Administrator!');
			
			return message.reply('You are not an Administrator.');
		}

		const member = message.mentions.members.first();

		if (message.mentions.members.every(member => member.hasPermission('ADMINISTRATOR')))
			return message.reply('They are an Administrator!');
		
		return message.reply('They are not an Administrator.' + message.mentions.members.size);
	},
};
