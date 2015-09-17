const datastore = require('../datastore');
const Sequelize = require('sequelize');

const player = datastore.define('player', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true,
		primaryKey: true,
		autoIncrement: true
	},
	firstName: {
		type: Sequelize.TEXT,
		field: 'first_name'
	},
	middleName: {
		type: Sequelize.TEXT,
		field: 'middle_name'
	},
	lastName: {
		type: Sequelize.TEXT,
		field: 'last_name'
	},
	nickname: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	email: {
		type: Sequelize.TEXT
	},
	phone: {
		type: Sequelize.TEXT
	},
	address: {
		type: Sequelize.TEXT
	},
	description: {
		type: Sequelize.TEXT
	},
	website: {
		type: Sequelize.TEXT
	},
});

module.exports = player;
