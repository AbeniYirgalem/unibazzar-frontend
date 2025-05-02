import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import listingsData from "../mock/listings.json";
import CategoryButtons from "../components/CategoryButtons";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";

function MarketplacePage() {
  const [listings, setListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setListings(listingsData);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredListings = listings
    .filter(
      (item) => selectedCategory === "All" || item.category === selectedCategory
    )
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const categories = [
    "All",
    "Notes",
    "Textbooks",
    "Tutoring",
    "Food",
    "Services",
  ];

  return (
    <div className="p-6 pt-16">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <CategoryButtons
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Search Bar */}
        <div className="relative">
          {showSearch ? (
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => setShowSearch(false)}
              autoFocus
              className="w-64 p-2.5 rounded-full border border-gray-300 focus:border-gray-400 focus:ring-0 focus:outline-none shadow-sm transition placeholder:text-sm placeholder:text-gray-500"
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              <FiSearch className="text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredListings.map((item) => (
          <CardContainer
            key={item.id}
            className="group relative w-full max-w-sm mx-auto overflow-visible"
          >
            <CardBody className="relative bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col overflow-visible">
              {/* Image */}
              <CardItem>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-48 w-full object-cover rounded mb-4"
                />
              </CardItem>

              {/* Text */}
              <CardItem>
                <h2 className="font-semibold text-lg text-gray-900 line-clamp-1 mb-1">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="text-blue-600 font-bold text-lg mb-4">
                  ${item.price}
                </p>
              </CardItem>

              {/* Cart Icon */}
              <button className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white border hover:bg-black hover:text-white transition">
                <FiShoppingCart className="text-xl" />
              </button>

              {/* Hover Buttons */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 z-30 flex flex-col gap-2 pointer-events-auto">
                <Link
                  to={`/listing/${item.id}`}
                  className="bg-black text-white px-3 py-2 rounded text-sm hover:opacity-90 transition text-center"
                >
                  See Preview
                </Link>
                <button
                  onClick={() => alert(`Similar items for ${item.title}`)}
                  className="bg-black text-white px-3 py-2 rounded text-sm hover:opacity-90 transition"
                >
                  Similar Items
                </button>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}

export default MarketplacePage;
