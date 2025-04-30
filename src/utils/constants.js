export const INITIAL_LIMIT = 9;
export const SHIPPING_COST = 1500;
export const BASE_URL = 'https://neumaticor.com';
export const IMAGES_URL = 'https://darkslategrey-dragonfly-873689.hostingersite.com/uploads';
export const FONTS_URL = 'https://darkslategrey-dragonfly-873689.hostingersite.com/uploads/fonts';
export const API_URL = 'http://localhost:3001';

// export const URL_API = 'https://apineumaticor.vercel.app/api/';
export const URL_API = 'http://localhost:3001/api/';



export const CuotasTarjeta  = [
    { value: 1, label: '1 cuota (Sin interés)', interes: 0 },
    { value: 3, label: '3 cuotas (8% interés)', interes: 0.08 },
    { value: 6, label: '6 cuotas (17% interés)', interes: 0.17 },
    { value: 9, label: '9 cuotas (34% interés)', interes: 0.34 }
];

export const CuotasNx = [
    { value: "z", label: 'Plan Z (Sin interés)', interes: 0 },
    { value: 1, label: '1 cuota (Sin interés)', interes: 0 },
    { value: 4, label: '4 cuotas (Sin interés)', interes: 0 },
    { value: 6, label: '6 cuotas (8% interés)', interes: 0.08 },
    { value: 10, label: '10 cuotas (17% interés)', interes: 0.17 },
    { value: 12, label: '12 cuotas (25% interés)', interes: 0.25 }
];
