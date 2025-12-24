import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics")
      .then(res => {
        console.log("Analytics received 👉", res.data);
        setAnalytics(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (!analytics) return <p>No analytics data</p>;

  // SAFE fallback arrays
  const typeCounts = analytics.typeCounts || [];
  const categoryCounts = analytics.categoryCounts || [];
  const severityCounts = analytics.severityCounts || [];
  const trends = analytics.trends || [];

  const typeData = {
    labels: typeCounts.map(t => t._id),
    datasets: [{
      label: "Entries by Type",
      data: typeCounts.map(t => t.count),
      backgroundColor: "steelblue"
    }]
  };

  const categoryData = {
    labels: categoryCounts.map(c => c._id),
    datasets: [{
      label: "Entries by Category",
      data: categoryCounts.map(c => c.count),
      backgroundColor: "orange"
    }]
  };

  const severityData = {
    labels: severityCounts.map(s => s._id),
    datasets: [{
      label: "Severity Distribution",
      data: severityCounts.map(s => s.count),
      backgroundColor: ["red", "orange", "green"]
    }]
  };

  const trendData = {
    labels: trends.map(t => t._id),
    datasets: [{
      label: "Daily Trend",
      data: trends.map(t => t.count),
      borderColor: "blue",
      backgroundColor: "lightblue",
      tension: 0.4
    }]
  };

  return (
    <div className="analytics-container">
      <h2>System Insights</h2>

      <div className="chart-box">
        <h3>By Type</h3>
        <Bar data={typeData} />
      </div>

      <div className="chart-box">
        <h3>By Category</h3>
        <Bar data={categoryData} />
      </div>

      <div className="chart-box">
        <h3>By Severity</h3>
        <Pie data={severityData} />
      </div>

      <div className="chart-box">
        <h3>Daily Trend</h3>
        <Line data={trendData} />
      </div>
    </div>
  );
}
