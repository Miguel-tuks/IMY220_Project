const express = require('express');
const cors = require('cors');
const { client } = require('./db');
const users = require('./models/users');
const posts = require('./models/posts');
const comments = require('./models/comments');
const albums = require('./models/albums');
const reports = require('./models/reports');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

async function removePost(postId) {
  await comments.deleteCommentsByPost(postId);
  await reports.deleteReportsByPost(postId);
  await albums.removePostFromAllAlbums(postId);
  return posts.deletePost(postId);
}

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email and password are required' });
  }

  if (await users.findExistingUser(username, email)) {
    return res.json({ success: false, message: 'Username or email is already in use' });
  }

  const user = await users.createUser(username, email, password);
  res.status(201).json({ success: true, message: 'Sign up successful', user });
});

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await users.checkLogin(email, password);
  if (!user) {
    return res.json({ success: false, message: 'Incorrect email or password' });
  }

  res.json({ success: true, message: 'Sign in successful', user });
});

app.post('/api/signout', (req, res) => {
  res.json({ message: 'Signed out' });
});

app.get('/api/users', async (req, res) => {
  res.json(await users.searchUsers(req.query.search || ''));
});

app.get('/api/users/:id', async (req, res) => {
  const profile = await users.getProfile(req.params.id);
  if (!profile) return res.status(404).json({ message: 'User not found' });
  res.json(profile);
});

app.put('/api/users/:id', async (req, res) => {
  const { username, email, bio, profile_image } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  const user = await users.updateUser(req.params.id, username, email, bio || '', profile_image || '');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

app.delete('/api/users/:id', async (req, res) => {
  const userPosts = await posts.getPostsByUsers([req.params.id]);
  for (const post of userPosts) {
    await removePost(post._id);
  }
  await albums.deleteAlbumsByUser(req.params.id);
  await comments.deleteCommentsByUser(req.params.id);

  const deleted = await users.deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
});

app.post('/api/users/:id/requests', async (req, res) => {
  await users.sendFriendRequest(req.params.id, req.body.from_id);
  res.json({ message: 'Friend request sent' });
});

app.post('/api/users/:id/friends', async (req, res) => {
  await users.acceptFriendRequest(req.params.id, req.body.friend_id);
  res.json({ message: 'Friend request accepted' });
});

app.delete('/api/users/:id/friends/:friendId', async (req, res) => {
  await users.removeFriend(req.params.id, req.params.friendId);
  res.json({ message: 'Friend removed' });
});

app.get('/api/feed/global', async (req, res) => {
  res.json({
    posts: await posts.getAllPosts(),
    albums: await albums.getAllAlbums()
  });
});

app.get('/api/feed/local/:userId', async (req, res) => {
  const user = await users.getUserById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({
    posts: await posts.getPostsByUsers(user.friends),
    albums: await albums.getAlbumsByUsers(user.friends)
  });
});

app.get('/api/posts/user/:userId', async (req, res) => {
  res.json(await posts.getPostsByUsers([req.params.userId]));
});

app.get('/api/posts/:id', async (req, res) => {
  const post = await posts.getPostById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

app.post('/api/posts', async (req, res) => {
  const { user_id, image_url, description, hashtags } = req.body;

  if (!user_id || !image_url || !description) {
    return res.status(400).json({ message: 'Image and description are required' });
  }

  const post = await posts.createPost(user_id, image_url, description, hashtags || []);
  res.status(201).json(post);
});

app.put('/api/posts/:id', async (req, res) => {
  const { description, hashtags } = req.body;

  if (!description) {
    return res.status(400).json({ message: 'Description is required' });
  }

  const post = await posts.updatePost(req.params.id, description, hashtags || []);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

app.delete('/api/posts/:id', async (req, res) => {
  const deleted = await removePost(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Post deleted' });
});

app.get('/api/posts/:id/comments', async (req, res) => {
  res.json(await comments.getCommentsByPost(req.params.id));
});

app.post('/api/posts/:id/comments', async (req, res) => {
  const { user_id, content } = req.body;

  if (!user_id || !content) {
    return res.status(400).json({ message: 'Comment cannot be empty' });
  }

  const comment = await comments.createComment(req.params.id, user_id, content);
  res.status(201).json(comment);
});

app.delete('/api/comments/:id', async (req, res) => {
  const deleted = await comments.deleteComment(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Comment not found' });
  res.json({ message: 'Comment deleted' });
});

app.get('/api/albums/user/:userId', async (req, res) => {
  res.json(await albums.getAlbumsByUsers([req.params.userId]));
});

app.get('/api/albums/:id', async (req, res) => {
  const album = await albums.getAlbumById(req.params.id);
  if (!album) return res.status(404).json({ message: 'Album not found' });

  const albumPosts = await posts.getPostsByIds(album.post_ids);
  res.json({ ...album, posts: albumPosts });
});

app.post('/api/albums', async (req, res) => {
  const { user_id, name, description, hashtags } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ message: 'Album name is required' });
  }

  const album = await albums.createAlbum(user_id, name, description || '', hashtags || []);
  res.status(201).json(album);
});

app.put('/api/albums/:id', async (req, res) => {
  const { name, description, hashtags } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Album name is required' });
  }

  const album = await albums.updateAlbum(req.params.id, name, description || '', hashtags || []);
  if (!album) return res.status(404).json({ message: 'Album not found' });
  res.json(album);
});

app.delete('/api/albums/:id', async (req, res) => {
  const deleted = await albums.deleteAlbum(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Album not found' });
  res.json({ message: 'Album deleted' });
});

app.post('/api/albums/:id/posts', async (req, res) => {
  await albums.addPostToAlbum(req.params.id, req.body.post_id);
  res.json({ message: 'Post added to album' });
});

app.delete('/api/albums/:id/posts/:postId', async (req, res) => {
  await albums.removePostFromAlbum(req.params.id, req.params.postId);
  res.json({ message: 'Post removed from album' });
});

app.get('/api/report-reasons', async (req, res) => {
  res.json(await reports.getReasons());
});

app.post('/api/report-reasons', async (req, res) => {
  if (!req.body.reason) {
    return res.status(400).json({ message: 'Reason is required' });
  }

  const reason = await reports.addReason(req.body.reason);
  res.status(201).json(reason);
});

app.get('/api/reports', async (req, res) => {
  res.json(await reports.getReports());
});

app.post('/api/reports', async (req, res) => {
  const { post_id, user_id, reason } = req.body;

  if (!post_id || !user_id || !reason) {
    return res.status(400).json({ message: 'Please choose a reason' });
  }

  const report = await reports.createReport(post_id, user_id, reason);
  res.status(201).json(report);
});

app.delete('/api/reports/:id', async (req, res) => {
  const deleted = await reports.deleteReport(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Report not found' });
  res.json({ message: 'Report dismissed' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on the server' });
});

client.connect().then(() => {
  app.listen(PORT, () => {
    console.log('Backend server running on port ' + PORT);
  });
});