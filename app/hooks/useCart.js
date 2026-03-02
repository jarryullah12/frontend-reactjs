import { useDispatch, useSelector } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  updateCartItemQuantity, 
  clearCart, 
  applyCoupon 
} from '../redux/slices/cartSlice';

const useCart = () => {
  const dispatch = useDispatch();
  const { 
    items, 
    totalQuantity, 
    totalAmount 
  } = useSelector(state => state.cart);
  
  // Add an item to cart
  const handleAddToCart = (product, quantity = 1) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    }));
  };
  
  // Remove an item from cart
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };
  
  // Update item quantity
  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantity({ id: productId, quantity }));
    }
  };
  
  // Increase item quantity by 1
  const handleIncreaseQuantity = (productId) => {
    const item = items.find(item => item.id === productId);
    if (item) {
      dispatch(updateCartItemQuantity({ id: productId, quantity: item.quantity + 1 }));
    }
  };
  
  // Decrease item quantity by 1
  const handleDecreaseQuantity = (productId) => {
    const item = items.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      dispatch(updateCartItemQuantity({ id: productId, quantity: item.quantity - 1 }));
    }
  };
  
  // Clear the entire cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  // Apply a coupon code
  const handleApplyCoupon = (discountAmount) => {
    dispatch(applyCoupon(discountAmount));
  };
  
  // Check if an item exists in the cart
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };
  
  // Get an item from the cart
  const getCartItem = (productId) => {
    return items.find(item => item.id === productId);
  };
  
  return {
    items,
    totalQuantity,
    totalAmount,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleClearCart,
    handleApplyCoupon,
    isInCart,
    getCartItem
  };
};

export default useCart; 