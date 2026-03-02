import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiX } from 'react-icons/fi';

const ProductFilters = ({
  filters,
  sortBy,
  categories,
  tags,
  priceRange,
  updateCategory,
  updatePriceRange,
  updateSearchTerm,
  updateTag,
  updateSortBy,
  clearFilters,
  productCount,
  totalProducts
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPriceRange, setCurrentPriceRange] = useState(
    filters.priceRange || [priceRange?.min || 0, priceRange?.max || 100]
  );
  
  // Handle price range change
  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const isMin = e.target.name === 'min';
    
    let newPriceRange;
    if (isMin) {
      newPriceRange = [
        Math.min(value, currentPriceRange[1]),
        currentPriceRange[1]
      ];
    } else {
      newPriceRange = [
        currentPriceRange[0],
        Math.max(value, currentPriceRange[0])
      ];
    }
    
    setCurrentPriceRange(newPriceRange);
  };
  
  // Apply price range filter
  const applyPriceRange = () => {
    updatePriceRange(currentPriceRange);
  };
  
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  
  return (
    <div className="bg-white shadow-sm rounded-lg mb-8">
      {/* Mobile filter toggle button */}
      <button 
        className="md:hidden w-full flex items-center justify-between p-4 text-lg font-medium"
        onClick={toggleMobileFilters}
      >
        Filters & Sorting
        <FiChevronDown className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`p-6 border-t md:border-t-0 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
        {/* Results summary and clear filters */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{productCount}</span> of {totalProducts} products
          </p>
          
          {(filters.category !== 'all' || 
            filters.tag !== 'all' || 
            filters.searchTerm !== '' || 
            (filters.priceRange && 
              (filters.priceRange[0] !== priceRange.min || 
               filters.priceRange[1] !== priceRange.max))) && (
            <button 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              onClick={clearFilters}
            >
              <FiX className="mr-1" />
              Clear filters
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Search */}
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
                placeholder="Search..."
                value={filters.searchTerm}
                onChange={(e) => updateSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Sort By */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              value={sortBy}
              onChange={(e) => updateSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>
          
          {/* Category Filter */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              value={filters.category}
              onChange={(e) => updateCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Tag Filter */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              value={filters.tag}
              onChange={(e) => updateTag(e.target.value)}
            >
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Price Range */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name="min"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                min={priceRange?.min || 0}
                max={priceRange?.max || 100}
                value={currentPriceRange[0]}
                onChange={handlePriceRangeChange}
              />
              <span>-</span>
              <input
                type="number"
                name="max"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                min={priceRange?.min || 0}
                max={priceRange?.max || 100}
                value={currentPriceRange[1]}
                onChange={handlePriceRangeChange}
              />
              <button
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={applyPriceRange}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 