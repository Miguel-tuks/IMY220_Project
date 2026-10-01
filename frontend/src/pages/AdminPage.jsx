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
    if (!window.confirm('Delete this shot?')) {
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
    if (!window.confirm('Delete this user and all their shots?')) {
      return;
    }
    await apiRequest('/users/' + userId, 'DELETE');
    loadData();
  };

  return (
    <>
      <h1 className="mb-6 text-5xl">Admin</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card lg:col-span-2">
          <p className="label mt-0">Reported shots</p>
          {reports.length === 0 && <p className="text-sm text-paper/60">No reports.</p>}
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report._id} className="flex flex-wrap items-center justify-between gap-2 border-b border-edge pb-3">
                <p>
                  <span className="font-bold text-safelight">{report.reason}</span>
                  <span className="text-sm text-paper/60"> · reported by @{report.username}</span>
                </p>
                <div className="flex gap-2">
                  <Link to={'/post/' + report.post_id} className="btn-outline">View shot</Link>
                  <button className="btn-danger" onClick={() => deletePost(report.post_id)}>Delete shot</button>
                  <button className="btn-outline" onClick={() => dismissReport(report._id)}>Dismiss</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <p className="label mt-0">Report reasons</p>
          <div className="flex flex-wrap gap-2">
            {reasons.map((item) => (
              <span key={item._id} className="tag">{item.reason}</span>
            ))}
          </div>
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
          <p className="label mt-0">Users</p>
          <div className="space-y-2">
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
