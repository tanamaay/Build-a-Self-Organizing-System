const classifyText = (text) => {
    const lower = text.toLowerCase();
  
    let type = "unknown";   // Maps to: issue, event, log, task, incident, note
    let category = "other";
    let severity = "low";
    let tags = [];
  
    // 1️⃣ Issues → hardware / electrical problems
    if (
      lower.includes("overheat") ||
      lower.includes("temperature") ||
      lower.includes("motor") ||
      lower.includes("voltage") ||
      lower.includes("current") ||
      lower.includes("node")
    ) {
      type = "issue"; // Maps to "Issues"
      category = lower.includes("overheat") ? "hardware" : "electrical";
      severity = lower.includes("overheat") ? "high" : "medium";
      tags.push(category, "problem");
    }
  
    // 2️⃣ Events → logistics / delays
    if (lower.includes("delay") || lower.includes("shipment") || lower.includes("vendor")) {
      type = "event"; // Maps to "Events"
      category = "logistics";
      severity = "medium";
      tags.push("logistics", "delay");
    }
  
    // 3️⃣ Incidents → QA / failures
    if (lower.includes("failed") || lower.includes("failure") || lower.includes("qa")) {
      type = "incident"; // Maps to "Incidents"
      category = "quality";
      severity = "high";
      tags.push("failure", "qa");
    }
  
    // 4️⃣ Notes → observations
    if (lower.includes("observed") || lower.includes("noted")) {
      type = "note"; // Maps to "Notes"
      tags.push("observation");
    }
  
    // 5️⃣ Logs → explicit log entries
    if (lower.includes("log") || lower.includes("recorded") || lower.includes("entry")) {
      type = "log"; // Maps to "Logs"
      tags.push("log");
    }
  
    // 6️⃣ Tasks → action items / to-dos
    if (lower.includes("task") || lower.includes("action") || lower.includes("to-do")) {
      type = "task"; // Maps to "Tasks"
      tags.push("task");
    }
  
    // Defaults remain if nothing matches
    return {
      type,
      category,
      severity,
      tags,
      confidence: 0.8
    };
  };
  
  module.exports = classifyText;
  