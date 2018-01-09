const {Command} = require('discord.js-commando');
const onCommands = require('../../utils/electronics.js').on;

module.exports = class ReplyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'on',
			group: 'lights',
			memberName: 'on',
			description: 'Turns on a specific light.',
			details: 'Turns on a specific light.',
			examples: ['on kitchen', 'on fish'],
			format: '[device]',
			guildOnly: false,
			args: [
				{
					key: 'query',
					prompt: 'Which lights would you like to turn on?',
					type: 'string',
					default: '',
					format: '[query]',
				},
			],
		});
	}

	async run(msg, args) {
		const {query} = args;
		const onKeys = Object.keys(onCommands);

		for (let i = 0; i < onKeys.length; i++) {
			if (query.toLowerCase().includes(onKeys[i])) {
				onCommands[onKeys[i]](msg);
				return;
			}
		}
	}
};
