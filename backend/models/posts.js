const { db, toId, addUsernames, searchFilter } = require('../db');

const posts = db.collection('posts');
const newestFirst = { created_at: -1 };

async function addFeedDetails(items) {
  const postIds = items.map((post) => post._id);
  const postComments = await db.collection('comments').find({ post_id: { $in: postIds } }).sort({ created_at: -1 }).toArray();
  const commentsWithNames = await addUsernames(postComments);
  const postReports = await db.collection('reports').find({ post_id: { $in: postIds } }).toArray();

  return items.map((post) => {
    const comments = commentsWithNames.filter((comment) => comment.post_id.equals(post._id));
    return {
      ...post,
      comment_count: comments.length,
      latest_comments: comments.slice(0, 2).reverse(),
      report_count: postReports.filter((report) => report.post_id.equals(post._id)).length
    };
  });
}

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

async function searchPosts(search) {
  const foundPosts = await posts.find(searchFilter(search, ['description', 'hashtags'])).sort(newestFirst).toArray();
  return addUsernames(foundPosts);
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
  addFeedDetails,
  createPost,
  getPostById,
  getAllPosts,
  getPostsByUsers,
  searchPosts,
  getPostsByIds,
  updatePost,
  deletePost
};