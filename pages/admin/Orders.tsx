<<<<<<< HEAD
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Search, 
  ChevronDown, 
  RefreshCw, 
  Eye, 
  Clock, 
  MapPin, 
  Receipt,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateOrder, Order } from '../../store/slices/adminSlice';
import { supabase } from '../../services/supabase';

const AdminOrders: React.FC = () => {
=======
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Search, ChevronDown, RefreshCw, FileText, Eye, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateOrder, Order, setOrders } from '../../store/slices/adminSlice';
import { supabase } from '../../services/supabase';

const Orders: React.FC = () => {
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.admin.orders);
  
<<<<<<< HEAD
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');

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

  const getStatusColor = (status: string) => {
    switch (status) {
        case 'Paid': 
        case 'Delivered': return 'bg-green-100 text-green-700';
        case 'In Transit': return 'bg-blue-100 text-blue-700';
        case 'Approved (Payment Pending)': 
        case 'Payment Review': return 'bg-yellow-100 text-yellow-700';
=======
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
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        case 'Cancelled': return 'bg-red-100 text-red-700';
        default: return 'bg-orange-100 text-orange-700';
    }
  };

<<<<<<< HEAD
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.route && o.route.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.billing_address && o.billing_address.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const allStatuses = [
    'Pending Review',
    'Approved (Payment Pending)',
    'Payment Review',
    'Paid',
    'In Transit',
    'Delivered',
    'Cancelled'
  ];

  return (
    <AdminLayout title={t('orders.title')}>
      {/* Search & Filter Header */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
            <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder={t('orders.searchPlaceholder')} 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white text-black font-medium" 
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-gray-500">{t('orders.statusFilter')}</span>
           <select 
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
             className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
           >
             <option value="All">{t('orders.allStatuses')}</option>
             {allStatuses.map(s => {
               const statusKey = s === 'Pending Review' ? 'pendingReview' : 
                                s === 'Approved (Payment Pending)' ? 'approved' :
                                s === 'Payment Review' ? 'paymentReview' :
                                s === 'Paid' ? 'paid' :
                                s === 'In Transit' ? 'inTransit' :
                                s === 'Delivered' ? 'delivered' :
                                s === 'Cancelled' ? 'cancelled' : s;
               return <option key={s} value={s}>{t(`dashboard.status.${statusKey}`)}</option>
             })}
           </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">{t('orders.table.id')}</th>
                <th className="px-6 py-4">{t('orders.table.clientDetail')}</th>
                <th className="px-6 py-4">{t('orders.table.timings')}</th>
                <th className="px-6 py-4">{t('orders.table.fullRoute')}</th>
                <th className="px-6 py-4">{t('orders.table.billingAddress')}</th>
                <th className="px-6 py-4">{t('orders.table.vehicle')}</th>
                <th className="px-6 py-4">{t('orders.table.amount')}</th>
                <th className="px-6 py-4">{t('orders.table.status')}</th>
                <th className="px-6 py-4 text-right">{t('orders.table.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="px-6 py-4 text-[10px] font-black text-blue-600">
                    #{order.id.substring(0,8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{order.client}</span>
                      <span className="text-[10px] text-gray-400">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-[11px] font-medium text-gray-600">
                       <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-blue-500" /> 
                          <span>{t('orders.table.pickup')}: {order.pickup_time || '--:--'}</span>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-gray-400" /> 
                          <span>{t('orders.table.delivery')}: {order.delivery_time || '--:--'}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[11px] text-gray-600 max-w-[200px]">
                       <div className="flex items-start gap-1.5 truncate" title={order.pickup}>
                          <MapPin className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                          <span>{order.pickup}</span>
                       </div>
                       <div className="flex items-start gap-1.5 truncate mt-1" title={order.dropoff}>
                          <MapPin className="w-3 h-3 text-green-400 shrink-0 mt-0.5" />
                          <span>{order.dropoff}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 max-w-[180px]">
                       <Receipt className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                       <span className="text-[11px] text-gray-500 whitespace-normal leading-relaxed" title={order.billing_address}>
                          {order.billing_address || t('dashboard.table.notProvided')}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-700 uppercase">
                      {order.vehicle?.split('(')[0] || 'Standard'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block">
                      <select 
                        disabled={updatingId === order.id}
                        value={order.status} 
                        onChange={(e) => handleStatusChange(order, e.target.value)} 
                        className={`appearance-none pl-3 pr-8 py-1.5 rounded text-[10px] font-black uppercase tracking-wider cursor-pointer border-none outline-none ring-1 ring-black/5 shadow-sm disabled:opacity-50 transition-all ${getStatusColor(order.status)}`}
                      >
                        {allStatuses.map(s => {
                           const statusKey = s === 'Pending Review' ? 'pendingReview' : 
                                            s === 'Approved (Payment Pending)' ? 'approved' :
                                            s === 'Payment Review' ? 'paymentReview' :
                                            s === 'Paid' ? 'paid' :
                                            s === 'In Transit' ? 'inTransit' :
                                            s === 'Delivered' ? 'delivered' :
                                            s === 'Cancelled' ? 'cancelled' : s;
                           return <option key={s} value={s}>{t(`dashboard.status.${statusKey}`)}</option>
                        })}
                      </select>
                      <div className="absolute right-2 top-2.5 pointer-events-none">
                        {updatingId === order.id ? (
                          <RefreshCw className="w-3 h-3 animate-spin text-gray-400" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.client_proof_url && (
                      <a 
                        href={order.client_proof_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black hover:bg-blue-700 transition-all shadow-sm"
                      >
                        <Eye className="w-3 h-3" /> {t('orders.table.proof')}
                      </a>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-400 text-sm font-medium italic">
                    {t('orders.table.noMatching')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
=======
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
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        </div>
      </div>
    </AdminLayout>
  );
};

<<<<<<< HEAD
export default AdminOrders;
=======
export default Orders;
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
