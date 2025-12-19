import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-0 opacity-100 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
            <Check className="w-5 h-5" />
            <p className="font-medium">{message}</p>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;
