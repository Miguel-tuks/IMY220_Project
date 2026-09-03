function Comments({ comments }) {
  return (
    <section>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <p key={comment.comment_id}>
          {comment.username}: {comment.content}
        </p>
      ))}
    </section>
  );
}

export default Comments;