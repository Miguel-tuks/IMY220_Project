const { ObjectId } = require('mongodb');
const { client, db } = require('./db');
const { hashPassword } = require('./models/users');

const adminId = new ObjectId();
const miguelId = new ObjectId();
const janeId = new ObjectId();
const samId = new ObjectId();

const postIds = [new ObjectId(), new ObjectId(), new ObjectId(), new ObjectId(), new ObjectId()];

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

const users = [
  {
    _id: adminId,
    username: 'admin',
    email: 'admin@grail.com',
    password: hashPassword('admin123'),
    bio: 'Keeping Grail tidy.',
    profile_image: 'https://picsum.photos/id/1062/200/200',
    is_admin: true,
    friends: [],
    friend_requests: [],
    created_at: daysAgo(30)
  },
  {
    _id: miguelId,
    username: 'miguel',
    email: 'miguel@grail.com',
    password: hashPassword('password123'),
    bio: 'Shooting 35mm around Pretoria.',
    profile_image: 'https://picsum.photos/id/1005/200/200',
    is_admin: false,
    friends: [janeId],
    friend_requests: [samId],
    created_at: daysAgo(20)
  },
  {
    _id: janeId,
    username: 'jane',
    email: 'jane@grail.com',
    password: hashPassword('password123'),
    bio: 'Coffee, film and long walks.',
    profile_image: 'https://picsum.photos/id/1027/200/200',
    is_admin: false,
    friends: [miguelId],
    friend_requests: [],
    created_at: daysAgo(18)
  },
  {
    _id: samId,
    username: 'sam',
    email: 'sam@grail.com',
    password: hashPassword('password123'),
    bio: 'Mostly mountains.',
    profile_image: 'https://picsum.photos/id/1012/200/200',
    is_admin: false,
    friends: [],
    friend_requests: [],
    created_at: daysAgo(10)
  }
];

const posts = [
  {
    _id: postIds[0],
    user_id: miguelId,
    image_url: 'https://picsum.photos/id/1015/800/600',
    description: 'River bend on the way home.',
    hashtags: ['landscape', 'river'],
    created_at: daysAgo(9)
  },
  {
    _id: postIds[1],
    user_id: miguelId,
    image_url: 'https://picsum.photos/id/1016/800/600',
    description: 'Canyon walls at golden hour.',
    hashtags: ['goldenhour', 'travel'],
    created_at: daysAgo(7)
  },
  {
    _id: postIds[2],
    user_id: janeId,
    image_url: 'https://picsum.photos/id/1060/800/600',
    description: 'Morning coffee before class.',
    hashtags: ['coffee', 'morning'],
    created_at: daysAgo(5)
  },
  {
    _id: postIds[3],
    user_id: janeId,
    image_url: 'https://picsum.photos/id/1039/800/600',
    description: 'Waterfall hike with friends.',
    hashtags: ['hiking', 'nature'],
    created_at: daysAgo(3)
  },
  {
    _id: postIds[4],
    user_id: samId,
    image_url: 'https://picsum.photos/id/1036/800/600',
    description: 'Snow on the peaks this weekend.',
    hashtags: ['mountains', 'winter'],
    created_at: daysAgo(1)
  }
];

const albums = [
  {
    user_id: miguelId,
    name: 'Golden Hour',
    description: 'Favourite shots from late afternoons.',
    hashtags: ['goldenhour', 'film'],
    post_ids: [postIds[0], postIds[1]],
    created_at: daysAgo(6)
  },
  {
    user_id: janeId,
    name: 'Weekend Walks',
    description: 'Places I walked this month.',
    hashtags: ['nature'],
    post_ids: [postIds[3]],
    created_at: daysAgo(2)
  }
];

const comments = [
  { post_id: postIds[0], user_id: janeId, content: 'Love the colours in this one.', created_at: daysAgo(8) },
  { post_id: postIds[2], user_id: miguelId, content: 'Which cafe is this?', created_at: daysAgo(4) }
];

const reportReasons = [
  { reason: 'Spam' },
  { reason: 'Inappropriate content' },
  { reason: 'Harassment' }
];

async function seed() {
  await client.connect();

  const collections = ['users', 'posts', 'albums', 'comments', 'report_reasons', 'reports'];
  for (const name of collections) {
    await db.collection(name).deleteMany({});
  }

  await db.collection('users').insertMany(users);
  await db.collection('posts').insertMany(posts);
  await db.collection('albums').insertMany(albums);
  await db.collection('comments').insertMany(comments);
  await db.collection('report_reasons').insertMany(reportReasons);

  console.log('Database seeded');
  await client.close();
}

seed();