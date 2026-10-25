const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://grail_user:ophcqYTDJfDgv3E8@cluster0.k0faycn.mongodb.net/?appName=Cluster0';

const client = new MongoClient(uri);
const db = client.db('grail');

function toId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

async function addUsernames(items) {
  const userIds = items.map((item) => item.user_id);
  const users = await db.collection('users').find({ _id: { $in: userIds } }).toArray();

  return items.map((item) => {
    const owner = users.find((user) => user._id.equals(item.user_id));
    return { ...item, username: owner ? owner.username : 'Unknown user' };
  });
}
function searchFilter(text, fields) {
  if (text.startsWith('#')) {
    return { hashtags: text.slice(1).toLowerCase() };
  }

  const pattern = { $regex: text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  return { $or: fields.map((field) => ({ [field]: pattern })) };
}
module.exports = { client, db, toId, addUsernames, searchFilter };