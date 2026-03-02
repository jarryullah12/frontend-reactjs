
// Utility functions for filtering, sorting, and managing products

/**
 * Filter products based on filter criteria
 * @param {Array} products - List of products
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered products
 */
export const filterProducts = (products, filters) => {
  if (!products || !filters) return products;
  
  return products.filter(product => {
    // Filter by category
    if (filters.category && filters.category !== 'all') {
      if (!product.categories.includes(filters.category)) {
        return false;
      }
    }
    
    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) {
        return false;
      }
    }
    
    // Filter by search term
    if (filters.searchTerm && filters.searchTerm.trim() !== '') {
      const searchTerm = filters.searchTerm.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const descMatch = product.description?.toLowerCase().includes(searchTerm);
      if (!nameMatch && !descMatch) {
        return false;
      }
    }
    
    // Filter by tag
    if (filters.tag && filters.tag !== 'all') {
      if (!product.tags.includes(filters.tag)) {
        return false;
      }
    }
    
    return true;
  });
};

/**
 * Sort products based on sort criteria
 * @param {Array} products - List of products
 * @param {String} sortBy - Sort criteria
 * @returns {Array} Sorted products
 */
export const sortProducts = (products, sortBy) => {
  if (!products || !sortBy) return products;
  
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low-high':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'name-a-z':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-z-a':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sortedProducts.sort((a, b) => (b.id) - (a.id));
    default:
      return sortedProducts;
  }
};

/**
 * Get unique category list from products
 * @param {Array} products - List of products
 * @returns {Array} Unique categories
 */
export const getUniqueCategories = (products) => {
  if (!products) return [];
  
  const categories = new Set();
  products.forEach(product => {
    if (product.categories) {
      product.categories.forEach(category => {
        categories.add(category);
      });
    }
  });
  
  return ['all', ...Array.from(categories)];
};

/**
 * Get unique tags from products
 * @param {Array} products - List of products
 * @returns {Array} Unique tags
 */
export const getUniqueTags = (products) => {
  if (!products) return [];
  
  const tags = new Set();
  products.forEach(product => {
    if (product.tags) {
      product.tags.forEach(tag => {
        tags.add(tag);
      });
    }
  });
  
  return ['all', ...Array.from(tags)];
};

/**
 * Get min and max price from products
 * @param {Array} products - List of products
 * @returns {Object} Min and max price
 */
export const getPriceRange = (products) => {
  if (!products || products.length === 0) return [0, 1000];
  
  const prices = products.map(product => product.price);
  return [Math.min(...prices), Math.max(...prices)];
};
