const credentials = require('../secure.json');
const HueManager = require('hue-manager');
const hm = new HueManager();
const request = require('request-promise');
hm.setBridge(credentials.hue.ip).setUser(credentials.hue.username);

module.exports = {
	on: {
		kitchen: async function(msg) {
			hm.getLightsByGroupName('Kitchen').then((bulbs) => {
				bulbs.forEach((bulb) => {
					bulb.turnOn();
				});
			}).then(() => {
				msg.say('The **Kitchen lights** are now turned on.');
			});
		},
		kuwar: async function(msg) {
			hm.getLightsByName('Kuwar1').then((bulb) => {
				bulb[0].turnOn();
			}).then(() => {
				msg.say('The **Kuwar light** is now turned on.');
			});
		},
		fish: async function(msg) {
			request({
				uri: `https://maker.ifttt.com/trigger/fishLightsOn/with/key/${credentials.ifttt.key}`,
				method: 'POST',
				json: true,
			}).then(() => {
				msg.say('The **fish lights** are now turned on.');
			});
		},
	},
	off: {
		kitchen: async function(msg) {
			hm.getLightsByGroupName('Kitchen').then((bulbs) => {
				bulbs.forEach((bulb) => {
					bulb.turnOff();
				});
			}).then(() => {
				msg.say('The **kitchen lights** are now turned off.');
			});
		},
		kuwar: async function(msg) {
			hm.getLightsByName('Kuwar1').then((bulb) => {
				bulb[0].turnOff();
			}).then(() => {
				msg.say('The **Kuwar light** is now turned off.');
			});
		},
		fish: async function(msg) {
			request({
				uri: `https://maker.ifttt.com/trigger/fishLightsOff/with/key/${credentials.ifttt.key}`,
				method: 'POST',
				json: true,
			}).then(() => {
				msg.say('The **fish lights** are now turned off.');
			});
		},
	},
};
