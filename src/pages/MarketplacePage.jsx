import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import ProductGrid from "../components/product/ProductGrid";
// import { toast } from "react-toastify"; // Remove if not installed

const API_BASE = "http://localhost:8000/api/products";

const MarketplacePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");

  const [merchantProducts, setMerchantProducts] = useState([]);
  const [studentProducts, setStudentProducts] = useState([]);
  const [tutorServices, setTutorServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();

  // Replace with your actual auth token logic
  const getAuthToken = () => localStorage.getItem("token");

  // Helper to fetch and check for JSON response
  const safeFetch = async (url) => {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
    const contentType = res.headers.get("content-type");
    if (!res.ok) {
      throw new Error(`Network error: ${res.status}`);
    }
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error("Expected JSON, got: " + text.slice(0, 100));
    }
    return res.json();
  };

  // Fetch all product types and categories on mount
  useEffect(() => {
    if (!getAuthToken()) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [merchantData, studentData, tutorData, categoriesData] =
          await Promise.all([
            safeFetch(`http://localhost:8000/api/products/merchant-products/`),
            safeFetch(`http://localhost:8000/api/products/student-products/`),
            safeFetch(`http://localhost:8000/api/products/tutor-services/`),
            safeFetch(`http://localhost:8000/api/products/categories/`),
          ]);
        setMerchantProducts(
          Array.isArray(merchantData.results) ? merchantData.results : []
        );
        setStudentProducts(
          Array.isArray(studentData.results) ? studentData.results : []
        );
        setTutorServices(
          Array.isArray(tutorData.results) ? tutorData.results : []
        );
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        // If category is provided in URL, select it
        if (categoryParam) {
          const category = (
            Array.isArray(categoriesData) ? categoriesData : []
          ).find(
            (c) =>
              c.name && c.name.toLowerCase() === categoryParam.toLowerCase()
          );
          if (category) {
            setSelectedCategory(category.id);
          }
        }
      } catch (err) {
        setError(err.message);
        setCategories([]); // Ensure categories is always an array
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [categoryParam]);

  // Filter products based on active tab and selected category, then randomize order
  useEffect(() => {
    let products = [];
    switch (activeTab) {
      case "merchant":
        products = merchantProducts;
        break;
      case "student":
        products = studentProducts;
        break;
      case "tutor":
        products = tutorServices;
        break;
      case "all":
      default:
        products = [...merchantProducts, ...studentProducts, ...tutorServices];
        break;
    }
    if (selectedCategory) {
      products = products.filter(
        (product) => product.category_id === selectedCategory
      );
    }
    // Randomize the order of products
    products = products.slice().sort(() => Math.random() - 0.5);
    setFilteredProducts(products);
  }, [
    activeTab,
    merchantProducts,
    studentProducts,
    tutorServices,
    selectedCategory,
  ]);

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  // Handle add to cart (no toast)
  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, price: Number(product.price) }));
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handle error clear
  const clearError = () => setError(null);

  // Build category filter buttons (including static types)
  const staticCategories = [
    { id: "all", name: "All" },
    { id: "merchant", name: "Products" },
    { id: "student", name: "Notes & Textbooks" },
    { id: "tutor", name: "Tutoring" },
    { id: "food", name: "Food" },
  ];
  // Merge API categories (if any) with static, avoiding duplicates
  const allCategoryButtons = [
    ...staticCategories,
    ...categories.filter(
      (cat) =>
        !staticCategories.some(
          (s) => s.name.toLowerCase() === cat.name?.toLowerCase()
        )
    ),
  ];

  return (
    <div className="space-y-6 pt-10 m-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full md:w-auto"
        ></Tabs>
      </div>
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {allCategoryButtons.map((cat) => {
          // Only show button if there are products for this category/type
          let hasProducts = false;
          if (cat.id === "all") {
            hasProducts =
              merchantProducts.length > 0 ||
              studentProducts.length > 0 ||
              tutorServices.length > 0;
          } else if (cat.id === "merchant") {
            hasProducts = merchantProducts.length > 0;
          } else if (cat.id === "student") {
            hasProducts = studentProducts.length > 0;
          } else if (cat.id === "tutor") {
            hasProducts = tutorServices.length > 0;
          } else if (cat.id === "food") {
            // If you have a foodProducts array, check it here. Otherwise, hide.
            hasProducts = false;
          } else {
            // For dynamic categories, check if any product matches the category id
            hasProducts = [
              ...merchantProducts,
              ...studentProducts,
              ...tutorServices,
            ].some((p) => p.category_id === cat.id);
          }
          if (!hasProducts) return null;
          return (
            <button
              key={cat.id}
              className={`px-3 py-1 rounded ${
                activeTab === cat.id || selectedCategory === cat.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
              }`}
              onClick={() => {
                if (
                  ["all", "merchant", "student", "tutor", "food"].includes(
                    cat.id
                  )
                ) {
                  setActiveTab(cat.id);
                  setSelectedCategory(null);
                } else {
                  setSelectedCategory(cat.id);
                  setActiveTab("all");
                }
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
          {error}
          <button className="ml-2 text-xs underline" onClick={clearError}>
            Dismiss
          </button>
        </div>
      )}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        error={error}
        onAddToCart={handleAddToCart}
        onClearError={clearError}
      />
    </div>
  );
};

export default MarketplacePage;
