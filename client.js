const { createClient } = require('redis');
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

const startConnection = async (req, res, next) => {
	console.log('Opening Redis client connection');
	await client.connect();
	next();
};
const endConnection = async (req, res, next) => {
	console.log('Closing Redis client connection');
	console.log(client.isOpen);
	await client.quit();
	console.log(client.isOpen);
};
exports.client = client;
exports.startConnection = startConnection;
exports.endConnection = endConnection;
