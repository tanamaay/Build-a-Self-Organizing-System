import { useState } from "react";
import { api } from "../services/api";

export default function EntryForm({ onEntryAdded }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await api.post("/entries", { text });
      onEntryAdded(res.data);
      setText("");
    } catch (err) {
      setError("Failed to submit entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="entry-form">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter operational input..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
