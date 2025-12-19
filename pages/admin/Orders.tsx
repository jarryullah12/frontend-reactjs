import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Search, ChevronDown, RefreshCw, FileText, Eye, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateOrder, Order, setOrders } from '../../store/slices/adminSlice';
import { supabase } from '../../services/supabase';

const Orders: React.FC = () => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.admin.orders);
  
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLatestOrders = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) dispatch(setOrders(data));
    } catch (err: any) {
      console.error("Fetch error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleStatusChange = async (order: Order, newStatus: string) => {
      setUpdatingId(order.id);
      try {
          const { error } = await supabase
              .from('orders')
              .update({ status: newStatus })
              .eq('id', order.id);
          
          if (error) throw error;

          dispatch(updateOrder({ ...order, status: newStatus }));
      } catch (err: any) {
          console.error("Status update error:", err);
          alert(`Failed to update status: ${err.message}`);
      } finally {
          setUpdatingId(null);
      }
  };

  const filteredOrders = orders.filter(order => {
    const statusLower = (order.status || '').toLowerCase();
    const matchesTab = activeTab === 'all' || 
                       statusLower === activeTab || 
                       (activeTab === 'pending' && statusLower === 'pending review') || 
                       (activeTab === 'paid' && (statusLower === 'paid' || statusLower === 'payment review' || statusLower === 'payment proof uploaded'));
    
    const matchesSearch = 
        order.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.email && order.email.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
        case 'Paid': 
        case 'Payment Proof Uploaded':
        case 'Payment Review':
        case 'Delivered': return 'bg-green-100 text-green-700';
        case 'In Transit': return 'bg-blue-100 text-blue-700';
        case 'Approved (Payment Pending)': return 'bg-yellow-100 text-yellow-700';
        case 'Cancelled': return 'bg-red-100 text-red-700';
        default: return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <AdminLayout title={t('admin.orders')}>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0">
           {['all', 'pending review', 'approved (payment pending)', 'paid', 'delivered'].map((status) => (
             <button 
                key={status} 
                onClick={() => setActiveTab(status)} 
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${activeTab === status ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
             >
                {status}
             </button>
           ))}
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
                onClick={fetchLatestOrders}
                className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                title="Refresh Data"
                disabled={refreshing}
            >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin text-orange-600' : ''}`} />
            </button>
            <div className="relative flex-grow md:flex-grow-0">
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder={`${t('common.search')}...`} 
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none w-full md:w-64 bg-white text-slate-900" 
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Documents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 text-sm font-bold text-orange-600">#{order.id.substring(0,8)}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{order.client}</div>
                    <div className="text-[10px] text-gray-400">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[150px]">{order.route}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block">
                        <select 
                            disabled={updatingId === order.id}
                            value={order.status} 
                            onChange={(e) => handleStatusChange(order, e.target.value)} 
                            className={`appearance-none pl-3 pr-8 py-1.5 rounded text-[10px] font-black uppercase tracking-wider cursor-pointer border-none outline-none ring-1 ring-black/5 shadow-sm disabled:opacity-50 ${getStatusColor(order.status)}`}
                        >
                            <option value="Pending Review">Pending Review</option>
                            <option value="Approved (Payment Pending)">Approved (Payment Pending)</option>
                            <option value="Payment Review">Payment Review</option>
                            <option value="Paid">Paid</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        {updatingId === order.id ? (
                          <RefreshCw className="absolute right-2 top-2 w-3 h-3 animate-spin text-gray-500" />
                        ) : (
                          <ChevronDown className="absolute right-2 top-2 w-3 h-3 text-gray-500 pointer-events-none" />
                        )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                     <div className="flex flex-col gap-1 justify-center items-center">
                        {order.client_proof_url && (
                           <a 
                             href={order.client_proof_url} 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded text-[10px] font-bold hover:bg-green-700 transition-all shadow-sm"
                             title="Open Client Proof"
                           >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>VIEW PROOF</span>
                           </a>
                        )}
                        {order.invoice_url ? (
                           <a 
                             href={order.invoice_url} 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded text-[10px] font-bold hover:bg-slate-800 transition-all shadow-sm"
                             title="Open Official Invoice"
                           >
                              <Eye className="w-3 h-3 text-orange-500" />
                              <span>VIEW INVOICE</span>
                           </a>
                        ) : !order.client_proof_url && (
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">No File</span>
                        )}
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="p-16 text-center text-gray-500">
                <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-sm">No orders found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;