import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Mail, Phone, User, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector } from '../../store/hooks';

const Customers: React.FC = () => {
  const { t } = useLanguage();
  const customers = useAppSelector(state => state.admin.customers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title={t('admin.customers')}>
      
      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex overflow-x-auto gap-2">
           {['all', 'active', 'vip', 'inactive'].map((status) => (
             <button
               key={status}
               onClick={() => setStatusFilter(status)}
               className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                 statusFilter === status 
                   ? 'bg-slate-900 text-white' 
                   : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
               }`}
             >
               {status}
             </button>
           ))}
        </div>

        <div className="flex gap-2">
          <div className="relative">
             <input 
               type="text" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder={`${t('common.search')}...`}
               className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none w-64 bg-white text-slate-900"
             />
             <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer Name</th>
                <th className="px-6 py-4 font-semibold">{t('common.email')}</th>
                <th className="px-6 py-4 font-semibold">{t('common.phone')}</th>
                <th className="px-6 py-4 font-semibold text-center">Orders</th>
                <th className="px-6 py-4 font-semibold text-right">Total Spent</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <a href={`mailto:${customer.email}`} className="hover:text-orange-600 transition-colors">{customer.email}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 text-center">{customer.orders}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">{customer.spent}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        customer.status === 'VIP' ? 'bg-orange-100 text-orange-700' :
                        customer.status === 'Active' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Customers;