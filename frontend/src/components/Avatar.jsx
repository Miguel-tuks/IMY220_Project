function Avatar({ name, image, size = 'h-9 w-9' }) {
  if (image) {
    return <img src={image} alt={name} className={size + ' shrink-0 rounded-full border border-edge bg-edge object-cover'} />;
  }

  return (
    <span className={size + ' flex shrink-0 items-center justify-center rounded-full border border-edge bg-ink font-mono text-xs uppercase text-paper/70'}>
      {name ? name[0] : '?'}
    </span>
  );
}

export default Avatar;
