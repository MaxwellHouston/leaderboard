const {createClient} = require('redis');
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

const useClient = async () => {
    await client.connect();
    const scores = await client.zRangeWithScores('sortedList', 0, -1)
    console.log(scores);
    // for await (const memberWithScore of client.zScanIterator('sortedList')) {
    //     console.log(memberWithScore);
    //   }
    await client.quit();
}

useClient();

module.exports = client;