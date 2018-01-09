const {Command} = require('discord.js-commando');
const offCommands = require('../../utils/electronics.js').off;

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'off',
			group: 'lights',
			memberName: 'off',
			description: 'Turns off a specific light.',
			details: 'Turns off a specific light.',
			examples: ['off kitchen', 'off fish'],
			format: '[device]',
			guildOnly: false,
			args: [
				{
					key: 'query',
					prompt: 'Which lights would you like to turn off?',
					type: 'string',
					default: '',
					format: '[query]',
				},
			],
		});
	}

	async run(msg, args) {
		const {query} = args;
		const offKeys = Object.keys(offCommands);

		for (let i = 0; i < offKeys.length; i++) {
			if (query.toLowerCase().includes(offKeys[i])) {
				offCommands[offKeys[i]](msg);
				return;
			}
		}
	}
};
