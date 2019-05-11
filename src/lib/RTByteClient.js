const { KlasaClient } = require('klasa');

KlasaClient.use(require('klasa-member-gateway'));

const permissionLevels = require('./structures/schemas/permissionLevels');
const defaultGuildSchema = require('./structures/schemas/defaultGuildSchema');
const defaultClientSchema = require('./structures/schemas/defaultClientSchema');
const defaultUserSchema = require('./structures/schemas/defaultUserSchema');
const defaultMemberSchema = require('./structures/schemas/defaultMemberSchema');

class RTByteClient extends KlasaClient {

	constructor(options) {
		super({ ...options, permissionLevels, defaultGuildSchema, defaultClientSchema, defaultUserSchema, defaultMemberSchema });
	}

}

module.exports = RTByteClient;