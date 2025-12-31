import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { 
  Package, 
  DollarSign, 
  AlertCircle,
  ChevronDown,
  RefreshCw,
  CheckCircle2,
  Clock,
  MapPin,
  Receipt
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateOrder, Order } from '../../store/slices/adminSlice';
import { supabase } from '../../services/supabase';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.admin.orders);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  
  // Calculate Dynamic Stats
  const parseAmount = (amountStr: string) => {
    return parseFloat(amountStr.replace(/[^0-9.-]+/g, "")) || 0;
  };

  const totalRevenue = orders.reduce((sum, order) => {
    if (order.status !== 'Cancelled') {
      return sum + parseAmount(order.amount);
    }
    return sum;
  }, 0);

  const activeOrdersCount = orders.filter(o => 
    ['Pending', 'Processing', 'In Transit', 'Approved (Payment Pending)', 'Payment Review', 'Payment Proof Uploaded'].includes(o.status)
  ).length;

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Pending Review').length;

  const recentOrders = orders.slice(0, 8);

  const handleStatusChange = async (order: Order, newStatus: string) => {
    setUpdatingId(order.id);
    setSuccessId(null);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', order.id);

      if (error) throw error;
      
      dispatch(updateOrder({ ...order, status: newStatus }));
      
      setSuccessId(order.id);
      setTimeout(() => setSuccessId(null), 2000);
      
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
    <AdminLayout title={t('dashboard.title')}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
             </div>
             <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded">{t('dashboard.stats.live')}</span>
          </div>
          <p className="text-gray-500 text-sm">{t('dashboard.stats.revenue')}</p>
          <h3 className="text-2xl font-bold text-slate-900">
            €{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
             </div>
             <span className="text-blue-600 text-sm font-bold bg-blue-50 px-2 py-1 rounded">{t('dashboard.stats.active')}</span>
          </div>
          <p className="text-gray-500 text-sm">{t('dashboard.stats.activeOrders')}</p>
          <h3 className="text-2xl font-bold text-slate-900">{activeOrdersCount}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
             </div>
             <span className="text-red-600 text-sm font-bold">{t('dashboard.stats.pending')}</span>
          </div>
          <p className="text-gray-500 text-sm">{t('dashboard.stats.pending')}</p>
          <h3 className="text-2xl font-bold text-slate-900">{pendingOrdersCount}</h3>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
           <h2 className="text-lg font-bold text-slate-900">{t('dashboard.recentOrders')}</h2>
           <Link to="/admin/orders" className="text-sm text-blue-600 font-bold hover:underline">{t('dashboard.viewAll')}</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">{t('dashboard.table.id')}</th>
                <th className="px-6 py-4">{t('dashboard.table.client')}</th>
                <th className="px-6 py-4">{t('dashboard.table.schedule')}</th>
                <th className="px-6 py-4">{t('dashboard.table.routeInfo')}</th>
                <th className="px-6 py-4">{t('dashboard.table.billingAddress')}</th>
                <th className="px-6 py-4">{t('booking.estTotal')}</th>
                <th className="px-6 py-4">{t('common.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-[10px] font-black text-blue-600">
                     #{order.id.substring(0,8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                     <div className="text-sm font-bold text-slate-900">{order.client}</div>
                     <div className="text-[10px] text-gray-400">{order.email}</div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <div>
                           <div>P: {order.pickup_time || '--:--'}</div>
                           <div>D: {order.delivery_time || '--:--'}</div>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="text-xs text-gray-600 max-w-[150px] truncate" title={order.pickup}>
                        <span className="font-bold text-[10px] uppercase text-gray-400 block">{t('dashboard.table.from')}</span>
                        {order.pickup || '-'}
                     </div>
                     <div className="text-xs text-gray-600 max-w-[150px] truncate mt-1" title={order.dropoff}>
                        <span className="font-bold text-[10px] uppercase text-gray-400 block">{t('dashboard.table.to')}</span>
                        {order.dropoff || '-'}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-xs text-gray-500 max-w-[180px] truncate italic">
                        <Receipt className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span title={order.billing_address}>{order.billing_address || t('dashboard.table.notProvided')}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="relative inline-block">
                        <select 
                            disabled={updatingId === order.id}
                            value={order.status} 
                            onChange={(e) => handleStatusChange(order, e.target.value)} 
                            className={`appearance-none pl-3 pr-8 py-1.5 rounded text-[10px] font-black uppercase tracking-wider cursor-pointer border-none outline-none ring-1 ring-black/5 shadow-sm disabled:opacity-50 transition-all ${getStatusColor(order.status)}`}
                        >
                            <option value="Pending Review">{t('dashboard.status.pendingReview')}</option>
                            <option value="Approved (Payment Pending)">{t('dashboard.status.approved')}</option>
                            <option value="Payment Review">{t('dashboard.status.paymentReview')}</option>
                            <option value="Paid">{t('dashboard.status.paid')}</option>
                            <option value="In Transit">{t('dashboard.status.inTransit')}</option>
                            <option value="Delivered">{t('dashboard.status.delivered')}</option>
                            <option value="Cancelled">{t('dashboard.status.cancelled')}</option>
                        </select>
                        {updatingId === order.id ? (
                          <RefreshCw className="absolute right-2 top-2.5 w-3 h-3 animate-spin text-gray-500" />
                        ) : successId === order.id ? (
                          <CheckCircle2 className="absolute right-2 top-2.5 w-3 h-3 text-green-600 animate-pulse" />
                        ) : (
                          <ChevronDown className="absolute right-2 top-2.5 w-3 h-3 text-gray-500 pointer-events-none" />
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentOrders.length === 0 && (
              <div className="p-12 text-center text-gray-500 text-sm font-medium">
                  {t('dashboard.noOrders')}
              </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;