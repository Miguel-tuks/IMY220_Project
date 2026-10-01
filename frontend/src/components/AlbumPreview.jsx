import { Link } from 'react-router-dom';
import Hashtags from './Hashtags';

function AlbumPreview({ album }) {
  return (
    <article className="card border-l-4 border-l-film">
      <Link to={'/album/' + album._id} className="font-display text-xl font-bold hover:text-film">
        {album.name}
      </Link>
      <p className="mt-1 text-sm text-muted">
        by <Link to={'/profile/' + album.user_id} className="link">@{album.username}</Link> · {album.post_ids.length} {album.post_ids.length === 1 ? 'photo' : 'photos'}
      </p>
      <p className="mt-2">{album.description}</p>
      <Hashtags hashtags={album.hashtags} />
    </article>
  );
}

export default AlbumPreview;
