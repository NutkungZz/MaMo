import { FT_RATE, VAT_RATE, RATE_DETAILS } from './config.js';

export function calculateElectricityBill(units, rate) {
    const { tiers, serviceCharge } = RATE_DETAILS[rate];
    let totalEnergyCost = 0;
    let remainingUnits = units;
    let calculation = [];

    for (const tier of tiers) {
        if (remainingUnits <= 0) break;
        
        const usedUnits = Math.min(remainingUnits, tier.limit);
        const tierCost = calculateTierCost(usedUnits, tier.price);
        
        calculation.push({ usedUnits, tierCost, price: tier.price });
        totalEnergyCost += tierCost;
        remainingUnits -= usedUnits;
    }

    const ftCharge = calculateFtCharge(units);
    const subtotal = totalEnergyCost + serviceCharge + ftCharge;
    const vat = calculateVAT(subtotal);
    const totalBill = subtotal + vat;

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

function calculateTierCost(units, price) {
    return Math.round(units * price * 100) / 100;
}

function calculateFtCharge(units) {
    return Math.round(units * FT_RATE * 100) / 100;
}

function calculateVAT(amount) {
    return Math.round(amount * VAT_RATE * 100) / 100;
}
