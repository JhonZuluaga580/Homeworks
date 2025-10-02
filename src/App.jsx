import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LinkedListPage from "./LinkedListPage";
import DoublyLinkedListPage from "./DoublyLinkedListPage";

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Playlist</Link> |{" "}
        <Link to="/doubly-linked-list">Browser</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LinkedListPage />} />
        <Route path="/doubly-linked-list" element={<DoublyLinkedListPage />} />
      </Routes>
    </Router>
  );
}

export default App;