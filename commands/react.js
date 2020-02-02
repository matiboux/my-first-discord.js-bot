module.exports = {
	name: 'react',
	description: 'Make the bot react to your message',
	execute(message, args) {
		message.react('😄');
	},
};
