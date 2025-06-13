import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [dealedInput, setDealedInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const links = input.split("\n").map(link => link.trim()).filter(Boolean);

    try {
      const res = await axios.post("http://localhost:5000/api/check-sites", { links });
      setResults(res.data.newSites);
    } catch (err) {
      alert("Error checking sites");
    }
  };

  const handleDealedSubmit = async (e) => {
    e.preventDefault();
    const domains = dealedInput.split("\n").map(link => link.trim()).filter(Boolean);

    try {
      await axios.post("http://localhost:5000/api/add-dealed", { domains });
      alert("Dealed domains saved.");
      setDealedInput("");
    } catch (err) {
      alert("Error saving dealed domains");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Outreach Domain Filter Tool</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          placeholder="Paste Ahrefs URLs here, one per line"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button type="submit">Filter New Domains</button>
      </form>

      <h3>New Outreach Domains:</h3>
      <ul>
        {results.map((domain, idx) => (
          <li key={idx}>{domain}</li>
        ))}
      </ul>

      <hr />

      <h2>Add Dealed Domains</h2>
      <form onSubmit={handleDealedSubmit}>
        <textarea
          rows="6"
          cols="50"
          placeholder="Paste dealed root domains here"
          value={dealedInput}
          onChange={(e) => setDealedInput(e.target.value)}
        />
        <br />
        <button type="submit">Save Dealed Domains</button>
      </form>
    </div>
  );
}

export default App;