import React, { useEffect, useState } from 'react';
import NavbarMenu from '../components/navbar';
import ProductCard from '../components/product_card_shop';
import getProducts from '../src/services.js/productService';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genreExpanded, setGenreExpanded] = useState(false);
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const [formatExpanded, setFormatExpanded] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.products);
      } else {
        console.error(response.message);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <NavbarMenu />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Shop</h1>

        {/* Main layout with filter on the left and products on the right */}
        <div className="flex ">

          {/* Filter Section (Left side) */}
          <div className="bg-base-200 rounded-lg shadow-md p-4 ml-10 mt-8 mr-10">
            <h2 className="text-xl font-bold mb-2">Filters</h2>
            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Price</h3>
              <input
                type="range"
                min="0"
                max="500"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs">
                <span>Min: R{minPrice}</span>
                <span>Max: R{maxPrice}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full mt-2"
              />
            </div>

            {/* Genre Filter */}
            <div className="mb-6">
              <div
                onClick={() => setGenreExpanded(!genreExpanded)}
                className="cursor-pointer flex justify-between items-center mb-2"
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Genre</h3>
                <span>{genreExpanded ? "-" : "+"}</span>
              </div>
              {genreExpanded && (
                <div className="space-y-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Fiction</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Non-fiction</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Fantasy</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Biography</span>
                  </label>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <div
                onClick={() => setCategoryExpanded(!categoryExpanded)}
                className="cursor-pointer flex justify-between items-center mb-2"
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</h3>
                <span>{categoryExpanded ? "-" : "+"}</span>
              </div>
              {categoryExpanded && (
                <div className="space-y-2">
                  <select className="w-full rounded-md border-gray-300 shadow-sm">
                    <option value="">Select Category</option>
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                    <option value="4">Category 4</option>
                  </select>
                </div>
              )}
            </div>

            {/* Format Filter */}
            <div className="mb-6">
              <div
                onClick={() => setFormatExpanded(!formatExpanded)}
                className="cursor-pointer flex justify-between items-center mb-2"
              >
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Format</h3>
                <span>{formatExpanded ? "-" : "+"}</span>
              </div>
              {formatExpanded && (
                <div className="space-y-2">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Audio</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Hardcover</span>
                  </label>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <button className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700">
              Apply Filters
            </button>
          </div>

          {/* Products Section (Right side) */}
          <div className="flex-1">
            {isLoading ? (
              <p>Loading products...</p>
            ) : (
              <div className="w-full mt-8">
                <div className="grid grid-cols-3 gap-2">
                  {products.map((product) => (
                    <ProductCard
                      key={product.productId}
                      image={product.imageUrl}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      productId={product.productId}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>


  );
};

export default Shop;