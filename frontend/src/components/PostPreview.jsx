import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../api';
import Avatar from './Avatar';
import PostImage from './PostImage';
import Hashtags from './Hashtags';

function PostPreview({ post }) {
  const [revealed, setRevealed] = useState(false);
  const hidden = post.report_count > 2 && !revealed;

  return (
    <article className="card overflow-hidden p-0">
      <div className="flex items-center gap-3 p-4">
        <Avatar name={post.username} />
        <div>
          <p className="text-sm">
            <Link to={'/profile/' + post.user_id} className="font-bold hover:text-wash">@{post.username}</Link> posted a new shot
          </p>
          <p className="meta">{formatDate(post.created_at)}</p>
        </div>
      </div>

      {hidden ? (
        <div className="border-t border-edge p-6 text-center">
          <p className="text-sm text-paper/70">This shot has been reported by several people and is hidden.</p>
          <button className="btn-outline mt-4" onClick={() => setRevealed(true)}>Show anyway</button>
        </div>
      ) : (
        <>
          <Link to={'/post/' + post._id}>
            <PostImage imageUrl={post.image_url} description={post.description} />
          </Link>
          <div className="p-4">
            <p>{post.description}</p>
            <Hashtags hashtags={post.hashtags} />
            {post.latest_comments.length > 0 && (
              <div className="mt-4 space-y-1 border-t border-edge pt-3">
                {post.latest_comments.map((comment) => (
                  <p key={comment._id} className="text-sm">
                    <span className="font-bold">{comment.username}</span>{' '}
                    <span className="text-paper/80">{comment.content}</span>
                  </p>
                ))}
              </div>
            )}
            <Link to={'/post/' + post._id} className="link mt-4 inline-block font-mono text-xs uppercase tracking-[0.15em]">
              {post.comment_count > 2 ? 'View all ' + post.comment_count + ' comments →' : 'Open shot →'}
            </Link>
          </div>
        </>
      )}
    </article>
  );
}

export default PostPreview;