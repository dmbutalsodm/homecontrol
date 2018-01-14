const {Command} = require('discord.js-commando');
const onCommands = require('../../utils/electronics.js').toggles;
const timeConstants = require('../../constants/time.js');

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
				{
					key: 'options',
					prompt: 'Which lights would you like to turn on?',
					type: 'string',
					default: '',
					format: '[options]',
				},
			],
		});
	}

	async run(msg, args) {
		const {query, options} = args;
		const onKeys = Object.keys(onCommands);

		for (let i = 0; i < onKeys.length; i++) {
			if (query.toLowerCase().includes(onKeys[i])) {
				onCommands[onKeys[i]](msg, 'on');
				if (!options) return;
				let unitTime = options.replace('for', '').trim().toLowerCase().match(/second[s]?|minute[s]?|hour[s]?|day[s]?|half hour|half an hour/g)[0];
				if (unitTime.charAt(unitTime.length-1) == 's') unitTime = unitTime.substring(0, unitTime.length - 1);
				if (unitTime == 'half hour' || unitTime == 'half an hour') unitTime = 'halfhour';
				let time = options.replace(/[^0-9]/g, '').trim();
				if (options != null) {
					setTimeout(() => {
						onCommands[onKeys[i]](msg, 'off');
					}, time * timeConstants[unitTime]);
				}
				return;
			}
		}
		msg.say('I didn\'t find a light by that name');
	}
};
