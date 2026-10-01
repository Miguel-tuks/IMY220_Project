function Hashtags({ hashtags }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {hashtags.map((tag) => (
        <span key={tag} className="rounded-full bg-paper px-2 py-0.5 text-xs font-medium text-moss">
          #{tag}
        </span>
      ))}
    </div>
  );
}

export default Hashtags;
