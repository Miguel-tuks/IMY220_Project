const { db, toId, addUsernames } = require('../db');

const albums = db.collection('albums');
const newestFirst = { created_at: -1 };

async function addCoverImages(items) {
  const postIds = items.flatMap((album) => album.post_ids);
  const albumPosts = await db.collection('posts').find({ _id: { $in: postIds } }).toArray();

  return items.map((album) => ({
    ...album,
    images: albumPosts
      .filter((post) => album.post_ids.some((id) => id.equals(post._id)))
      .slice(0, 4)
      .map((post) => post.image_url)
  }));
}

async function createAlbum(userId, name, description, hashtags) {
  const result = await albums.insertOne({
    user_id: toId(userId),
    name,
    description,
    hashtags,
    post_ids: [],
    created_at: new Date()
  });
  return getAlbumById(result.insertedId);
}

async function getAlbumById(id) {
  const album = await albums.findOne({ _id: toId(id) });
  if (!album) return null;
  const [albumWithUsername] = await addUsernames([album]);
  return albumWithUsername;
}

async function getAllAlbums() {
  const allAlbums = await albums.find().sort(newestFirst).toArray();
  return addUsernames(await addCoverImages(allAlbums));
}

async function getAlbumsByUsers(userIds) {
  const userAlbums = await albums.find({ user_id: { $in: userIds.map(toId) } }).sort(newestFirst).toArray();
  return addUsernames(await addCoverImages(userAlbums));
}

async function updateAlbum(id, name, description, hashtags) {
  await albums.updateOne({ _id: toId(id) }, { $set: { name, description, hashtags } });
  return getAlbumById(id);
}

async function deleteAlbum(id) {
  const result = await albums.deleteOne({ _id: toId(id) });
  return result.deletedCount;
}

async function deleteAlbumsByUser(userId) {
  await albums.deleteMany({ user_id: toId(userId) });
}

async function addPostToAlbum(albumId, postId) {
  const result = await albums.updateOne({ _id: toId(albumId) }, { $addToSet: { post_ids: toId(postId) } });
  return result.modifiedCount;
}

async function removePostFromAlbum(albumId, postId) {
  await albums.updateOne({ _id: toId(albumId) }, { $pull: { post_ids: toId(postId) } });
}

async function removePostFromAllAlbums(postId) {
  await albums.updateMany({}, { $pull: { post_ids: toId(postId) } });
}

module.exports = {
  addCoverImages,
  createAlbum,
  getAlbumById,
  getAllAlbums,
  getAlbumsByUsers,
  updateAlbum,
  deleteAlbum,
  deleteAlbumsByUser,
  addPostToAlbum,
  removePostFromAlbum,
  removePostFromAllAlbums
};