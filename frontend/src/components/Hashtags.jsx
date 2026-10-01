function Hashtags({ hashtags }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {hashtags.map((tag) => (
        <span key={tag} className="tag">#{tag}</span>
      ))}
    </div>
  );
}

export default Hashtags;
