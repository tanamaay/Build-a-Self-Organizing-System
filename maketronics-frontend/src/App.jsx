import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./components/Analytics";
import EntryForm from "./components/EntryForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/entry" element={<EntryForm />} />
    </Routes>
  );
}

export default App;
