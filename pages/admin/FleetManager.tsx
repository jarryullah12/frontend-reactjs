import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Truck, AlertTriangle, CheckCircle, Trash2, Plus, X, Edit2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addVehicle, deleteVehicle, updateVehicle } from '../../store/slices/adminSlice';
import { VehicleType } from '../../types';
import { supabase } from '../../services/supabase';

const FleetManager: React.FC = () => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const fleet = useAppSelector(state => state.admin.fleet);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [vehicleForm, setVehicleForm] = useState({
    id: '',
    type: VehicleType.EXPRESS_SMALL_VAN,
    plate: '',
    driver: '',
    status: 'Available',
    location: ''
  });

  const [loading, setLoading] = useState(false);

  const openCreateModal = () => {
    setEditingId(null);
    setVehicleForm({ id: '', type: VehicleType.EXPRESS_SMALL_VAN, plate: '', driver: '', status: t('fleetManager.status.available'), location: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle: any) => {
    setEditingId(vehicle.id);
    setVehicleForm({ id: vehicle.id, type: vehicle.type, plate: vehicle.plate, driver: vehicle.driver, status: vehicle.status, location: vehicle.location });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if(window.confirm(t('fleetManager.deleteConfirm').replace('{{id}}', id))) {
      setLoading(true);
      try {
        await supabase.from('fleet').delete().eq('id', id);
        dispatch(deleteVehicle(id));
      } finally { setLoading(false); }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const vehicleId = editingId || `V-${Math.floor(Math.random() * 10000)}`;
      const payload = { ...vehicleForm, id: vehicleId };
      if (editingId) {
        await supabase.from('fleet').update(payload).eq('id', editingId);
        dispatch(updateVehicle(payload));
      } else {
        await supabase.from('fleet').insert([payload]);
        dispatch(addVehicle(payload));
      }
      setIsModalOpen(false);
    } finally { setLoading(false); }
  };

  return (
    <AdminLayout title={t('admin.fleetManager')}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium">
             {t('fleetManager.total')}: <span className="text-slate-900 font-bold">{fleet.length}</span>
           </div>
        </div>
        <button onClick={openCreateModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> {t('fleetManager.addVehicle')}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">{t('fleetManager.table.id')}</th>
              <th className="px-6 py-4">{t('fleetManager.table.type')}</th>
              <th className="px-6 py-4">{t('fleetManager.table.plate')}</th>
              <th className="px-6 py-4">{t('fleetManager.table.status')}</th>
              <th className="px-6 py-4 text-right">{t('fleetManager.table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {fleet.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-blue-50/20 transition-colors">
                <td className="px-6 py-4 text-sm font-bold">{vehicle.id}</td>
                <td className="px-6 py-4 text-sm">{t(`vehicleDetails.${vehicle.type}.label`)}</td>
                <td className="px-6 py-4 text-sm font-mono">{vehicle.plate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${vehicle.status === 'Available' || vehicle.status === 'Verfügbar' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {vehicle.status === 'Available' ? t('fleetManager.status.available') : vehicle.status === 'On Road' ? t('fleetManager.status.onRoad') : vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openEditModal(vehicle)} className="text-gray-400 hover:text-blue-600 mr-2"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(vehicle.id)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           <div className="bg-white rounded-xl p-8 max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">{editingId ? t('fleetManager.editVehicle') : t('fleetManager.addVehicle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                 <input className="w-full p-2 border rounded-lg" placeholder={t('fleetManager.form.plate')} value={vehicleForm.plate} onChange={e => setVehicleForm({...vehicleForm, plate: e.target.value})} />
                 <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">{loading ? t('common.processing') : t('fleetManager.form.save')}</button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="w-full text-gray-500 font-medium">{t('fleetManager.form.cancel')}</button>
              </form>
           </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default FleetManager;