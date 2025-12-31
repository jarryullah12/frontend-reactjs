import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VehicleType } from '../../types';

export interface Order {
  id: string;
  client: string; // Full Name
  email?: string;
  phone?: string;
  date: string; // Preferred Date
  pickup?: string;
  pickup_time?: string;
  dropoff?: string;
  delivery_time?: string;
  billing_address?: string;
  distance?: string;
  route: string; // Keep for backward compatibility (summary)
  amount: string; // Estimated Total
  status: string;
  vehicle?: string;
  invoice_url?: string;
  client_proof_url?: string;
}

export interface Customer {
  id: string; // Changed from number to string for Supabase UUIDs
  name: string;
  contact: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  status: string;
}

export interface Vehicle {
  id: string;
  type: VehicleType;
  plate: string;
  driver: string;
  status: string;
  location: string;
}

interface AdminState {
  orders: Order[];
  customers: Customer[];
  fleet: Vehicle[];
}

// Initial state is empty to ensure no static data
const defaultState: AdminState = {
  orders: [],
  customers: [],
  fleet: []
};

const adminSlice = createSlice({
  name: 'admin',
  initialState: defaultState,
  reducers: {
    // Setters (Load Data)
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setFleet: (state, action: PayloadAction<Vehicle[]>) => {
      state.fleet = action.payload;
    },
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },

    // Order Actions
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      const index = state.orders.findIndex(o => o.id === action.payload);
      if (index !== -1) {
        state.orders.splice(index, 1);
      }
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },

    // Customer Actions
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      const index = state.customers.findIndex(c => c.id === action.payload);
      if (index !== -1) {
        state.customers.splice(index, 1);
      }
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },

    // Fleet Actions
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.fleet.push(action.payload);
    },
    deleteVehicle: (state, action: PayloadAction<string>) => {
      const index = state.fleet.findIndex(v => v.id === action.payload);
      if (index !== -1) {
        state.fleet.splice(index, 1);
      }
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.fleet.findIndex(v => v.id === action.payload.id);
      if (index !== -1) {
        state.fleet[index] = action.payload;
      }
    }
  },
});

export const { 
  setOrders, setFleet, setCustomers, 
  addOrder, deleteOrder, updateOrder,
  addCustomer, deleteCustomer, updateCustomer,
  addVehicle, deleteVehicle, updateVehicle 
} = adminSlice.actions;

export default adminSlice.reducer;