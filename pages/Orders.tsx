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
  const { t, language } = useLanguage();
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

        if (error) throw error;
        setUserBookings(data || []);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
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

      const { error: uploadError } = await supabase.storage
        .from('invoices')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('invoices').getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;

      const { error: reviewError } = await supabase.from('admin_doc_review').insert([{
        order_id: booking.id,
        client_email: user?.email,
        client_name: user?.name,
        doc_url: publicUrl,
        status: 'Pending'
      }]);

      if (reviewError) throw reviewError;

      const { error: updateError } = await supabase.from('orders').update({
        status: 'Payment Review',
        client_proof_url: publicUrl
      }).eq('id', booking.id);

      if (updateError) throw updateError;

      alert(t('orders.alerts.paymentProofSuccess'));
      setSelectedFiles(prev => {
        const newState = { ...prev };
        delete newState[booking.id];
        return newState;
      });
      fetchOrders();
    } catch (err: any) {
      console.error("Submission error:", err);
      setUploadError(err.message || t('orders.alerts.uploadFailed'));
    } finally {
      setUploadingId(null);
    }
  };

  const handlePrintInvoice = (booking: any) => {
    const invoiceWindow = window.open('', '_blank');
    if (!invoiceWindow) return;

    const dateStr = new Date(booking.created_at).toLocaleDateString('de-DE');
    // Generate a proper invoice number format if not exists
    const invNo = `RE-${new Date().getFullYear()}-${booking.id.substring(0, 5).toUpperCase()}`;
    const clientName = booking.client_name || user?.name || t('profile.mockUser.role');

    // Parse amount for tax calculation (assuming amount string like "€150.00")
    // Remove non-numeric chars except dot and comma, replace comma with dot if needed for parsing
    const amountStr = booking.amount.toString().replace('€', '').trim();
    const amountVal = parseFloat(amountStr.replace(',', '.'));

    // Calculate Net and Tax (Assuming Gross amount provided)
    // Net = Gross / 1.19
    const netVal = amountVal / 1.19;
    const taxVal = amountVal - netVal;

    const netDisplay = netVal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    const taxDisplay = taxVal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    const grossDisplay = amountVal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

    const html = `
      <!DOCTYPE html>
      <html lang="${t('common.language') || 'de'}">
      <head>
        <meta charset="UTF-8">
        <title>${t('profile.invoice.title')} ${invNo}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          body { 
            font-family: 'Inter', sans-serif; 
            padding: 0; 
            margin: 0; 
            color: #111827; 
            font-size: 10pt;
            line-height: 1.4;
          }
          .page {
            max-width: 210mm;
            margin: 0 auto;
            padding: 15mm 20mm;
            background: white;
            min-height: 297mm;
            position: relative;
          }

          .header-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 20px;
            background-color: #2563eb;
          }
          
          /* Header Section */
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 50px;
          }
          .logo-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: auto;
          }
          .logo-box {
            background-color: #2563eb; /* Blue color matching the image */
            padding: 15px;
            display: inline-block;
            border-radius: 4px;
            margin-bottom: 10px;
          }
          .logo-text {
            color: #1e3a8a; /* Dark Blue */
            font-weight: 800;
            font-size: 16pt;
            margin: 0;
            padding-right: 10px;

          }
          
          /* Address Field */
          .sender-line {
            font-size: 7pt;
            font-weight: 700;
            margin-bottom: 10px;
            color: #4b5563;
          }
          .recipient {
            font-size: 10pt;
            margin-top: 5mm;
          }
          
          /* Main Title and Info Grid */
          .main-content {
            margin-top: 40px;
          }
          .invoice-heading {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 30px;
          }
          .invoice-heading h1 {
            font-size: 20pt;
            font-weight: 700;
            margin: 0;
          }
          
          .info-grid {
            text-align: left;
            font-size: 9pt;
            color: #4b5563;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
          }
          .info-label {
            font-weight: 600;
            text-transform: uppercase;
            font-size: 7pt;
            letter-spacing: 0.5px;
            text-align: left;
          }
          .info-value {
            color: #111827;
            text-align: right;
          }

          /* Content Text */
          .intro-text {
            margin-bottom: 25px;
          }
          
          /* Table */
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th {
            text-align: left;
            padding: 8px 10px;
            font-weight: 700;
            border-bottom: 2px solid #e5e7eb;
            font-size: 9pt;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #f3f4f6;
            vertical-align: top;
          }
          .col-right { text-align: right; }
          .col-desc { width: 50%; }
          
          /* Totals - Left Aligned */
          .totals-section {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 40px;
          }
          .total-row {
            display: flex;
            justify-content: flex-start; /* Aligned Left */
             padding: 5px 0;
          }
          .total-row.highlight {
            background-color: #daebe0; /* Tea Green highlight */
            font-weight: 700;
            padding: 10px;
            border-radius: 4px;
            margin-top: 5px;
            width: 50%; /* Limit width for left alignment appearance */
          }
          .total-label {
            width: 150px;
            text-align: left;
          }
          .total-value {
            width: 120px;
            text-align: right;
          }

          /* Footer Section */
          .footer-section {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start; /* Aligned to top */
            font-size: 10pt;
            color: #111827;
          }

          .footer-left {
            width: 80%;
            padding-right: 500px;
            text-align: left;
            padding-right: 50px;

          }
          .footer-left p {
            margin: 0 0 5px 0;
            line-height: 1.3;
          }
          .footer-left .greeting {
            margin-top: 15px;
          }
          .footer-left .signature {
            margin-top: 15px;
            font-weight: 600;
          }

          .footer-right {
            width: 45%;
            text-align: left; 
            padding-left:200px;
          }
          
          .company-block {
            margin-bottom: 8px;
            line-height: 1.2;
          }
          .company-block strong {
            font-weight: 700;
            display: block;
          }
          .company-details-line {
            display: block;
          }
          .company-details-line {
            white-space: nowrap;
          }
          
          .label {
            font-weight: 600;
            text-transform: uppercase;
            font-size: 7pt;
            letter-spacing: 0.5px;
            margin-right: 5px;
          }

          @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            .page { margin: 0; box-shadow: none; height: 100%; min-height: auto; }
            .footer-section { position: relative; bottom: auto; } /* Follows content in print too */
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header-line"></div>
          <!-- Header -->
          <div class="header">
            <div class="address-section">
              <div class="sender-line">Spedition Askari GmbH - Südbahnstraße 31 - 32584 Löhne</div>
              <div class="recipient">
                <strong>${booking.client_name || ''}</strong><br>
                <span class="info-value">${user?.email ? user.email.split('@')[0].substring(0, 5).toUpperCase() : '0000'}</span>
                <br>
                ${booking.billing_address || 'Boettgerstrasse 11'}<br>
                ${booking.zip_city || ''}<br>
                ${t('about.stats.germany')}
              </div>
            </div>
            <div class="logo-section">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-1767017985921.png?width=8000&height=8000&resize=contain" 
                alt="Spedition Askari" 
                style="height: 120px; width: auto;"
              />
            </div>
          </div>

          <!-- Title & Meta -->
          <div class="invoice-heading">
            <h1>${t('profile.invoice.title')} Nr. ${invNo}</h1>
            <div class="info-grid">
              <div class="info-row">
                <span class="info-label">${t('profile.invoice.invoiceNo')}.</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="info-value">${invNo}</span>
              </div>
              <div class="info-row">
                <span class="info-label">${t('profile.invoice.date')}</span>
                <span class="info-value">${dateStr}</span>
              </div>
              <div class="info-row">
                <span class="info-label">${t('profile.invoice.reference')}</span>
                <span class="info-value">${booking.id.substring(0, 8).toUpperCase()}</span>
              </div>
               <div class="info-row" style="margin-top: 10px">
                <span class="info-label">${t('profile.invoice.deliveryDate')}</span>
                <span class="info-value">${booking.pickup_date || dateStr}</span>
              </div>
              <div class="info-row">
               
              </div>
            </div>
          </div>

          <!-- Intro -->
          <div class="intro-text">
            <p>${t('profile.invoice.hello')}</p>
            <p>${t('profile.invoice.greeting')}<br>
            ${t('profile.invoice.service')}:</p>
          </div>

          <!-- Table -->
          <table>
            <thead>
              <tr>
                <th class="col-desc">${t('profile.invoice.description')}</th>
                <th class="col-right">${t('profile.invoice.quantity')}</th>
                <th class="col-right">${t('profile.invoice.unitPrice')}</th>
                <th class="col-right">${t('profile.invoice.totalPrice')}</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #daebe0;">
                <td>
                  <strong>${t('profile.invoice.service')}</strong><br>
                  <span style="font-size: 8pt; color: #666">${t('profile.invoice.route')}: ${booking.pickup.split(',')[0]} -> ${booking.dropoff.split(',')[0]}<br>
                  ${t('profile.invoice.vehicle')}: ${t(`vehicleDetails.${booking.vehicle_type || 'EXPRESS_MEDIUM_VAN'}.label`)}</span>
                </td>
                <td class="col-right">1</td>
                <td class="col-right">${grossDisplay}</td>
                <td class="col-right">${grossDisplay}</td>
              </tr>
            </tbody>
          </table>

          <!-- Totals (Left Aligned) -->
           <div class="totals-section">
             <div class="total-row">
               <span class="total-label">${t('profile.invoice.totalNet')}</span>
               <span class="total-value">${netDisplay}</span>
             </div>
             <div class="total-row highlight">
               <span class="total-label">${t('profile.invoice.taxRate')}</span>
               <span class="total-value">${taxDisplay}</span>
             </div>
             <div class="total-row" style="font-size: 11pt; margin-top: 10px; border-bottom: none;">
               <span class="total-label"><strong>${t('profile.invoice.totalGross')}</strong></span>
               <span class="total-value"><strong>${grossDisplay}</strong></span>
             </div>
           </div>

           <!-- New Footer Section -->
           <div class="footer-section">
             <div class="footer-left">
               <p style="text-align: left; margin-bottom: 8px;">${t('profile.invoice.paymentInfo')}</p>
               <p style="text-align: left; margin-bottom: 15px;">${t('profile.invoice.paymentDue')} <strong>${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')}</strong>.</p>
               
               <p class="greeting" style="text-align: left; margin-bottom: 5px;">${t('profile.invoice.paymentGreeting')}</p>
               <p class="signature" style="text-align: left; margin: 0;"><strong>Tanveer Askari</strong></p>
             </div>

             <div class="footer-right">
               <div class="company-block">
                 <strong>Spedition Askari GmbH</strong><br>
                 Südbahnstraße 31<br>
                 32584 Löhne<br>
                 ${t('about.stats.germany')}
               </div>

               <div class="company-block">
                 <span class="company-details-line"><span class="label">${t('profile.invoice.phone')}</span> +49 5731 1530960</span><br>
                 <span class="company-details-line"><span class="label">${t('profile.invoice.email')}</span> info@spedition-askari.de</span><br>
                 <span class="company-details-line"><span class="label">${t('profile.invoice.website')}</span> www.spedition-askari.de</span>
               </div>

               <div class="company-block">
                 <span class="company-details-line"><span class="label">${t('profile.invoice.court')}</span> Bünde</span><br>
                 <span class="company-details-line"><span class="label">${t('profile.invoice.registrationNo')}</span> 20414</span><br>
                 <span class="company-details-line"><span class="label">${t('profile.invoice.vatId')}</span> DE348127058</span><br>
                 <span class="company-details-line"><span class="label">${t('profile.invoice.taxNo')}</span> 310/5003/2632</span><br>
                 <span class="company-details-line"><span class="label">${t('profile.invoice.management')}</span></span><br>
                 <span class="company-details-line">Tanveer Askari</span>
               </div>

               <div class="company-block">
                 <span class="company-details-line"><span class="label">BANK</span> Volksbank in Ostwestfalen</span><br>
                 <span class="company-details-line"><span class="label">IBAN</span> DE45 4786 0125 0620 1700 00</span><br>
                 <span class="company-details-line"><span class="label">${t('profile.invoice.bic')}</span> GENODEM1GTL</span>
               </div>
             </div>
           </div>

        </div>
        <script>
          setTimeout(() => {
            window.print();
          }, 500);
        </script>
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
    <div key={language} className="bg-gray-50 min-h-screen">
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">{t('orders.title')}</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('orders.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="w-full md:w-auto flex items-center gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder={t('orders.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm shadow-sm text-black font-medium"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            </div>
            <button className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-500 hover:text-blue-600 shadow-sm transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {uploadError && (
          <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-700 animate-fadeIn">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-bold">{uploadError}</p>
          </div>
        )}

        {/* Global Payment Banner */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-100/50 border border-blue-100 p-8 mb-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-50"></div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 border-b border-gray-50 pb-6 relative z-10">
            <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-200">
              <Landmark className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">{t('orders.bankInfo.title')}</h3>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-wider">{t('orders.bankInfo.subtitle')}</p>
            </div>
          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">{t('orders.bankInfo.bankName')}</p>
                  <p className="text-sm font-bold text-slate-800">Volksbank in Ostwestfalen</p>
                <p className="text-[10px] text-gray-400 font-black uppercase mt-4 mb-1 tracking-widest">{t('orders.bankInfo.accountHolder')}</p>
                <p className="text-sm font-bold text-slate-800">Spedition Askari GmbH</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">{t('orders.bankInfo.paymentTerm')}</p>
                <p className="text-sm font-bold text-blue-600">{t('orders.bankInfo.termValue')}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">{t('orders.bankInfo.bic')} & IBAN</p>
                <p className="text-sm font-mono font-bold text-slate-800">BIC: GENODEM1GTL</p>
                <p className="text-sm font-mono font-bold text-slate-800 mt-2">IBAN: DE45 4786 0125 0620 1700 00</p>
              </div>
            </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-20">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-500 font-black uppercase text-xs tracking-widest">{t('orders.syncing')}</p>
            </div>
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 text-slate-400">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-lg text-slate-900 tracking-tight">#{booking.id.substring(0, 8)}</span>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'Delivered' || booking.status === 'Paid' ? 'bg-green-100 text-green-700' :
                              booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>{t(`orders.statuses.${booking.status.toLowerCase().replace(/ \(.+\)/g, '').replace(/ /g, '')}`) || booking.status}</span>
                          </div>
                        <div className="text-xs text-gray-400 font-bold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {t('orders.bookedOn')} {new Date(booking.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900 tracking-tight">{booking.amount}</div>
                      <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{booking.vehicle || t('common.standard')}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 flex items-start gap-4">
                      <Map className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{t('orders.logisticsRoute')}</p>
                        <p className="text-slate-700 font-bold text-sm leading-relaxed">{booking.pickup.split(',')[0]} {'->'} {booking.dropoff.split(',')[0]}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-3">
                      <button
                        onClick={() => handlePrintInvoice(booking)}
                        className="flex items-center gap-2 bg-white border border-gray-200 text-slate-700 px-6 py-3 rounded-xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                      >
                        <Printer className="w-4 h-4" /> {t('orders.invoice')}
                      </button>

                      {uploadingId === booking.id ? (
                        <div className="bg-gray-100 px-6 py-3 rounded-xl text-sm font-black flex items-center gap-2 text-gray-400">
                          <Loader2 className="w-4 h-4 animate-spin" /> {t('orders.uploading')}
                        </div>
                      ) : booking.client_proof_url ? (
                        <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-6 py-3 rounded-xl text-sm font-black">
                          <FileCheck className="w-4 h-4" /> {t('orders.proofReceived')}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-black hover:bg-blue-700 cursor-pointer shadow-lg shadow-blue-100 transition-all active:scale-95">
                            <Upload className="w-4 h-4" /> {selectedFiles[booking.id] ? t('orders.newFileSelected') : t('orders.uploadProof')}
                            <input type="file" className="hidden" accept="application/pdf,image/*" onChange={(e) => handleFileChange(e, booking.id)} />
                          </label>

                          {selectedFiles[booking.id] && (
                            <button onClick={() => handleFinalSubmit(booking)} className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-black hover:bg-slate-800 shadow-xl flex items-center gap-2 animate-fadeIn transition-all active:scale-95">
                              <Send className="w-4 h-4" /> {t('orders.submit')}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {(booking.status === 'Approved (Payment Pending)' || booking.status === 'Payment Review' || booking.status === 'Pending Review') && (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div className="text-xs text-blue-800 leading-relaxed font-medium">
                        {t('orders.paymentInstruction').replace('{{ref}}', `ASK-${booking.id.substring(0, 5).toUpperCase()}`)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
              <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-2">{t('orders.noShipments')}</h3>
              <p className="text-gray-400 mb-8 max-w-xs mx-auto font-medium">{t('orders.noShipmentsDesc')}</p>
              <button onClick={() => navigate('/booking')} className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4.5 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95">
                {t('orders.bookATransport')} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;