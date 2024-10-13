// อัตรา Ft
export const FT_RATE = 0.3972;

// อัตราภาษีมูลค่าเพิ่ม (VAT)
export const VAT_RATE = 0.07;

// รายละเอียดอัตราค่าไฟฟ้าแต่ละประเภท
export const RATE_DETAILS = {
    '10': {
        name: 'บ้านอยู่อาศัยขนาดเล็ก',
        // แต่ละ object ใน array นี้แทนช่วงการใช้ไฟฟ้า (tier)
        // limit คือจำนวนหน่วยสูงสุดของช่วงนี้
        // prices เป็น array ของราคาต่อหน่วย (มีหลายราคา แยกตาม Gen_rate, Trans_rate, Dist_rate, Support_rate)
        tiers: [
            { limit: 15, prices: [2.3488, 0, 0, 0] },
            { limit: 10, prices: [2.9882, 0, 0, 0] },
            { limit: 10, prices: [3.2405, 0, 0, 0] },
            { limit: 65, prices: [3.6237, 0, 0, 0] },
            { limit: 50, prices: [3.7171, 0, 0, 0] },
            { limit: 250, prices: [4.2218, 0, 0, 0] },
            { limit: Infinity, prices: [4.4217, 0, 0, 0] }
        ],
        serviceCharge: 8.19 //ค่าบริการรายเดือน
    },
    '11': {
        name: 'บ้านอยู่อาศัยขนาดใหญ่',
        tiers: [
            { limit: 150, prices: [3.2484, 0, 0, 0] },
            { limit: 250, prices: [4.2218, 0, 0, 0] },
            { limit: Infinity, prices: [4.4217, 0, 0, 0] }
        ],
        serviceCharge: 24.62
    },
    '20': {
        name: 'กิจการขนาดเล็ก 22-33 kV',
        tiers: [
            { limit: Infinity, prices: [3.0202, 0.3419, 0.3009, -0.2456] }
        ],
        serviceCharge: 312.24
    },
    '21': {
        name: 'กิจการขนาดเล็ก < 22 kV',
        tiers: [
            { limit: 150, prices: [3.2484, 0, 0, 0] },
            { limit: 250, prices: [4.2218, 0, 0, 0] },
            { limit: Infinity, prices: [4.4217, 0, 0, 0] }
        ],
        serviceCharge: 33.29
    },
    '60': {
        name: 'องค์การไม่แสวงหากำไร > 69 kV',
        tiers: [
            { limit: Infinity, prices: [3.0194, 0.3636, 0.1875, -0.1556] }
        ],
        serviceCharge: 312.24
    },
    '61': {
        name: 'องค์การไม่แสวงหากำไร 22-33 kV',
        tiers: [
            { limit: Infinity, prices: [3.0488, 0.3759, 0.3297, -0.1695] }
        ],
        serviceCharge: 312.24
    },
    '62': {
        name: 'องค์การไม่แสวงหากำไร < 22 kV',
        tiers: [
            { limit: 10, prices: [2.8013, 0, 0, 0] },
            { limit: Infinity, prices: [3.8919, 0, 0, 0] }
        ],
        serviceCharge: 20.00
    },
    '70': {
        name: 'สูบน้ำเพื่อการเกษตร',
        tiers: [
            { limit: 100, prices: [2.0889, 0, 0, 0] },
            { limit: Infinity, prices: [3.2405, 0, 0, 0] }
        ],
        serviceCharge: 115.16
    },
    '80': {
        name: 'ไฟฟ้าชั่วคราว',
        tiers: [
            { limit: Infinity, prices: [6.8025, 0, 0, 0] }
        ],
        serviceCharge: 0.00
    },
};
