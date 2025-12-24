const OperationalEntry = require("../models/OperationalEntry");
const classifyText = require("../services/classifier.service");

// CREATE ENTRY (NO CHANGE – already correct)
exports.createEntry = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const derivedData = classifyText(text);

    const entry = await OperationalEntry.create({
      raw_text: text,
      ...derivedData
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create entry" });
  }
};

// GET ENTRIES WITH FILTERING (UPDATED)
exports.getEntries = async (req, res) => {
  try {
    const { type, category, severity } = req.query;

    // Dynamic filter object
    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (severity) filter.severity = severity;

    const entries = await OperationalEntry
      .find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
};
