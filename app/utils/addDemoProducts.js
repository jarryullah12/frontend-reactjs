// Utility function to add demo products to localStorage
export const addDemoProducts = () => {
  const demoProducts = [
    {
      name: "Men's T-Shirt",
      category: "Clothing",
      price: "29.99",
      stock: "25",
      description: "Comfortable cotton t-shirt for everyday wear",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Women's Hoodie",
      category: "Clothing",
      price: "49.99",
      stock: "15",
      description: "Warm and stylish hoodie for women",
      image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Stylish Cap",
      category: "Accessories",
      price: "19.99",
      stock: "3",
      description: "Trendy cap with adjustable strap",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Winter Beanie",
      category: "Accessories",
      price: "14.99",
      stock: "0",
      description: "Warm winter beanie with soft lining",
      image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Denim Jacket",
      category: "Clothing",
      price: "59.99",
      stock: "8",
      description: "Classic denim jacket for all seasons",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Leather Wallet",
      category: "Accessories",
      price: "24.99",
      stock: "30",
      description: "Genuine leather wallet with multiple card slots",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Running Shoes",
      category: "Footwear",
      price: "79.99",
      stock: "12",
      description: "Lightweight running shoes with cushioned soles",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sunglasses",
      category: "Accessories",
      price: "34.99",
      stock: "22",
      description: "UV protection sunglasses with stylish frames",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Save to localStorage
  localStorage.setItem('adminProducts', JSON.stringify(demoProducts));
  console.log('Demo products added to localStorage!');
  
  // Return the products for immediate use
  return demoProducts;
};
