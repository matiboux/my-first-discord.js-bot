module.exports = {
	name: 'role',
	description: 'Role operations on users.',
	args: true,
	usage: '<user> <has/add/remove> <role>',
	adminOnly: true,
	execute(message, args) {
		const member = message.mentions.members.first();
		if (!member) return message.channel.send(`.`);
		
		if (args.length <= 1) {
			const roles = message.member.roles.map(role => `\`${role.name}\``);
			return message.channel.send(`${member}'s roles: ${roles}`);
		}
		else if (args[1] === 'has') {
			const role = message.guild.roles.some(
				role => role.name.localeCompare(args[2], undefined, { sensitivity: 'accent' }) === 0);
				
			if (role) return message.channel.send(`${member} has the role ${args[2]}`);
			return message.channel.send(`${member} has not the role ${args[2]}`);
		}
		else if (args[1] === 'add') {
			const role = message.guild.roles.find(
				role => role.name.localeCompare(args[2], undefined, { sensitivity: 'accent' }) === 0);
			
			return member.roles.add(role, `${member.author} requested this`)
				.then(() => message.channel.send(`Added the role ${args[2]} to ${member}`))
				.catch(() => message.channel.send(`Couldn't add the role ${args[2]} to ${member}`));
		}
		else if (args[1] === 'remove') {
			const role = message.guild.roles.find(
				role => role.name.localeCompare(args[2], undefined, { sensitivity: 'accent' }) === 0);
			
			return member.roles.remove(role, `${member.author} requested this`)
				.then(() => message.channel.send(`Removed the role ${args[2]} from ${member}`))
				.catch(() => message.channel.send(`Couldn't remove the role ${args[2]} from ${member}`));
		}
	},
};