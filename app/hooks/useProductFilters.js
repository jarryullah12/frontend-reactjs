
import { useState, useEffect, useMemo } from 'react';
import { filterProducts, sortProducts, getUniqueCategories, getUniqueTags, getPriceRange } from '../utils/productUtils';

/**
 * Custom hook for handling product filtering and sorting
 * @param {Array} products - The original list of products
 * @returns {Object} Filtered products and filter state/handlers
 */
const useProductFilters = (products) => {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: null,
    searchTerm: '',
    tag: 'all'
  });
  
  const [sortBy, setSortBy] = useState('newest');
  
  // Get unique categories, tags, and price range
  const categories = useMemo(() => getUniqueCategories(products), [products]);
  const tags = useMemo(() => getUniqueTags(products), [products]);
  const priceRange = useMemo(() => getPriceRange(products), [products]);
  
  // Set initial price range
  useEffect(() => {
    if (priceRange && !filters.priceRange) {
      setFilters(prev => ({
        ...prev,
        priceRange: priceRange
      }));
    }
  }, [priceRange, filters.priceRange]);
  
  // Apply filters
  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [products, filters]);
  
  // Apply sorting
  const sortedAndFilteredProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortBy);
  }, [filteredProducts, sortBy]);
  
  // Filter update handlers
  const updateCategory = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };
  
  const updatePriceRange = (range) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };
  
  const updateSearchTerm = (searchTerm) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };
  
  const updateTag = (tag) => {
    setFilters(prev => ({ ...prev, tag }));
  };
  
  const updateSortBy = (sortOption) => {
    setSortBy(sortOption);
  };
  
  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: priceRange,
      searchTerm: '',
      tag: 'all'
    });
    setSortBy('newest');
  };
  
  return {
    filteredProducts: sortedAndFilteredProducts,
    totalProducts: sortedAndFilteredProducts.length,
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
  };
};

export default useProductFilters;
