const client = require('./client');
const scoresRouter = require('express').Router();

//GET all scores
scoresRouter.get('/scores', async (req, res) => {
    await client.connect();
    const scores = await client.zRangeWithScores('sortedList', 0, -1);
    await client.quit(); 
    return res.json(scores);
})
//GET top x scores
scoresRouter.get('/scores/:limit', async (req, res) => {
    const limit = Number(req.params.limit) - 1;
    if(Number.isNaN(limit)){
        return res.status(400).json('Invalid list limit');
    }
    await client.connect();
    const scores = await client.zRangeWithScores('sortedList', 0, limit);
    await client.quit();
    return res.json(scores);
})
//PUT scores

//POST scores

//DELETE scores

module.exports = scoresRouter;