import { Link } from 'react-router-dom';
import { frameNumber } from '../api';

function PostList({ posts }) {
  if (posts.length === 0) {
    return <p className="text-paper/60">No shots yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {posts.map((post, index) => (
        <Link key={post._id} to={'/post/' + post._id} className="relative block border border-edge hover:border-paper/40">
          <img src={post.image_url} alt={post.description} className="aspect-square w-full bg-edge object-cover" />
          <span className="absolute bottom-1 left-2 font-mono text-[10px] text-paper">{frameNumber(index)}</span>
        </Link>
      ))}
    </div>
  );
}

export default PostList;
