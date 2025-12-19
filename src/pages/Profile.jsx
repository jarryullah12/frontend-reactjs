import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, User } from 'lucide-react';

const Profile = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="bg-gray-50 px-6 py-8 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <img
                            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                            src={user.avatar}
                            alt={user.name}
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                    </button>
                </div>

                <div className="px-6 py-8 sm:px-10">
                    <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                        <Package className="w-5 h-5 mr-2 text-primary" /> Order History
                    </h2>

                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
