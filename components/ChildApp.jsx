const ChildApp = ({ category, onCategoryChange, onAddCategory, categories }) => {
  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <h1>Challenge 04</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Type a category"
          value={category}             
          onChange={onCategoryChange}      
        />
        <button onClick={onAddCategory} disabled={!category.trim()}>
          Add
        </button>
      </div>

      <ul style={{ marginTop: 12 }}>
        {categories.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChildApp;
