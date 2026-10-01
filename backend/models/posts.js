const { db, toId, addUsernames } = require('../db');

const posts = db.collection('posts');
const newestFirst = { created_at: -1 };

async function createPost(userId, imageUrl, description, hashtags) {
  const result = await posts.insertOne({
    user_id: toId(userId),
    image_url: imageUrl,
    description,
    hashtags,
    created_at: new Date()
  });
  return getPostById(result.insertedId);
}

async function getPostById(id) {
  const post = await posts.findOne({ _id: toId(id) });
  if (!post) return null;
  const [postWithUsername] = await addUsernames([post]);
  return postWithUsername;
}

async function getAllPosts() {
  const allPosts = await posts.find().sort(newestFirst).toArray();
  return addUsernames(allPosts);
}

async function getPostsByUsers(userIds) {
  const userPosts = await posts.find({ user_id: { $in: userIds.map(toId) } }).sort(newestFirst).toArray();
  return addUsernames(userPosts);
}

async function getPostsByIds(postIds) {
  const foundPosts = await posts.find({ _id: { $in: postIds } }).sort(newestFirst).toArray();
  return addUsernames(foundPosts);
}

async function updatePost(id, description, hashtags) {
  await posts.updateOne({ _id: toId(id) }, { $set: { description, hashtags } });
  return getPostById(id);
}

async function deletePost(id) {
  const result = await posts.deleteOne({ _id: toId(id) });
  return result.deletedCount;
}

module.exports = {
  createPost,
  getPostById,
  getAllPosts,
  getPostsByUsers,
  getPostsByIds,
  updatePost,
  deletePost
};