const { MongoClient } = require('mongodb');
const polka = require('polka');

polka()
  .get('/create', (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017');
    async function run() {
      try {
        await client.connect();
        const database = client.db('intro');
        const collection = database.collection('quotes');

        const result = await collection.insertOne({
          quote: "Life is what happens to you while you're busy making other plans.",
        });

        res.end(JSON.stringify(result));
      } catch (e) {
        console.log('error = ' + e);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  })
  .get('/retrieve', (req, res) => {
    const client = new MongoClient('mongodb://localhost:27017');
    async function run() {
      try {
        await client.connect();
        const database = client.db('intro');
        const collection = database.collection('quotes');

        const cursor = collection.find({}, {});

        let items = [];
        await cursor.forEach(function (doc) {
          items.push(doc);
        });

        res.end(JSON.stringify(items));
      } catch (e) {
        console.log('error = ' + e);
      } finally {
        await client.close();
      }
    }

    run().catch(console.dir);
  })
  .listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Running on localhost:3000`);
  });
