
export interface Template {
  id: string;
  name: string;
  category: 'professional' | 'modern';
  isAts: boolean;
  isTwoColumn: boolean;
  img: string;
  recommended?: boolean;
  themeColor?: string;
}

export const TEMPLATES: Template[] = [
  { id: 'Executive', name: 'Executive', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-blue-600' },
  { id: 'Modern', name: 'Modern', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-purple-600' },
  { id: 'Classic', name: 'Classic', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-900' },
  { id: 'Creative', name: 'Creative', category: 'modern', isAts: false, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-pink-600' },
  { id: 'Minimalist', name: 'Minimalist', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-slate-500' },
  { id: 'Professional', name: 'Professional', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-800' },
  { id: 'Corporate', name: 'Corporate', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-indigo-900' },
  { id: 'Elegant', name: 'Elegant', category: 'modern', isAts: false, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-amber-600' },
  { id: 'Clean', name: 'Clean', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-emerald-600' },
  { id: 'Tech', name: 'Tech', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-cyan-600' },
  { id: 'Developer', name: 'Developer', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-600' },
  { id: 'Designer', name: 'Designer', category: 'modern', isAts: false, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-purple-600' },
  { id: 'Manager', name: 'Manager', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-slate-900' },
  { id: 'Premium', name: 'Premium', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-amber-500' },
  { id: 'Elite', name: 'Elite', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-indigo-600' },
  { id: 'Simple', name: 'Simple', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-500' },
  { id: 'Bold', name: 'Bold', category: 'modern', isAts: false, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-red-600' },
  { id: 'Standard', name: 'Standard', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-700' },
  { id: 'Advanced', name: 'Advanced', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-blue-700' },
  { id: 'Essential', name: 'Essential', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-emerald-500' },
  { id: 'Compact', name: 'Compact', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-400' },
  { id: 'Spacious', name: 'Spacious', category: 'modern', isAts: false, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-300' },
  { id: 'Dynamic', name: 'Dynamic', category: 'modern', isAts: false, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-orange-600' },
  { id: 'Static', name: 'Static', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-800' },
  { id: 'Summit', name: 'Summit', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-blue-900' },
  { id: 'Elevate', name: 'Elevate', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-600' },
  { id: 'Vision', name: 'Vision', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-purple-600' },
  { id: 'Clarity', name: 'Clarity', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-emerald-600' },
  { id: 'Apex', name: 'Apex', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-blue-800' },
  { id: 'Nova', name: 'Nova', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-indigo-600' },
  { id: 'Pioneer', name: 'Pioneer', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-600' },
  { id: 'Horizon', name: 'Horizon', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-cyan-600' },
  { id: 'Luna', name: 'Luna', category: 'modern', isAts: false, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-400' },
  { id: 'Origin', name: 'Origin', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-800' },
  { id: 'Vertex', name: 'Vertex', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-blue-900' },
  { id: 'Nimbus', name: 'Nimbus', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-400' },
  { id: 'Aurora', name: 'Aurora', category: 'modern', isAts: false, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-purple-500' },
  { id: 'Zenith', name: 'Zenith', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-indigo-700' },
  { id: 'Echo', name: 'Echo', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-600' },
  { id: 'Pulse', name: 'Pulse', category: 'modern', isAts: false, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-pink-500' },
  { id: 'Oasis', name: 'Oasis', category: 'modern', isAts: false, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-teal-500' },
  { id: 'Nexus', name: 'Nexus', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-blue-700' },
  { id: 'Spectrum', name: 'Spectrum', category: 'modern', isAts: false, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-orange-500' },
  { id: 'Momentum', name: 'Momentum', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-blue-600' },
  { id: 'CV-Alpha', name: 'CV-Alpha', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-900' },
  { id: 'CV-Beta', name: 'CV-Beta', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-600' },
  { id: 'CV-Gamma', name: 'CV-Gamma', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-indigo-600' },
  { id: 'CV-Delta', name: 'CV-Delta', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-emerald-600' },
  { id: 'CV-Epsilon', name: 'CV-Epsilon', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-700' },
  { id: 'CV-Zeta', name: 'CV-Zeta', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-purple-600' },
  { id: 'CV-Eta', name: 'CV-Eta', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-800' },
  { id: 'CV-Theta', name: 'CV-Theta', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-cyan-600' },
  { id: 'CV-Iota', name: 'CV-Iota', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-500' },
  { id: 'CV-Kappa', name: 'CV-Kappa', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-indigo-500' },
  { id: 'CV-Lambda', name: 'CV-Lambda', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-600' },
  { id: 'CV-Mu', name: 'CV-Mu', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-amber-600' },
  { id: 'CV-Nu', name: 'CV-Nu', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-slate-900' },
  { id: 'CV-Xi', name: 'CV-Xi', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-pink-600' },
  { id: 'CV-Omicron', name: 'CV-Omicron', category: 'professional', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-indigo-900' },
  { id: 'CV-Pi', name: 'CV-Pi', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-700' },
  { id: 'CV-Rho', name: 'CV-Rho', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-teal-600' },
  { id: 'CV-Sigma', name: 'CV-Sigma', category: 'modern', isAts: true, isTwoColumn: false, img: 'https://images.unsplash.com/photo-1541462608141-ad60397d446f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-orange-600' },
  { id: 'CV-Tau', name: 'CV-Tau', category: 'professional', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', recommended: false, themeColor: 'bg-blue-800' },
  { id: 'CV-Upsilon', name: 'CV-Upsilon', category: 'modern', isAts: true, isTwoColumn: true, img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600', recommended: true, themeColor: 'bg-purple-700' }
];

