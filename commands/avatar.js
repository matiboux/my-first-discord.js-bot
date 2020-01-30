module.exports = {
	name: 'avatar',
	description: 'Get avatar URLs of requested users',
	execute(message, args) {
		if (!message.mentions.users.size)
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
		});

		// Send the array of strings as a message (joined by \n)
		message.channel.send(avatarList);
	},
};
