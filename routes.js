const { client, startConnection } = require('./client');
const scoresRouter = require('express').Router();
require('dotenv').config();

const listName = process.env.LISTNAME;

//Handle limit
scoresRouter.use('/scores/:limit', async (req, res, next) => {
	const limit = Number(req.params.limit) - 1;
	if (Number.isNaN(limit)) {
		return res.status(400).json('Invalid list limit');
	}
	req.limit = limit;
	next();
});

//Handle user
scoresRouter.use('/rank/:user', async (req, res, next) => {
	await client.connect();
	const rank = await client.zRank(listName, req.params.user);
	if (rank === null) {
		await client.quit();
		return res.status(400).json('Invalid user input');
	}
	req.rank = rank;
  next();
});

//GET all scores
scoresRouter.get('/scores', startConnection, async (req, res, next) => {
	const scores = await client.zRangeWithScores(listName, 0, -1);
	res.json(scores);
	next();
});

//GET top x scores
scoresRouter.get('/scores/:limit', startConnection, async (req, res, next) => {
	scores = await client.zRangeWithScores(listName, 0, req.limit);
	res.json(scores);
	next();
});

//GET user rank
scoresRouter.get('/rank/:user', async (req, res, next) => {
	const data = await client.zRangeWithScores(listName, req.rank, req.rank);
	//Users are zero indexed so add 1 for rank
	res.json({
		rank: req.rank + 1,
		score: data[0].score,
		user: data[0].value,
	});
	next();
});

//PUT scores
scoresRouter.put('/scores', startConnection, async (req, res, next) => {
	if (typeof req.body.score !== 'number' || typeof req.body.user !== 'string') {
		client.quit();
		return res.json('Invalid input! View docs for correct input types.');
	}
	const redisResponse = await client.zAdd(listName, {
		value: req.body.user,
		score: req.body.score,
	});
	if (redisResponse === 1) {
		res.status(201).json(`New score for ${req.body.user} added.`);
	} else {
		res.json(`Score for ${req.body.user} updated.`);
	}
	next();
});

//DELETE scores
scoresRouter.delete('/rank/:user', async (req, res, next) => {
  const redisResponse = await client.zRem(listName, req.params.user);
	if (redisResponse === 1) {
		res.json('User Removed');
	} else {
		res.json('Something went wrong. Please try again.');
	}
	next();
});

module.exports = scoresRouter;
