const express = require('express');
const scoresRouter = require('./routes');
const { endConnection } = require('./client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api', scoresRouter, endConnection);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
