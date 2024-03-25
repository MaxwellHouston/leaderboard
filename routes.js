const client = require('./client');
const scoresRouter = require('express').Router();

//GET all scores
scoresRouter.get('/scores', async (req, res) => {
    const scores = [];
    await client.connect();
    for await (const memberWithScore of client.zScanIterator('sortedList')) {
        scores.push(memberWithScore);
      }
    await client.quit(); 
    res.json(scores)
})
//GET top x scores
scoresRouter.get('/scores/:limit', async (req, res) => {
    const limit = Number(req.params.limit) - 1;
    if(typeof limit !== 'number'){
        return
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