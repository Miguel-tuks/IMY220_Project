const crypto = require('crypto');
const { db, toId } = require('../db');

const users = db.collection('users');
const hidePassword = { projection: { password: 0 } };
const previewFields = { projection: { username: 1, profile_image: 1 } };

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function createUser(username, email, password) {
  const result = await users.insertOne({
    username,
    email,
    password: hashPassword(password),
    bio: '',
    profile_image: 'https://picsum.photos/id/64/200/200',
    is_admin: false,
    friends: [],
    friend_requests: [],
    created_at: new Date()
  });
  return getUserById(result.insertedId);
}

async function findExistingUser(username, email) {
  return users.findOne({ $or: [{ username }, { email }] });
}

async function checkLogin(email, password) {
  return users.findOne({ email, password: hashPassword(password) }, hidePassword);
}

async function getUserById(id) {
  return users.findOne({ _id: toId(id) }, hidePassword);
}

async function getProfile(id) {
  const user = await getUserById(id);
  if (!user) return null;

  const friends = await users.find({ _id: { $in: user.friends } }, previewFields).toArray();
  const friendRequests = await users.find({ _id: { $in: user.friend_requests } }, previewFields).toArray();

  return { ...user, friends, friend_requests: friendRequests };
}

async function searchUsers(search) {
  const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const filter = { username: { $regex: safeSearch, $options: 'i' } };
  return users.find(filter, previewFields).sort({ username: 1 }).toArray();
}

async function updateUser(id, username, email, bio, profileImage) {
  await users.updateOne(
    { _id: toId(id) },
    { $set: { username, email, bio, profile_image: profileImage } }
  );
  return getUserById(id);
}

async function deleteUser(id) {
  const userId = toId(id);
  const result = await users.deleteOne({ _id: userId });
  await users.updateMany({}, { $pull: { friends: userId, friend_requests: userId } });
  return result.deletedCount;
}

async function sendFriendRequest(toUserId, fromUserId) {
  await users.updateOne(
    { _id: toId(toUserId) },
    { $addToSet: { friend_requests: toId(fromUserId) } }
  );
}

async function acceptFriendRequest(userId, fromUserId) {
  await users.updateOne(
    { _id: toId(userId) },
    { $pull: { friend_requests: toId(fromUserId) }, $addToSet: { friends: toId(fromUserId) } }
  );
  await users.updateOne(
    { _id: toId(fromUserId) },
    { $pull: { friend_requests: toId(userId) }, $addToSet: { friends: toId(userId) } }
  );
}

async function removeFriend(userId, friendId) {
  await users.updateOne({ _id: toId(userId) }, { $pull: { friends: toId(friendId) } });
  await users.updateOne({ _id: toId(friendId) }, { $pull: { friends: toId(userId) } });
}

module.exports = {
  hashPassword,
  createUser,
  findExistingUser,
  checkLogin,
  getUserById,
  getProfile,
  searchUsers,
  updateUser,
  deleteUser,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend
};