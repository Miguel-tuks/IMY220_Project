import { Link } from 'react-router-dom';
import { formatDate } from '../api';
import Avatar from './Avatar';
import Hashtags from './Hashtags';

function AlbumPreview({ album, showOwner = true }) {
  const count = album.post_ids.length;

  return (
    <article className="card">
      {showOwner && (
        <div className="mb-4 flex items-center gap-3">
          <Avatar name={album.username} />
          <div>
            <p className="text-sm">
              <Link to={'/profile/' + album.user_id} className="font-bold hover:text-wash">@{album.username}</Link> created a roll
            </p>
            <p className="meta">{formatDate(album.created_at)}</p>
          </div>
        </div>
      )}
      <Link to={'/album/' + album._id} className="block border border-edge bg-ink hover:border-paper/40">
        <div className="sprockets" />
        <div className="flex h-28 items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
          Roll · {count} {count === 1 ? 'shot' : 'shots'}
        </div>
        <div className="sprockets" />
      </Link>
      <h3 className="mt-4 text-2xl">
        <Link to={'/album/' + album._id} className="hover:text-wash">{album.name}</Link>
      </h3>
      <p className="mt-1 text-sm text-paper/80">{album.description}</p>
      <Hashtags hashtags={album.hashtags} />
    </article>
  );
}

export default AlbumPreview;
