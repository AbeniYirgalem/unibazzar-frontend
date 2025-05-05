import React from "react";
import ProductCard from "./ProductCard";

/**
 * ProductGrid component
 * @param {Object} props
 * @param {Array} props.products - Array of product objects
 * @param {boolean} props.loading - Loading state
 * @param {string|null} props.error - Error message
 * @param {Function} props.onAddToCart - Add to cart handler
 * @param {Function} props.onClearError - Error clear handler
 */
const ProductGrid = ({
  products = [],
  loading,
  error,
  onAddToCart,
  onClearError,
}) => {
  if (loading) {
    return (
      <div className="text-center py-8 text-lg text-gray-600 dark:text-gray-300">
        Loading products...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-8 text-red-600 dark:text-red-400">
        {error}
        {onClearError && (
          <button className="ml-2 text-xs underline" onClick={onClearError}>
            Dismiss
          </button>
        )}
      </div>
    );
  }
  if (!products.length) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No products found.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <ProductCard
          key={`${product.type || product.category?.name || "product"}-${
            product.id
          }-${idx}`}
          uniqueKey={`${product.type || product.category?.name || "product"}-${
            product.id
          }-${idx}`}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
