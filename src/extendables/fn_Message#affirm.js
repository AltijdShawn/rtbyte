const { Extendable } = require('klasa');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, {
			name: 'affirm',
			enabled: true,
			appliesTo: ['Message'],
			klasa: false
		});
	}

	async extend() {
		const affirmEmoji = await this.client.emojis.get(this.client.configs.emoji.affirm);
		await this.react(affirmEmoji);
		return this;
	}

};