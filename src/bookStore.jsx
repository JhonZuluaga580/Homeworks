import React, { useState } from "react";

class Stack {
  constructor() {
    this.items = [];
  }
  push(value) {
    this.items.push(value);
  }
  peek() {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  print() {
    return this.items.slice().reverse(); 
  }
}

const stack = new Stack();
stack.push({
  name: "Harry Potter",
  isbn: "ISBN123456789",
  author: "J. K. Rowling",
  editorial: "Salamandra",
});


export default function BooksStack() {
  const [books, setBooks] = useState(stack.print());
  const [form, setForm] = useState({
    name: "",
    isbn: "",
    author: "",
    editorial: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { ...form };
    stack.push(newBook);
    setBooks(stack.print());
    setForm({ name: "", isbn: "", author: "", editorial: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Books Stack</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="editorial"
          placeholder="Editorial"
          value={form.editorial}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Book</button>
      </form>

      {/* Renderizar Stack */}
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <strong>{book.name}</strong> — {book.isbn}, {book.author},{" "}
            {book.editorial}
          </li>
        ))}
      </ul>
    </div>
  );
}