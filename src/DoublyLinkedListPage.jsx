import React, { useState } from "react";
import DoublyLinkedList from "./DoublyLinkedList";
import { pages } from "./pages";

const list = new DoublyLinkedList();
pages.forEach(page => list.append(page));

function DoublyLinkedListPage() {
  const [current, setCurrent] = useState(list.current);

  const handleForward = () => setCurrent(list.forward());
  const handleBack = () => setCurrent(list.back());

  return (
    <div>
      <h1>🌐 Browser Navigation</h1>
      <p>Current page: {current?.value || "No page"}</p>
      <button onClick={handleBack}>⬅ Back</button>
      <button onClick={handleForward}>➡ Forward</button>
    </div>
  );
}

export default DoublyLinkedListPage;