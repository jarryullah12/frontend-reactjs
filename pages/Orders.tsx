import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Search, 
  Calendar, 
  Map, 
  ShoppingBag, 
  Loader2, 
  Landmark, 
  FileCheck, 
  Printer, 
  FileText, 
  Send, 
  Upload,
  ArrowRight,
  Filter,
  Info,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAppSelector } from '../store/hooks';
import { supabase } from '../services/supabase';

const Orders: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth.client);
  
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (user?.email) {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching orders:", error);
        } else {
          setUserBookings(data || []);
        }
      } catch (err) {
        console.error("Unexpected error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
        fetchOrders();
    } else {
        navigate('/login');
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, bookingId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadError(null);
      setSelectedFiles(prev => ({ ...prev, [bookingId]: file }));
    }
  };

  const handleFinalSubmit = async (booking: any) => {
    const file = selectedFiles[booking.id];
    if (!file) return;

    setUploadingId(booking.id);
    setUploadError(null);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `proof_${booking.id}_${Date.now()}.${fileExt}`;
      const filePath = `doc_reviews/${booking.id}/${fileName}`;

      console.log(`Starting upload to 'invoices' bucket: ${filePath}`);

      const { error: uploadError } = await supabase.storage
        .from('invoices')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error("Supabase Storage Error:", uploadError);
        if (uploadError.message.includes("bucket")) {
          throw new Error("The 'invoices' storage bucket does not exist. Please create it in your Supabase dashboard (Storage -> New Bucket -> 'invoices' -> Public).");
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: publicUrlData } = supabase.storage.from('invoices').getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;
      
      console.log("Upload successful. Public URL:", publicUrl);

      const { error: dbError } = await supabase
        .from('admin_doc_review')
        .insert([{ 
            order_id: booking.id,
            client_email: user?.email,
            client_name: user?.name,
            doc_url: publicUrl,
            status: 'Pending'
        }]);

      if (dbError) throw new Error(`Database record failed: ${dbError.message}`);

      const { error: orderUpdateError } = await supabase
        .from('orders')
        .update({ 
          status: 'Payment Review',
          client_proof_url: publicUrl 
        })
        .eq('id', booking.id);

      if (orderUpdateError) throw new Error(`Order update failed: ${orderUpdateError.message}`);

      alert("Payment proof submitted successfully! Our admin will review it.");
      
      setSelectedFiles(prev => {
        const newState = { ...prev };
        delete newState[booking.id];
        return newState;
      });
      await fetchOrders();
    } catch (err: any) {
      console.error("Submission error:", err);
      setUploadError(err.message);
    } finally {
      setUploadingId(null);
    }
  };

  const handlePrintInvoice = (booking: any) => {
    const invoiceWindow = window.open('', '_blank');
    if (!invoiceWindow) return;

    const orderDateObj = new Date(booking.created_at);
    const orderDate = orderDateObj.toLocaleDateString();
    
    const dueDateObj = new Date(orderDateObj);
    dueDateObj.setDate(dueDateObj.getDate() + 7);
    const dueDate = dueDateObj.toLocaleDateString();

    const invNo = `INV-2025-${booking.id.substring(0, 5).toUpperCase()}`;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Invoice - ${invNo}</title>
        <style>
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: sans-serif; }
          .a4-page { width: 210mm; min-height: 297mm; padding: 20mm; margin: 20px auto; background: white; box-sizing: border-box; display: flex; flex-direction: column; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          @media print { body { background: none; } .a4-page { margin: 0; box-shadow: none; } }
          .header { display: flex; justify-content: space-between; border-bottom: 3px solid #f97316; padding-bottom: 30px; margin-bottom: 40px; }
          .brand-logo { font-size: 32px; font-weight: 800; color: #0f172a; }
          .brand-logo span { color: #f97316; }
          .inv-meta { text-align: right; }
          .inv-meta h1 { margin: 0; color: #f97316; font-size: 42px; font-weight: 900; }
          .section { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 50px; }
          .section h3 { font-size: 13px; text-transform: uppercase; color: #94a3b8; border-bottom: 1px solid #e2e8f0; margin-bottom: 15px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
          th { background: #f8fafc; text-align: left; padding: 15px; border-bottom: 2px solid #e2e8f0; color: #64748b; font-size: 12px; }
          td { padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
          .summary { margin-left: auto; width: 250px; }
          .total-row { display: flex; justify-content: space-between; padding: 10px 0; font-weight: bold; border-top: 2px solid #f97316; font-size: 20px; }
          .payment-info { background: #fffaf5; border: 1px solid #ffedd5; padding: 25px; border-radius: 12px; margin-top: auto; }
          .bank-item { margin-bottom: 10px; }
          .bank-item label { display: block; font-size: 11px; color: #c2410c; font-weight: bold; }
          .bank-item span { font-family: monospace; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="a4-page">
          <div class="header">
            <div class="brand-logo">Spedition <span>Askari</span></div>
            <div class="inv-meta">
              <h1>INVOICE</h1>
              <p>No: ${invNo}<br>Date: ${orderDate}<br><strong>Due Date: ${dueDate}</strong></p>
            </div>
          </div>
          <div class="section">
            <div>
              <h3>From</h3>
              <p>
                <strong>Spedition Askari GmbH</strong><br>
                Südbahnstraße 31<br>
                32584 Löhne, Germany<br>
                <span style="font-size: 12px; color: #64748b;">Phone: +49 5731 1530960</span>
              </p>
            </div>
            <div>
              <h3>Bill To</h3>
              <p>
                <strong>${booking.client}</strong><br>
                ${user?.address || 'N/A'}<br>
                <span style="font-size: 12px; color: #64748b;">Phone: ${booking.phone || user?.phone || 'N/A'}</span>
              </p>
            </div>
          </div>
          <table>
            <thead><tr><th>Description</th><th>Vehicle</th><th style="text-align:right">Amount</th></tr></thead>
            <tbody><tr><td>Freight Transport Service: ${booking.route}</td><td>${booking.vehicle}</td><td style="text-align:right"><strong>${booking.amount}</strong></td></tr></tbody>
          </table>
          <div class="summary"><div class="total-row"><span>Total Due</span><span>${booking.amount}</span></div></div>
          <div class="payment-info">
            <h4 style="color:#9a3412; margin-top:0">🇩🇪 Payment Information (Bank Transfer)</h4>
            <div class="bank-item"><label>Account Holder</label><span>Spedition Askari GmbH</span></div>
            <div class="bank-item"><label>Bank Name</label><span>Volksbank in Ostwestfalen</span></div>
            <div class="bank-item"><label>IBAN</label><span>DE45 4786 0125 0620 1700 00</span></div>
            <div class="bank-item"><label>BIC</label><span>GENODEM1GTL</span></div>
            <div class="bank-item"><label>Reference</label><span style="color:#ea580c; font-weight:bold">${invNo}</span></div>
            <div class="bank-item" style="margin-top:10px; border-top: 1px solid #fed7aa; padding-top:10px;"><label>Payment Term</label><span>7-Days (Subject to prior approval)</span></div>
          </div>
        </div>
        <script>window.onload = () => { setTimeout(() => window.print(), 500); }</script>
      </body>
      </html>
    `;

    invoiceWindow.document.write(html);
    invoiceWindow.document.close();
  };

  const filteredBookings = userBookings.filter(b => 
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
           <div>
              <h1 className="text-3xl font-bold text-slate-900">{t('nav.orders')}</h1>
              <p className="text-gray-500 mt-1">Manage and track your transport shipments.</p>
           </div>
           
           <div className="w-full md:w-auto flex items-center gap-3">
              <div className="relative flex-grow">
                 <input 
                    type="text" 
                    placeholder="Search by ID or Route..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-sm shadow-sm"
                 />
                 <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-orange-600 shadow-sm transition-colors">
                 <Filter className="w-5 h-5" />
              </button>
           </div>
        </div>

        {uploadError && (
          <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-700 animate-fadeIn">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{uploadError}</p>
          </div>
        )}

        <div className="bg-white rounded-[2rem] shadow-xl shadow-orange-100/50 border border-orange-100 p-8 mb-10 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0 opacity-50"></div>
           
           <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 border-b border-gray-50 pb-6 relative z-10">
              <div className="bg-orange-600 p-4 rounded-2xl text-white shadow-lg shadow-orange-200">
                 <Landmark className="w-8 h-8" />
              </div>
              <div className="text-center sm:text-left">
                 <h3 className="text-xl font-black text-slate-900 tracking-tight">Saved Payment Information</h3>
                 <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Official Bank Details</p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                 <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">Preferred Bank</p>
                 <p className="text-sm font-bold text-slate-800">Volksbank in Ostwestfalen</p>
              </div>
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                 <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">Payment Term</p>
                 <p className="text-sm font-bold text-orange-600">7-Day Net Approval</p>
              </div>
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                 <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">Account Holder</p>
                 <p className="text-sm font-bold text-slate-800">Spedition Askari GmbH</p>
              </div>
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                 <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">SWIFT / BIC</p>
                 <p className="text-sm font-mono font-bold text-slate-800 tracking-tight">GENODEM1GTL</p>
              </div>
           </div>

           <div className="mt-8 flex items-start gap-3 bg-blue-50/50 p-4 rounded-2xl text-blue-800 border border-blue-100 relative z-10">
              <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
              <p className="text-xs leading-relaxed font-medium">
                Please transfer the total amount within <strong className="text-blue-700">7 days</strong>. Use the unique <strong className="text-blue-700">Invoice Number</strong> from your generated invoice as the transfer reference to ensure immediate processing.
              </p>
           </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-20">
               <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
               <p className="text-gray-500 font-medium">Loading your shipments...</p>
            </div>
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
                        <Package className="w-6 h-6 text-slate-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg text-slate-900 tracking-tight">#{booking.id.substring(0,8)}</span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            booking.status === 'Delivered' || booking.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                            booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>{booking.status}</span>
                        </div>
                        <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
                           <Calendar className="w-3.5 h-3.5" /> Booked on {new Date(booking.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex flex-col items-end">
                       <div className="text-2xl font-black text-slate-900 tracking-tight">{booking.amount}</div>
                       <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{booking.vehicle || 'Standard'}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                     <div className="space-y-4">
                        <div className="flex items-start gap-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                           <Map className="w-5 h-5 text-gray-400 mt-0.5" />
                           <div className="text-sm">
                              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Route Schedule</p>
                              <p className="text-slate-800 font-bold leading-relaxed">{booking.route}</p>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex flex-wrap items-center justify-end gap-3">
                        <button onClick={() => handlePrintInvoice(booking)} className="flex items-center gap-2 bg-white border border-gray-200 text-slate-700 px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
                           <Printer className="w-4 h-4" /> Generate Invoice
                        </button>
                        
                        {uploadingId === booking.id ? (
                          <div className="bg-gray-100 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</div>
                        ) : booking.client_proof_url ? (
                          <a href={booking.client_proof_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all">
                             <FileCheck className="w-4 h-4" /> Proof Confirmed
                          </a>
                        ) : (
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 cursor-pointer shadow-lg shadow-slate-200 transition-all active:scale-95">
                               <Upload className="w-4 h-4" /> {selectedFiles[booking.id] ? 'Replace Proof' : 'Upload Payment Proof'}
                               <input type="file" className="hidden" accept="application/pdf,image/*" onChange={(e) => handleFileChange(e, booking.id)} />
                            </label>
                            
                            {selectedFiles[booking.id] && (
                              <button onClick={() => handleFinalSubmit(booking)} className="bg-orange-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-orange-700 shadow-lg shadow-orange-100 flex items-center gap-2 animate-fadeIn transition-all active:scale-95">
                                <Send className="w-4 h-4" /> Submit Now
                              </button>
                            )}
                          </div>
                        )}
                     </div>
                  </div>

                  {(booking.status === 'Approved (Payment Pending)' || booking.status === 'Payment Review') && (
                    <div className="bg-orange-50/30 border border-orange-100/50 rounded-2xl p-6">
                       <div className="flex items-center gap-2 text-orange-800 mb-5">
                          <Landmark className="w-5 h-5" />
                          <h4 className="font-black text-[10px] uppercase tracking-[0.2em]">Required Transfer Reference</h4>
                       </div>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-xl border border-orange-100/30 shadow-sm">
                             <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">Target IBAN</p>
                             <p className="text-sm font-mono font-bold text-slate-900 tracking-tighter">DE45 4786 0125 0620 1700 00</p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-orange-100/30 shadow-sm">
                             <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">Mandatory Reference ID</p>
                             <p className="text-sm font-mono font-bold text-orange-700">INV-2025-{booking.id.substring(0, 5).toUpperCase()}</p>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
               <ShoppingBag className="w-20 h-20 text-gray-100 mx-auto mb-6" />
               <h3 className="text-2xl font-black text-slate-900 mb-2">No active shipments</h3>
               <p className="text-gray-400 mb-8 max-w-xs mx-auto font-medium">Your order history will appear here once you book a transport.</p>
               <button onClick={() => navigate('/booking')} className="inline-flex items-center gap-2 bg-orange-600 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 active:scale-95">
                  Book A Transport <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;