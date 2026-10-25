import { Link } from 'react-router-dom';

function RollStrip({ images = [], link }) {
  return (
    <Link to={link} className="block border border-edge bg-ink hover:border-paper/40">
      <div className="sprockets" />
      {images.length > 0 ? (
        <div className="grid grid-cols-4 gap-1 px-1">
          {images.map((image, index) => (
            <img key={index} src={image} alt="" className="aspect-square w-full bg-edge object-cover" />
          ))}
        </div>
      ) : (
        <div className="flex h-28 items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
          Empty roll
        </div>
      )}
      <div className="sprockets" />
    </Link>
  );
}

export default RollStrip;