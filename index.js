const client = require('./client');

const useClient = async () => {
    await client.connect();
    await client.zAdd('sortedList', {score: 7, value: 'Rosie'});
    // await client.zAdd('sortedList', [{score: 1, value: 'Stinker'}]);
    // await client.zAdd('sortedList', [{score: 3, value: 'Cali'}]);
    // await client.zAdd('sortedList', [{score: 2, value: 'Freya'}]);
    // await client.zAdd('sortedList', [{score: 4, value: 'Puku'}]);
    // await client.zAdd('sortedList', [{score: 6, value: 'Bendy'}]);
    // await client.zAdd('sortedList', [{score: 5, value: 'Bubu'}]);
    // await client.zAdd('sortedList', [1, "Stinker"]);
    // await client.zAdd('sortedList', [3, "Cali"]);
    // await client.zAdd('sortedList', [2, "Freya"]);
    // await client.zAdd('sortedList', [4, "Puku"]);
    // await client.zAdd('sortedList', [6, "Bendy"]);
    // await client.zAdd('sortedList', [5, "Bubu"]);
    for await (const memberWithScore of client.zScanIterator('sortedList')) {
        console.log(memberWithScore);
      }
    await client.quit();
}

useClient();