import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateListingPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: null, // for file upload
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // TEMP: show the input data

    // ✅ Later here: send POST request to API or update JSON

    navigate("/"); // After submitting, go back to Home
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Create New Listing</h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title (e.g., Used Physics Textbook)"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price (e.g., 300 birr)"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="textbook">Textbook</option>
          <option value="notes">Peer Notes</option>
          <option value="tutoring">Tutoring</option>
          <option value="food">Food</option>
          <option value="services">Services (Laundry, Printing...)</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Write a brief description..."
          value={formData.description}
          onChange={handleChange}
          className="border p-3 w-full rounded h-32"
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-3 w-full rounded"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-semibold"
        >
          Post Listing
        </button>
      </form>
    </div>
  );
}

export default CreateListingPage;
