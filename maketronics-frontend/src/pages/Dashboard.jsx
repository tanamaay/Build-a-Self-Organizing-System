import { useState, useEffect } from "react";
import { api } from "../services/api";
import EntryForm from "../components/EntryForm";
import Analytics from "../components/Analytics";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await api.get("/entries");
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleNewEntry = (entry) => {
    setEntries([entry, ...entries]);
  };

  return (
    <div className="dashboard">
      <h1>Maketronics Dashboard</h1>
      <EntryForm onEntryAdded={handleNewEntry} />
      <Analytics />
      {loading ? (
        <p>Loading entries...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Text</th>
              <th>Type</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Tags</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e._id}>
                <td>{e.raw_text}</td>
                <td>{e.type}</td>
                <td>{e.category}</td>
                <td>{e.severity}</td>
                <td>{e.tags.join(", ")}</td>
                <td>{new Date(e.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
