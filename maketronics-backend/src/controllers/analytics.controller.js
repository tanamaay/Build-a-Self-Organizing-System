const OperationalEntry = require("../models/OperationalEntry");

// GET analytics: counts by type, category, severity
exports.getAnalytics = async (req, res) => {
  try {
    // Total counts by type
    const typeCounts = await OperationalEntry.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);

    // Total counts by category
    const categoryCounts = await OperationalEntry.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    // Total counts by severity
    const severityCounts = await OperationalEntry.aggregate([
      { $group: { _id: "$severity", count: { $sum: 1 } } }
    ]);

    // Trend: entries per day (last 30 days)
    const trends = await OperationalEntry.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date() - 30 * 24*60*60*1000) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      typeCounts,
      categoryCounts,
      severityCounts,
      trends
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
