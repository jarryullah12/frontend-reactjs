import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
<<<<<<< HEAD
import { Search, Eye, CheckCircle, XCircle, RefreshCw, User, Mail, Calendar } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useLanguage } from '../../contexts/LanguageContext';

const DocReview: React.FC = () => {
  const { t } = useLanguage();
=======
import { Search, Eye, CheckCircle, XCircle, RefreshCw, FileText, User, Mail, Calendar } from 'lucide-react';
import { supabase } from '../../services/supabase';

const DocReview: React.FC = () => {
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchReviews = async () => {
    setRefreshing(true);
    try {
<<<<<<< HEAD
      const { data, error } = await supabase.from('admin_doc_review').select('*').order('created_at', { ascending: false });
      if (data) setReviews(data);
    } finally { setRefreshing(false); }
  };

  useEffect(() => { fetchReviews(); }, []);
=======
      const { data, error } = await supabase
        .from('admin_doc_review')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setReviews(data || []);
    } catch (err: any) {
      console.error("Fetch error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setLoading(true);
    try {
<<<<<<< HEAD
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
=======
      const { error } = await supabase
        .from('admin_doc_review')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      await fetchReviews();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = reviews.filter(r => 
    r.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.client_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.order_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Document Review">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
            <button onClick={fetchReviews} className="p-2 text-gray-500 hover:text-orange-600 transition-colors">
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <div className="relative">
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Search documents..." 
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none w-64 bg-white text-slate-900" 
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
<<<<<<< HEAD
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
=======
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Submitted At</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Document</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(review.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {review.client_name}
                    </div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {review.client_email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-600">#{review.order_id.substring(0,8)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      review.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      review.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{review.status}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a 
                      href={review.doc_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
                    >
                      <Eye className="w-4 h-4 text-orange-500" />
                      VIEW DOC
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        <button 
                            onClick={() => handleStatusUpdate(review.id, 'Approved')} 
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                        >
                            <CheckCircle className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => handleStatusUpdate(review.id, 'Rejected')} 
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-500 text-sm italic">
                        No documents pending review.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
      </div>
    </AdminLayout>
  );
};

export default DocReview;