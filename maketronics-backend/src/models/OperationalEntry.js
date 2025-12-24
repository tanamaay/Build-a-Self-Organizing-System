const mongoose = require("mongoose");

const OperationalEntrySchema = new mongoose.Schema(
  {
    raw_text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "unknown"
    },
    category: {
      type: String,
      default: "other"
    },
    severity: {
      type: String,
      default: "low"
    },
    tags: {
      type: [String],
      default: []
    },
    source: {
      type: String,
      default: "manual"
    },
    confidence: {
      type: Number,
      default: 0.5
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("OperationalEntry", OperationalEntrySchema);
