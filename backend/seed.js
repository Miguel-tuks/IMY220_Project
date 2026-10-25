const { ObjectId } = require('mongodb');
const { client, db } = require('./db');

function makeIds(keys) {
  const ids = {};
  keys.forEach((key) => {
    ids[key] = new ObjectId();
  });
  return ids;
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

const userIds = makeIds(['admin', 'testuser', 'john', 'mary', 'david', 'sarah', 'james', 'emma', 'peter', 'lucy', 'tom']);
const postIds = makeIds(['river', 'canyon', 'coffee', 'waterfall', 'peaks', 'mist', 'rooftop', 'market', 'lion', 'walrus', 'studio', 'fawn', 'sale']);
const albumIds = makeIds(['golden', 'walks', 'first', 'mountains', 'market', 'wild']);

function makeUser(details) {
  return {
    _id: userIds[details.username],
    username: details.username,
    display_name: details.display_name,
    email: details.email,
    password: details.password,
    pronouns: details.pronouns || '',
    bio: details.bio,
    social_link: details.social_link || '',
    profile_image: 'https://picsum.photos/id/' + details.image + '/200/200',
    is_admin: details.is_admin || false,
    friends: [],
    friend_requests: [],
    created_at: daysAgo(details.days)
  };
}

function makePost(key, username, image, description, hashtags, days) {
  return {
    _id: postIds[key],
    user_id: userIds[username],
    image_url: 'https://picsum.photos/id/' + image + '/800/600',
    description,
    hashtags,
    created_at: daysAgo(days)
  };
}

function makeAlbum(key, username, name, description, hashtags, postKeys, days) {
  return {
    _id: albumIds[key],
    user_id: userIds[username],
    name,
    description,
    hashtags,
    post_ids: postKeys.map((postKey) => postIds[postKey]),
    created_at: daysAgo(days)
  };
}

function makeComment(postKey, username, content, days) {
  return { post_id: postIds[postKey], user_id: userIds[username], content, created_at: daysAgo(days) };
}

function makeReport(postKey, username, reason, days) {
  return { post_id: postIds[postKey], user_id: userIds[username], reason, created_at: daysAgo(days) };
}

const users = [
  makeUser({ username: 'admin', display_name: 'Site Admin', email: 'admin@grail.com', password: 'admin123', bio: 'Keeping Grain tidy.', image: 1062, days: 60, is_admin: true }),
  makeUser({ username: 'testuser', display_name: 'Test User', email: 'test@test.com', password: 'test1234', pronouns: 'they/them', bio: 'Learning film one roll at a time.', image: 177, days: 30 }),
  makeUser({ username: 'john', display_name: 'John Smith', email: 'john@grail.com', password: 'password123', pronouns: 'he/him', bio: 'Shooting 35mm around town.', social_link: 'https://example.com/john', image: 1005, days: 45 }),
  makeUser({ username: 'mary', display_name: 'Mary Jones', email: 'mary@grail.com', password: 'password123', pronouns: 'she/her', bio: 'Coffee, film and long walks.', image: 1027, days: 40 }),
  makeUser({ username: 'david', display_name: 'David Brown', email: 'david@grail.com', password: 'password123', bio: 'Mostly mountains, mostly medium format.', image: 1012, days: 35 }),
  makeUser({ username: 'sarah', display_name: 'Sarah Wilson', email: 'sarah@grail.com', password: 'password123', pronouns: 'she/her', bio: 'Colour film and Saturday markets.', image: 64, days: 28 }),
  makeUser({ username: 'james', display_name: 'James Taylor', email: 'james@grail.com', password: 'password123', pronouns: 'he/him', bio: 'Wildlife on long lenses and expired film.', image: 91, days: 25 }),
  makeUser({ username: 'emma', display_name: 'Emma Clark', email: 'emma@grail.com', password: 'password123', pronouns: 'she/her', bio: 'Coastlines and road trips.', image: 65, days: 20 }),
  makeUser({ username: 'peter', display_name: 'Peter Hall', email: 'peter@grail.com', password: 'password123', pronouns: 'he/him', bio: 'Studio portraits, usually of my dog.', image: 338, days: 18 }),
  makeUser({ username: 'lucy', display_name: 'Lucy Green', email: 'lucy@grail.com', password: 'password123', pronouns: 'she/her', bio: 'Just bought my first film camera.', image: 1011, days: 14 }),
  makeUser({ username: 'tom', display_name: 'Tom White', email: 'tom@grail.com', password: 'password123', bio: 'Camera gear for sale.', image: 342, days: 10 })
];

const friendships = [
  ['testuser', 'john'],
  ['testuser', 'mary'],
  ['testuser', 'sarah'],
  ['john', 'mary'],
  ['mary', 'emma'],
  ['james', 'sarah'],
  ['peter', 'lucy'],
  ['david', 'tom']
];

const friendRequests = [
  { from: 'david', to: 'john' },
  { from: 'lucy', to: 'testuser' },
  { from: 'tom', to: 'testuser' }
];

function findUser(username) {
  return users.find((user) => user.username === username);
}

friendships.forEach(([first, second]) => {
  findUser(first).friends.push(userIds[second]);
  findUser(second).friends.push(userIds[first]);
});

friendRequests.forEach((request) => {
  findUser(request.to).friend_requests.push(userIds[request.from]);
});

const posts = [
  makePost('river', 'john', 1015, 'River bend on the way home.', ['landscape', 'river', '35mm'], 20),
  makePost('canyon', 'john', 1016, 'Canyon walls at golden hour.', ['goldenhour', 'travel', 'portra400'], 16),
  makePost('coffee', 'mary', 1060, 'Morning coffee before class.', ['coffee', 'morning', '35mm'], 12),
  makePost('waterfall', 'mary', 1039, 'Waterfall hike with friends.', ['hiking', 'nature'], 9),
  makePost('peaks', 'david', 1036, 'Snow on the peaks this weekend.', ['mountains', 'winter', 'mediumformat'], 8),
  makePost('mist', 'testuser', 1018, 'Mist over the hills on the first frame of a new roll.', ['landscape', 'hp5', '35mm'], 7),
  makePost('rooftop', 'testuser', 1067, 'City lights from the rooftop. Pushed this roll a stop.', ['city', 'night', 'pushprocessed'], 4),
  makePost('market', 'sarah', 1080, 'Strawberries from the Saturday market.', ['market', 'colour', 'portra400'], 6),
  makePost('lion', 'james', 1074, 'Golden hour at the reserve. 300mm and a lot of patience.', ['wildlife', 'goldenhour'], 11),
  makePost('walrus', 'emma', 1084, 'Unexpected visitor on the coast trip.', ['wildlife', 'coast', 'travel'], 5),
  makePost('studio', 'peter', 237, 'My studio assistant refusing to move.', ['dogs', 'portrait', 'hp5'], 3),
  makePost('fawn', 'james', 1003, 'A fawn at the edge of the trail, shot on expired film.', ['wildlife', 'nature', 'expiredfilm'], 2),
  makePost('sale', 'tom', 250, 'CHEAP CAMERA GEAR!!! Message me for prices, best deals on Grain!!!', ['sale', 'cameras', 'deals'], 1)
];

const albums = [
  makeAlbum('golden', 'john', 'Golden Hour', 'Favourite late-afternoon frames.', ['goldenhour', '35mm'], ['river', 'canyon'], 15),
  makeAlbum('walks', 'mary', 'Weekend Walks', 'Places I walked this month.', ['nature', 'hiking'], ['waterfall'], 8),
  makeAlbum('mountains', 'david', 'Peaks', 'High altitude, low temperatures.', ['mountains', 'winter'], ['peaks'], 7),
  makeAlbum('market', 'sarah', 'Market Days', 'Saturdays at the market.', ['market', 'colour'], ['market'], 5),
  makeAlbum('first', 'testuser', 'First Roll', 'Every frame from my first roll on Grain, keepers and misses.', ['35mm', 'hp5'], ['mist', 'rooftop'], 3),
  makeAlbum('wild', 'james', 'Wild Things', 'Animals that sat still long enough.', ['wildlife'], ['lion', 'fawn'], 1.5)
];

const activities = albums.map((album) => ({
  user_id: album.user_id,
  album_id: album._id,
  post_ids: album.post_ids,
  created_at: new Date(album.created_at.getTime() + 60 * 60 * 1000)
}));

const comments = [
  makeComment('river', 'mary', 'Love the colours in this one.', 19),
  makeComment('canyon', 'mary', 'Those shadows are unreal.', 15),
  makeComment('canyon', 'testuser', 'What film stock was this?', 14),
  makeComment('canyon', 'john', 'Portra 400, shot at f/8.', 13),
  makeComment('canyon', 'david', 'This one belongs on a wall.', 12),
  makeComment('coffee', 'john', 'Which cafe is this?', 11),
  makeComment('coffee', 'mary', 'The little place across from campus.', 10),
  makeComment('lion', 'emma', 'How close were you?!', 10),
  makeComment('waterfall', 'john', 'Need to do this hike.', 8),
  makeComment('mist', 'john', 'Great start to the roll!', 6),
  makeComment('mist', 'mary', 'The fog looks so soft on HP5.', 6),
  makeComment('mist', 'sarah', 'Love this.', 5),
  makeComment('market', 'testuser', 'The colours on this are beautiful.', 5),
  makeComment('walrus', 'james', 'Perfect timing.', 4),
  makeComment('rooftop', 'sarah', 'Pushing it a stop really paid off.', 3),
  makeComment('studio', 'lucy', 'Best assistant ever.', 2)
];

const reportReasons = [
  { reason: 'Spam' },
  { reason: 'Inappropriate content' },
  { reason: 'Harassment' },
  { reason: 'Stolen photo' }
];

const reports = [
  makeReport('sale', 'mary', 'Spam', 0.8),
  makeReport('sale', 'sarah', 'Spam', 0.6),
  makeReport('sale', 'emma', 'Inappropriate content', 0.5)
];

async function seed() {
  await client.connect();

  const collections = ['users', 'posts', 'albums', 'activities', 'comments', 'report_reasons', 'reports'];
  for (const name of collections) {
    await db.collection(name).deleteMany({});
  }

  await db.collection('users').insertMany(users);
  await db.collection('posts').insertMany(posts);
  await db.collection('albums').insertMany(albums);
  await db.collection('activities').insertMany(activities);
  await db.collection('comments').insertMany(comments);
  await db.collection('report_reasons').insertMany(reportReasons);
  await db.collection('reports').insertMany(reports);

  console.log('Database seeded');
  await client.close();
}

seed();