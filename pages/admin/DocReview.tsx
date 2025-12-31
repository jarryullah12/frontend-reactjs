import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Search, Eye, CheckCircle, XCircle, RefreshCw, User, Mail, Calendar } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

const DocReview: React.FC = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReviews = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase.from('admin_doc_review').select('*').order('created_at', { ascending: false });
      if (data) setReviews(data);
    } finally { setRefreshing(false); }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setLoading(true);
    try {
      await supabase.from('admin_doc_review').update({ status: newStatus }).eq('id', id);
      fetchReviews();
    } finally { setLoading(false); }
  };

  return (
    <AdminLayout title={t('docReview.title')}>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
        <div className="relative">
            <input 
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder={t('docReview.searchPlaceholder')} 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-blue-500 outline-none w-64 bg-white text-black font-medium" 
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">{t('docReview.table.submittedAt')}</th>
              <th className="px-6 py-4">{t('docReview.table.client')}</th>
              <th className="px-6 py-4">{t('docReview.table.document')}</th>
              <th className="px-6 py-4 text-right">{t('docReview.table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-blue-50/20">
                <td className="px-6 py-4 text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm font-bold">{review.client_name}</td>
                <td className="px-6 py-4">
                  <a href={review.doc_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-bold">
                    <Eye className="w-3 h-3 text-blue-500" /> {t('docReview.table.viewDoc')}
                  </a>
                </td>
                <td className="px-6 py-4 text-right">
                   <button onClick={() => handleStatusUpdate(review.id, 'Approved')} className="text-green-600 mr-2"><CheckCircle className="w-5 h-5" /></button>
                   <button onClick={() => handleStatusUpdate(review.id, 'Rejected')} className="text-red-600"><XCircle className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default DocReview;