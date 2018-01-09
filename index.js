const secure = require('./secure.json');
const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');

const HomeControl = new Commando.Client({
	owner: '147604925612818432',
	commandPrefix: '.',
	unknownCommandResponse: false,
});

HomeControl.registry
	.registerGroups([
		['lights', 'Light Control Commands'],
	])
	.registerDefaultTypes()
	.registerCommandsIn(path.join(__dirname, 'commands'));

HomeControl.on('ready', () => {
	console.log('lets do it');
});

HomeControl.on('message', (msg) => {
});

HomeControl.setProvider(
	sqlite.open(path.join(__dirname, 'settings.sqlite3')).then((settingsProvider) => new Commando.SQLiteProvider(settingsProvider))
).catch(console.error);

HomeControl.login(secure.discordAPIKey);
