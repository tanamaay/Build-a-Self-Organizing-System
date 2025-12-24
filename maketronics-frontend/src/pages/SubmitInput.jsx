import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

export default function SubmitInput() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!text.trim()) {
      toast.warning("Please enter some text");
      return;
    }

    setLoading(true);
    try {
      await api.post("/inputs", { text });
      toast.success("Input submitted successfully ✅");
      setText("");
    } catch (err) {
      toast.error("Failed to submit input ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Submit Raw Input</h2>

      <textarea
        rows="4"
        placeholder="Enter any operational issue, log, note..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <br />

      <button onClick={submit} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
