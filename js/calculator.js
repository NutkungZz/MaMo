import { FT_RATE, VAT_RATE, RATE_DETAILS } from './config.js';

export function calculateElectricityBill(units, rate) {
    // ดึงข้อมูลอัตราค่าไฟฟ้าและค่าบริการจาก config
    const { tiers, serviceCharge } = RATE_DETAILS[rate];
    let totalEnergyCost = 0;
    let remainingUnits = units;
    let calculation = [];

    // วนลูปคำนวณค่าไฟฟ้าตามช่วงการใช้ (tiers)
    for (const tier of tiers) {
        if (remainingUnits <= 0) break;
        
        // คำนวณจำนวนหน่วยที่ใช้ในช่วงนี้
        const usedUnits = Math.min(remainingUnits, tier.limit);
        // คำนวณค่าไฟฟ้าสำหรับช่วงนี้
        const tierCost = calculateTierCost(usedUnits, tier.prices);
        
        // เก็บข้อมูลการคำนวณเพื่อแสดงรายละเอียด
        calculation.push({ usedUnits, tierCost, prices: tier.prices });
        totalEnergyCost += tierCost;
        remainingUnits -= usedUnits;
    }

    // คำนวณค่า Ft
    const ftCharge = calculateFtCharge(units);
    // คำนวณยอดรวมก่อน VAT
    const subtotal = totalEnergyCost + serviceCharge + ftCharge;
    // คำนวณ VAT
    const vat = calculateVAT(subtotal);
    // คำนวณยอดรวมทั้งหมด
    const totalBill = subtotal + vat;

    // ส่งคืนข้อมูลการคำนวณทั้งหมด
    return {
        totalBill,
        calculation,
        serviceCharge,
        ftCharge,
        vat,
        units,
        rate,
        totalEnergyCost
    };
}

// ฟังก์ชันคำนวณค่าไฟฟ้าในแต่ละช่วง
function calculateTierCost(units, prices) {
    return prices.reduce((total, price) => total + Math.round(units * price * 100) / 100, 0);
}

// ฟังก์ชันคำนวณค่า Ft
function calculateFtCharge(units) {
    return Math.round(units * FT_RATE * 100) / 100;
}

// ฟังก์ชันคำนวณ VAT
function calculateVAT(amount) {
    return Math.round(amount * VAT_RATE * 100) / 100;
}
