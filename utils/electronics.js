const credentials = require('../secure.json');
const HueManager = require('hue-manager');
const hm = new HueManager();
const request = require('request-promise');
hm.setBridge(credentials.hue.ip).setUser(credentials.hue.username);

function stringToBool(onOrOff) {
	return onOrOff == 'off' ? false : true;
}

module.exports = {
	toggles: {
		kitchen: async function(msg, onOrOff) {
			onOrOff = stringToBool(onOrOff.toLowerCase());
			hm.getLightsByGroupName('Kitchen').then((bulbs) => {
				bulbs.forEach((bulb) => {
					onOrOff ? bulb.turnOn() : bulb.turnOff();
				});
			}).then(() => {
				msg.say(`The **Kitchen lights** are now turned ${onOrOff ? 'on' : 'off'}.`);
			});
		},
		kuwar: async function(msg, onOrOff) {
			onOrOff = stringToBool(onOrOff.toLowerCase());
			hm.getLightsByName('Kuwar1').then((bulb) => {
				onOrOff ? bulb[0].turnOn() : bulb[0].turnOff();
			}).then(() => {
				msg.say(`The **Kuwar light** are now turned ${onOrOff ? 'on' : 'off'}.`);
			});
		},
		fish: async function(msg, onOrOff) {
			onOrOff = stringToBool(onOrOff.toLowerCase());
			request({
				uri: `https://maker.ifttt.com/trigger/fishLights${onOrOff ? 'On' : 'Off'}/with/key/${credentials.ifttt.key}`,
				method: 'POST',
				json: true,
			}).then(() => {
				msg.say(`The **fish lights** are now turned ${onOrOff ? 'on' : 'off'}.`);
			});
		},
	},
};
