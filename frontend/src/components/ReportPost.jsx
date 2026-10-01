import { useEffect, useState } from 'react';
import { apiRequest } from '../api';

function ReportPost({ user, postId }) {
  const [reasons, setReasons] = useState([]);
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiRequest('/report-reasons').then((data) => setReasons(data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiRequest('/reports', 'POST', { post_id: postId, user_id: user._id, reason });
    setReason('');
    setMessage('Thanks, this post has been reported.');
  };

  return (
    <section className="card">
      <h2 className="text-xl font-bold">Report Post</h2>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <select className="input" value={reason} onChange={(e) => setReason(e.target.value)} required>
          <option value="">Choose a reason</option>
          {reasons.map((item) => (
            <option key={item._id} value={item.reason}>{item.reason}</option>
          ))}
        </select>
        <button type="submit" className="btn-danger">Report</button>
      </form>
      <p className="success">{message}</p>
    </section>
  );
}

export default ReportPost;
