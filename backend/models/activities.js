const { db, toId, addUsernames } = require('../db');

const activities = db.collection('activities');

async function createActivity(userId, albumId, postId) {
  await activities.insertOne({
    user_id: toId(userId),
    album_id: toId(albumId),
    post_ids: [toId(postId)],
    created_at: new Date()
  });
}

async function getActivities(userIds) {
  const filter = userIds ? { user_id: { $in: userIds.map(toId) } } : {};
  const items = await activities.find(filter).sort({ created_at: -1 }).toArray();
  const albums = await db.collection('albums').find({ _id: { $in: items.map((item) => item.album_id) } }).toArray();
  const posts = await db.collection('posts').find({ _id: { $in: items.flatMap((item) => item.post_ids) } }).toArray();

  const withDetails = items
    .map((item) => {
      const album = albums.find((found) => found._id.equals(item.album_id));
      const images = posts
        .filter((post) => item.post_ids.some((id) => id.equals(post._id)))
        .map((post) => post.image_url);
      return { ...item, album_name: album ? album.name : null, images };
    })
    .filter((item) => item.album_name && item.images.length > 0);

  return addUsernames(withDetails);
}

async function deleteActivitiesByAlbum(albumId) {
  await activities.deleteMany({ album_id: toId(albumId) });
}

module.exports = { createActivity, getActivities, deleteActivitiesByAlbum };