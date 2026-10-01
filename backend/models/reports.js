const { db, toId, addUsernames } = require('../db');

const reports = db.collection('reports');
const reasons = db.collection('report_reasons');

async function getReasons() {
  return reasons.find().sort({ reason: 1 }).toArray();
}

async function addReason(reason) {
  const result = await reasons.insertOne({ reason });
  return reasons.findOne({ _id: result.insertedId });
}

async function createReport(postId, userId, reason) {
  const result = await reports.insertOne({
    post_id: toId(postId),
    user_id: toId(userId),
    reason,
    created_at: new Date()
  });
  return reports.findOne({ _id: result.insertedId });
}

async function getReports() {
  const allReports = await reports.find().sort({ created_at: -1 }).toArray();
  return addUsernames(allReports);
}

async function deleteReport(id) {
  const result = await reports.deleteOne({ _id: toId(id) });
  return result.deletedCount;
}

async function deleteReportsByPost(postId) {
  await reports.deleteMany({ post_id: toId(postId) });
}

module.exports = {
  getReasons,
  addReason,
  createReport,
  getReports,
  deleteReport,
  deleteReportsByPost
};