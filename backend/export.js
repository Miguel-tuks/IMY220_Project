const fs = require('fs');
const path = require('path');
const { BSON } = require('mongodb');
const { client, db } = require('./db');

const collections = ['users', 'posts', 'albums', 'activities', 'comments', 'report_reasons', 'reports'];
const folder = path.join(__dirname, '..', 'database');

async function exportDatabase() {
  await client.connect();
  fs.mkdirSync(folder, { recursive: true });

  for (const name of collections) {
    const documents = await db.collection(name).find().toArray();
    fs.writeFileSync(path.join(folder, name + '.json'), BSON.EJSON.stringify(documents, null, 2));
    console.log('Exported ' + documents.length + ' documents from ' + name);
  }

  await client.close();
}

exportDatabase();