export const FT_RATE = 0.3972;
export const VAT_RATE = 0.07;

export const RATE_DETAILS = {
    '10': {
        name: 'บ้านอยู่อาศัยขนาดเล็ก',
        tiers: [
            { limit: 15, price: 2.3488 },
            { limit: 10, price: 2.9882 },
            { limit: 10, price: 3.2405 },
            { limit: 65, price: 3.6237 },
            { limit: 50, price: 3.7171 },
            { limit: 250, price: 4.2218 },
            { limit: Infinity, price: 4.4217 }
        ],
        serviceCharge: 8.19
    },
    '11': {
        name: 'บ้านอยู่อาศัยขนาดใหญ่',
        tiers: [
            { limit: 150, price: 3.2484 },
            { limit: 250, price: 4.2218 },
            { limit: Infinity, price: 4.4217 }
        ],
        serviceCharge: 24.62
    }
};
