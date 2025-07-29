import React, { useState } from "react";

const SubmitReview = () => {
  const [form, setForm] = useState({ name: "", comment: "", rating: 5 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", form); // Replace with actual backend call
    setForm({ name: "", comment: "", rating: 5 });
    alert("Thanks for your review!");
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 && "s"}
            </option>
          ))}
        </select>
        <textarea
          name="comment"
          placeholder="Your Review"
          value={form.comment}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          rows="4"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default SubmitReview;
