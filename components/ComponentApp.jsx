import { useState } from "react";
import ChildApp from "./components/ChildApp"; // If you placed ChildApp in src/components/, use: "./components/ChildApp"

const ComponentApp = () => {
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAdd = () => {
    const value = category.trim();
    if (!value) return; 
    setCategories((prev) => [...prev, value]);
    setCategory("");
  };

  return (
    <ChildApp
      category={category}
      onCategoryChange={handleChange}
      onAddCategory={handleAdd}
      categories={categories}
    />
  );
};

export default ComponentApp;
