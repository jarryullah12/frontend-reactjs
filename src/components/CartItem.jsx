import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center py-6 border-b border-gray-100">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3><a href={`/ product / ${item.id} `}>{item.title}</a></h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
                </div>

                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-2 font-medium">{item.quantity}</span>
                        <button
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="p-2 hover:bg-gray-100 text-gray-600"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
