function PostImage({ imageUrl, description }) {
  return <img src={imageUrl} alt={description} className="aspect-[4/3] w-full bg-line object-cover" />;
}

export default PostImage;
