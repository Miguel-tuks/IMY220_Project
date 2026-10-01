import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';
import ProfilePreview from '../components/ProfilePreview';

function AdminPage({ user }) {
  const [reports, setReports] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [users, setUsers] = useState([]);
  const [newReason, setNewReason] = useState('');

  const loadData = () => {
    apiRequest('/reports').then((data) => setReports(data));
    apiRequest('/report-reasons').then((data) => setReasons(data));
    apiRequest('/users').then((data) => setUsers(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const addReason = async (event) => {
    event.preventDefault();
    await apiRequest('/report-reasons', 'POST', { reason: newReason });
    setNewReason('');
    loadData();
  };

  const deletePost = async (postId) => {
    if (!window.confirm('Delete this post?')) {
      return;
    }
    await apiRequest('/posts/' + postId, 'DELETE');
    loadData();
  };

  const dismissReport = async (reportId) => {
    await apiRequest('/reports/' + reportId, 'DELETE');
    loadData();
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Delete this user and all their posts?')) {
      return;
    }
    await apiRequest('/users/' + userId, 'DELETE');
    loadData();
  };

  return (
    <>
      <h1 className="mb-6 text-4xl font-bold">Admin</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card lg:col-span-2">
          <h2 className="text-xl font-bold">Reported Posts</h2>
          {reports.length === 0 && <p className="mt-2 text-sm text-muted">No reports.</p>}
          <div className="mt-3 space-y-3">
            {reports.map((report) => (
              <div key={report._id} className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                <p>
                  <span className="font-medium text-danger">{report.reason}</span>
                  <span className="text-sm text-muted"> · reported by @{report.username}</span>
                </p>
                <div className="flex gap-2">
                  <Link to={'/post/' + report.post_id} className="btn-outline">View post</Link>
                  <button className="btn-danger" onClick={() => deletePost(report.post_id)}>Delete post</button>
                  <button className="btn-outline" onClick={() => dismissReport(report._id)}>Dismiss</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold">Report Reasons</h2>
          <ul className="mt-3 list-inside list-disc text-sm">
            {reasons.map((item) => (
              <li key={item._id}>{item.reason}</li>
            ))}
          </ul>
          <form onSubmit={addReason} className="mt-4 flex gap-2">
            <input
              className="input"
              type="text"
              placeholder="New reason"
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              required
            />
            <button type="submit" className="btn">Add</button>
          </form>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold">Users</h2>
          <div className="mt-3 space-y-2">
            {users.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <ProfilePreview profile={item} />
                {item._id !== user._id && (
                  <button className="btn-danger" onClick={() => deleteUser(item._id)}>Delete</button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default AdminPage;
