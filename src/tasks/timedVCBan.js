const { Task } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Task {

	async run({ guild, user }) {
		const _guild = this.client.guilds.get(guild);
		if (!_guild) return;
		const member = await _guild.members.fetch(user).catch(() => null);
		if (!member) return;
		const voiceBannedRole = await _guild.roles.get(_guild.settings.roles.voiceBanned);

		if (!member.roles.has(_guild.settings.roles.voiceBanned)) return;

		await member.roles.remove(voiceBannedRole);

		if (_guild.settings.logs.events.guildMemberVCUnBan) await this.vcUnBanLog(_guild, member);
	}

	async vcUnBanLog(_guild, member) {
		const embed = new MessageEmbed()
			.setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
			.setColor(this.client.settings.colors.yellow)
			.setTimestamp()
			.setFooter(_guild.language.get('GUILD_LOG_GUILDMEMBERVCUNBAN'));

		const logChannel = await this.client.channels.get(_guild.settings.channels.log);
		await logChannel.send('', { disableEveryone: true, embed: embed });
		// eslint-disable-next-line max-len
		if (_guild.settings.moderation.notifyUser) await member.user.send(_guild.language.get('MONITOR_MODERATION_AUTO_BOILERPLATE', _guild), { disableEveryone: true, embed: embed });
		return;
	}

};