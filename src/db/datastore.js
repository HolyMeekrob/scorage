const Sequelize = require('sequelize');

const datastore = () => {
	const name = process.env.DB_NAME;
	const user = process.env.DB_USER;
	const pass = process.env.DB_PASS;

	const options = {
		dialect: 'postgres',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		define: {
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
			deletedAt: false
		}
	};

	return new Sequelize(
		name,
		user,
		pass,
		options
	);
};

module.exports = datastore();
