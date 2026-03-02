import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import useProductFilters from '../hooks/useProductFilters';
import { FiGrid, FiList, FiRefreshCw } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Initialize our custom hook for product filtering
  const {
    filteredProducts,
    totalProducts,
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
    clearFilters
  } = useProductFilters(products);
  
  useEffect(() => {
    // Fetch products on component mount
    dispatch(fetchProducts());
  }, [dispatch]);
  
  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container">
        <Breadcrumb 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Shop', path: '/shop' }
          ]} 
        />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop</h1>
        
        {/* Filters */}
        <ProductFilters
          filters={filters}
          sortBy={sortBy}
          categories={categories}
          tags={tags}
          priceRange={priceRange}
          updateCategory={updateCategory}
          updatePriceRange={updatePriceRange}
          updateSearchTerm={updateSearchTerm}
          updateTag={updateTag}
          updateSortBy={updateSortBy}
          clearFilters={clearFilters}
          productCount={currentProducts.length}
          totalProducts={totalProducts}
        />
        
        {/* View mode selector */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          
          <div className="flex space-x-2">
            <button
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <FiGrid />
            </button>
            <button
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <FiList />
            </button>
          </div>
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <FiRefreshCw className="animate-spin h-10 w-10 mx-auto text-blue-500 mb-4" />
            <p className="text-gray-600">Loading products...</p>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-2">Failed to load products</p>
            <p className="text-gray-600">{error}</p>
          </div>
        )}
        
        {/* Empty state */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-800 mb-2">No products found</p>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
        
        {/* Product grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {currentProducts.map((product, index) => (
                  <div key={product.id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="md:w-1/3 bg-gray-100">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-60 md:h-full object-cover object-center"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center mb-4">
                        {product.oldPrice ? (
                          <>
                            <span className="text-gray-400 line-through mr-2">${product.oldPrice.toFixed(2)}</span>
                            <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        )}
                        
                        {product.badge && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => {/* Add to cart functionality */}}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === number
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage; 