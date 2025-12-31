export enum VehicleType {
  // EXPRESS
  EXPRESS_SMALL_VAN = 'Small van (Express)',
  EXPRESS_MEDIUM_VAN = 'Medium van (Express)',
  EXPRESS_LARGE_VAN = 'Large van (Express)',
  EXPRESS_LIFT = 'Lift/tail-lift van (Express)',

  // Extra EXPRESS
  EXTRA_LEN_450 = 'Length 450cm (Extra)',
  EXTRA_LEN_480 = 'Length 480cm (Extra)',
  EXTRA_WID_230 = 'Width 230cm (Extra)',
  EXTRA_HEI_240 = 'Height 240cm (Extra)',
  EXTRA_TOP_LOAD = 'Top loading (Extra)',
  EXTRA_HAZARDOUS = 'Hazardous goods (Extra)',

  // Truck
  TRUCK_3T = '3t shipment (Truck)',
  TRUCK_5T = '5t shipment (Truck)',
  TRUCK_12T = '12t shipment (Truck)',
  TRUCK_24T = '24t shipment (Truck)'
}

export enum VehicleCategory {
  EXPRESS = 'EXPRESS',
  EXTRA_EXPRESS = 'Extra EXPRESS',
  TRUCK = 'Truck'
}

export const VEHICLE_CATEGORIES: Record<VehicleCategory, VehicleType[]> = {
  [VehicleCategory.EXPRESS]: [
    VehicleType.EXPRESS_SMALL_VAN,
    VehicleType.EXPRESS_MEDIUM_VAN,
    VehicleType.EXPRESS_LARGE_VAN,
    VehicleType.EXPRESS_LIFT
  ],
  [VehicleCategory.EXTRA_EXPRESS]: [
    VehicleType.EXTRA_LEN_450,
    VehicleType.EXTRA_LEN_480,
    VehicleType.EXTRA_WID_230,
    VehicleType.EXTRA_HEI_240,
    VehicleType.EXTRA_TOP_LOAD,
    VehicleType.EXTRA_HAZARDOUS
  ],
  [VehicleCategory.TRUCK]: [
    VehicleType.TRUCK_3T,
    VehicleType.TRUCK_5T,
    VehicleType.TRUCK_12T,
    VehicleType.TRUCK_24T
  ]
};

export interface ServicePrice {
  basePrice: number;
  pricePerKm: number;
}

export const PRICING: Record<VehicleType, ServicePrice> = {
  // EXPRESS
  [VehicleType.EXPRESS_SMALL_VAN]: { basePrice: 49, pricePerKm: 0.82 },
  [VehicleType.EXPRESS_MEDIUM_VAN]: { basePrice: 69, pricePerKm: 0.83 },
  [VehicleType.EXPRESS_LARGE_VAN]: { basePrice: 89, pricePerKm: 1.12 },
  [VehicleType.EXPRESS_LIFT]: { basePrice: 109, pricePerKm: 1.25 },

  // Extra EXPRESS
  [VehicleType.EXTRA_LEN_450]: { basePrice: 95, pricePerKm: 1.44 },
  [VehicleType.EXTRA_LEN_480]: { basePrice: 99, pricePerKm: 1.56 },
  [VehicleType.EXTRA_WID_230]: { basePrice: 102, pricePerKm: 1.50 },
  [VehicleType.EXTRA_HEI_240]: { basePrice: 96, pricePerKm: 1.31 },
  [VehicleType.EXTRA_TOP_LOAD]: { basePrice: 105, pricePerKm: 1.95 },
  [VehicleType.EXTRA_HAZARDOUS]: { basePrice: 125, pricePerKm: 1.94 },

  // Truck
  [VehicleType.TRUCK_3T]: { basePrice: 120, pricePerKm: 0.76 },
  [VehicleType.TRUCK_5T]: { basePrice: 150, pricePerKm: 0.93 },
  [VehicleType.TRUCK_12T]: { basePrice: 200, pricePerKm: 0.98 },
  [VehicleType.TRUCK_24T]: { basePrice: 280, pricePerKm: 0.96 },
};

export interface VehicleRecommendation {
  recommendedVehicle: VehicleType;
  reasoning: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export const getVehicleEnumKey = (value: VehicleType): string => {
  const entry = Object.entries(VehicleType).find(([_, v]) => v === value);
  return entry ? entry[0] : '';
};
