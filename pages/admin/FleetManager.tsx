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

<<<<<<< HEAD
=======
  // Modal State
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
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

<<<<<<< HEAD
  const openCreateModal = () => {
    setEditingId(null);
    setVehicleForm({ id: '', type: VehicleType.EXPRESS_SMALL_VAN, plate: '', driver: '', status: t('fleetManager.status.available'), location: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle: any) => {
    setEditingId(vehicle.id);
    setVehicleForm({ id: vehicle.id, type: vehicle.type, plate: vehicle.plate, driver: vehicle.driver, status: vehicle.status, location: vehicle.location });
=======
  // Open Modal for Create
  const openCreateModal = () => {
    setEditingId(null);
    setVehicleForm({
      id: '',
      type: VehicleType.EXPRESS_SMALL_VAN,
      plate: '',
      driver: '',
      status: 'Available',
      location: ''
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const openEditModal = (vehicle: any) => {
    setEditingId(vehicle.id);
    setVehicleForm({
      id: vehicle.id,
      type: vehicle.type as VehicleType,
      plate: vehicle.plate,
      driver: vehicle.driver,
      status: vehicle.status,
      location: vehicle.location
    });
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
<<<<<<< HEAD
    if(window.confirm(t('fleetManager.deleteConfirm').replace('{{id}}', id))) {
      setLoading(true);
      try {
        await supabase.from('fleet').delete().eq('id', id);
        dispatch(deleteVehicle(id));
      } finally { setLoading(false); }
=======
    if(window.confirm(`Delete vehicle ${id}?`)) {
      setLoading(true);
      try {
        const { error } = await supabase.from('fleet').delete().eq('id', id);
        if (error) throw error;
        
        dispatch(deleteVehicle(id));
      } catch (err: any) {
        console.error("Error deleting vehicle:", err);
        alert("Failed to delete vehicle: " + err.message);
      } finally {
        setLoading(false);
      }
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< HEAD
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
=======

    try {
      const vehicleId = editingId || `V-${Math.floor(Math.random() * 10000)}`;
      const payload = { ...vehicleForm, id: vehicleId };

      if (editingId) {
        // Update existing
        const { error } = await supabase
          .from('fleet')
          .update(payload)
          .eq('id', editingId);
        
        if (error) throw error;
        dispatch(updateVehicle(payload));
      } else {
        // Insert new
        const { error } = await supabase
          .from('fleet')
          .insert([payload]);
        
        if (error) throw error;
        dispatch(addVehicle(payload));
      }

      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Error saving vehicle:", err);
      alert("Failed to save vehicle: " + err.message);
    } finally {
      setLoading(false);
    }
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
  };

  return (
    <AdminLayout title={t('admin.fleetManager')}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium">
<<<<<<< HEAD
             {t('fleetManager.total')}: <span className="text-slate-900 font-bold">{fleet.length}</span>
           </div>
        </div>
        <button onClick={openCreateModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> {t('fleetManager.addVehicle')}
=======
             Total Vehicles: <span className="text-slate-900 font-bold">{fleet.length}</span>
           </div>
           <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100 text-sm font-medium text-green-700">
             Active: <span className="font-bold">{fleet.filter(v => v.status === 'Available' || v.status === 'In Transit').length}</span>
           </div>
           <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-100 text-sm font-medium text-red-700">
             Maintenance: <span className="font-bold">{fleet.filter(v => v.status === 'Maintenance').length}</span>
           </div>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Vehicle
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
<<<<<<< HEAD
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
=======
        {loading && <div className="p-4 text-center text-orange-600 bg-orange-50 text-sm">Processing database request...</div>}
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">Vehicle ID</th>
              <th className="px-6 py-4 font-semibold">{t('admin.table.type')}</th>
              <th className="px-6 py-4 font-semibold">{t('admin.table.plate')}</th>
              <th className="px-6 py-4 font-semibold">{t('admin.table.driver')}</th>
              <th className="px-6 py-4 font-semibold">{t('admin.table.location')}</th>
              <th className="px-6 py-4 font-semibold">{t('common.status')}</th>
              <th className="px-6 py-4 font-semibold text-right">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {fleet.length > 0 ? (
              fleet.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-slate-900 flex items-center gap-2">
                   <Truck className="w-4 h-4 text-gray-400" />
                   {vehicle.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{vehicle.type}</td>
                <td className="px-6 py-4 text-sm font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded w-fit">{vehicle.plate}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{vehicle.driver}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{vehicle.location}</td>
                <td className="px-6 py-4 text-sm">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold w-fit ${
                    vehicle.status === 'Available' ? 'bg-green-100 text-green-700' :
                    vehicle.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {vehicle.status === 'Available' && <CheckCircle className="w-3 h-3" />}
                    {vehicle.status === 'In Transit' && <Truck className="w-3 h-3" />}
                    {vehicle.status === 'Maintenance' && <AlertTriangle className="w-3 h-3" />}
                    {vehicle.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => openEditModal(vehicle)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit Vehicle"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(vehicle.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Vehicle"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
            ) : (
                <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No vehicles in fleet. Add one to get started.
                    </td>
                </tr>
            )}
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
          </tbody>
        </table>
      </div>

<<<<<<< HEAD
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
           <div className="bg-white rounded-xl p-8 max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">{editingId ? t('fleetManager.editVehicle') : t('fleetManager.addVehicle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                 <input className="w-full p-2 border rounded-lg" placeholder={t('fleetManager.form.plate')} value={vehicleForm.plate} onChange={e => setVehicleForm({...vehicleForm, plate: e.target.value})} />
                 <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">{loading ? t('common.processing') : t('fleetManager.form.save')}</button>
                 <button type="button" onClick={() => setIsModalOpen(false)} className="w-full text-gray-500 font-medium">{t('fleetManager.form.cancel')}</button>
=======
      {/* Add/Edit Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold">{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
                 <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium mb-1">Vehicle Type</label>
                    <select 
                      value={vehicleForm.type}
                      onChange={(e) => setVehicleForm({...vehicleForm, type: e.target.value as VehicleType})}
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white text-slate-900"
                    >
                      {Object.values(VehicleType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-medium mb-1">Plate Number</label>
                      <input 
                        required
                        type="text" 
                        value={vehicleForm.plate}
                        onChange={(e) => setVehicleForm({...vehicleForm, plate: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white text-slate-900"
                        placeholder="B-XY 123"
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium mb-1">Status</label>
                      <select 
                        value={vehicleForm.status}
                        onChange={(e) => setVehicleForm({...vehicleForm, status: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white text-slate-900"
                      >
                         <option value="Available">Available</option>
                         <option value="In Transit">In Transit</option>
                         <option value="Maintenance">Maintenance</option>
                      </select>
                   </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Driver Name</label>
                    <input 
                      type="text" 
                      value={vehicleForm.driver}
                      onChange={(e) => setVehicleForm({...vehicleForm, driver: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white text-slate-900"
                      placeholder="e.g. Max Mustermann"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Current Location</label>
                    <input 
                      type="text" 
                      value={vehicleForm.location}
                      onChange={(e) => setVehicleForm({...vehicleForm, location: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white text-slate-900"
                      placeholder="e.g. Berlin Depot"
                    />
                 </div>
                 <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold mt-4 disabled:opacity-70"
                >
                    {loading ? 'Saving...' : (editingId ? 'Update Vehicle' : 'Add Vehicle')}
                 </button>
>>>>>>> a37e29a5227f4751358a4e01f6c1c26447416def
              </form>
           </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default FleetManager;