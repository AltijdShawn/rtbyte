const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			requiredPermissions: ['ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'SEND_MESSAGES', 'EMBED_LINKS'],
			runIn: ['text'],
			description: language => language.get('COMMAND_SUPPORT_DESCRIPTION'),
			usage: '[reason:...string]',
			usageDelim: ' '
		});
	}

	async run(message, [...reason]) {
		const globalLogChannel = await this.client.channels.get(this.client.settings.channels.globalLog);
		const embed = new MessageEmbed()
			.setAuthor(`${message.guild.name} (#${message.channel.name})`, message.guild.iconURL())
			.setColor(this.client.settings.colors.red)
			.setTitle(message.guild.language.get('COMMAND_SUPPORT_REQUESTED'))
			.setDescription(`[${message.guild.language.get('GLOBAL_LOG_COMMANDRUNVIEW')}](${message.url})`)
			.setTimestamp()
			.setFooter(message.author.tag, message.author.displayAvatarURL());

		if (reason.length) embed.addField('Reason', reason.join(' '));
		await globalLogChannel.send('@everyone', { embed: embed });

		return message.reply(`\n${message.guild.language.get('COMMAND_SUPPORT_CONTACTED')}`);
	}

};