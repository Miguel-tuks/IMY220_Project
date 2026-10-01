function PostImage({ imageUrl, description }) {
  return <img src={imageUrl} alt={description} className="aspect-video w-full bg-edge object-cover" />;
}

export default PostImage;
