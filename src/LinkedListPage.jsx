import React, { useState } from "react";
import LinkedList from "./LinkedList";
import { songs } from "./songs";

const list = new LinkedList();
songs.forEach(song => list.append(song));

function LinkedListPage() {
  const [current, setCurrent] = useState(list.current);

  const handleNext = () => {
    setCurrent(list.next());
  };

  return (
    <div>
      <h1>🎵 Playlist</h1>
      <p>Now playing: {current?.value || "No song"}</p>
      <button onClick={handleNext}>Next Song</button>
    </div>
  );
}

export default LinkedListPage;