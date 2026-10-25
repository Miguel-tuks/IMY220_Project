const { db, toId, searchFilter } = require('../db');

const users = db.collection('users');
const hidePassword = { projection: { password: 0 } };
const previewFields = { projection: { username: 1, display_name: 1, profile_image: 1 } };

async function createUser(username, email, password) {
  const result = await users.insertOne({
    username,
    display_name: username,
    email,
    password,
    pronouns: '',
    bio: '',
    social_link: '',
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
  return users.findOne({ email, password }, hidePassword);
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
  const filter = searchFilter(search, ['username', 'display_name', 'email']);
  return users.find(filter, previewFields).sort({ username: 1 }).toArray();
}

async function updateUser(id, details) {
  await users.updateOne({ _id: toId(id) }, { $set: details });
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

async function declineFriendRequest(userId, fromUserId) {
  await users.updateOne({ _id: toId(userId) }, { $pull: { friend_requests: toId(fromUserId) } });
}

module.exports = {
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
  declineFriendRequest,
  removeFriend
};