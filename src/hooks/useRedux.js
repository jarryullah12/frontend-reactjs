import { useSelector, useDispatch } from '../redux/mockRedux';
import { fetchDoctors, addDoctor, updateDoctor, deleteDoctor } from '../redux/actions/doctorActions';
import { fetchPatients, addPatient, updatePatient, deletePatient } from '../redux/actions/patientActions';
import { fetchAppointments, addAppointment, updateAppointment, deleteAppointment } from '../redux/actions/appointmentActions';
import { login, logout } from '../redux/actions/authActions';

// Custom hook for doctors
export const useDoctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector(state => state.doctors);

  return {
    doctors,
    loading,
    error,
    fetchDoctors: () => dispatch(fetchDoctors()),
    addDoctor: (doctor) => dispatch(addDoctor(doctor)),
    updateDoctor: (doctor) => dispatch(updateDoctor(doctor)),
    deleteDoctor: (id) => dispatch(deleteDoctor(id))
  };
};

// Custom hook for patients
export const usePatients = () => {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector(state => state.patients);

  return {
    patients,
    loading,
    error,
    fetchPatients: () => dispatch(fetchPatients()),
    addPatient: (patient) => dispatch(addPatient(patient)),
    updatePatient: (patient) => dispatch(updatePatient(patient)),
    deletePatient: (id) => dispatch(deletePatient(id))
  };
};

// Custom hook for appointments
export const useAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(state => state.appointments);

  return {
    appointments,
    loading,
    error,
    fetchAppointments: () => dispatch(fetchAppointments()),
    addAppointment: (appointment) => dispatch(addAppointment(appointment)),
    updateAppointment: (appointment) => dispatch(updateAppointment(appointment)),
    deleteAppointment: (id) => dispatch(deleteAppointment(id))
  };
};

// Custom hook for authentication
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(state => state.auth);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: (credentials) => dispatch(login(credentials)),
    logout: () => dispatch(logout())
  };
};
