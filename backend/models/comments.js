const { db, toId, addUsernames } = require('../db');

const comments = db.collection('comments');

async function getCommentsByPost(postId) {
  const postComments = await comments.find({ post_id: toId(postId) }).sort({ created_at: 1 }).toArray();
  return addUsernames(postComments);
}

async function createComment(postId, userId, content) {
  const result = await comments.insertOne({
    post_id: toId(postId),
    user_id: toId(userId),
    content,
    created_at: new Date()
  });
  return comments.findOne({ _id: result.insertedId });
}

async function deleteComment(id) {
  const result = await comments.deleteOne({ _id: toId(id) });
  return result.deletedCount;
}

async function deleteCommentsByPost(postId) {
  await comments.deleteMany({ post_id: toId(postId) });
}

async function deleteCommentsByUser(userId) {
  await comments.deleteMany({ user_id: toId(userId) });
}

module.exports = {
  getCommentsByPost,
  createComment,
  deleteComment,
  deleteCommentsByPost,
  deleteCommentsByUser
};