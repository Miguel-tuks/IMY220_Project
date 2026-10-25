import { Link } from 'react-router-dom';

function Hashtags({ hashtags }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {hashtags.map((tag) => (
        <Link key={tag} to={'/search?q=' + encodeURIComponent('#' + tag)} className="tag hover:border-wash hover:bg-wash/10">
          #{tag}
        </Link>
      ))}
    </div>
  );
}

export default Hashtags;