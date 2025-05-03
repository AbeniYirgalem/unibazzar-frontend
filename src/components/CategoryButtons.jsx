function CategoryButtons({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-full transition
              ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryButtons;
