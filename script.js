document.addEventListener('DOMContentLoaded', () => {
    const meterReading = document.getElementById('meterReading');
    const saveButton = document.getElementById('saveButton');
    const rateSelect = document.getElementById('rateSelect');

    function validateReading(value) {
        return !isNaN(value) && parseFloat(value) > 0;
    }

function calculateElectricityBill(units) {
    const tiers = [
        { limit: 15, prices: [2.3488, 0, 0, 0] },
        { limit: 10, prices: [2.9882, 0, 0, 0] },
        { limit: 10, prices: [3.2405, 0, 0, 0] },
        { limit: 65, prices: [3.6237, 0, 0, 0] },
        { limit: 50, prices: [3.7171, 0, 0, 0] },
        { limit: 250, prices: [4.2218, 0, 0, 0] },
        { limit: Infinity, prices: [4.4217, 0, 0, 0] }
    ];

    let totalBill = 0;
    let remainingUnits = units;
    let calculation = [];

    for (let tier of tiers) {
        if (remainingUnits <= 0) break;
        
        let usedUnits = Math.min(remainingUnits, tier.limit);
        let tierTotal = 0;
        let tierCalculation = `${usedUnits} หน่วย: (`;
        
        for (let i = 0; i < 4; i++) {
            let cost = Math.round(usedUnits * tier.prices[i] * 100) / 100;
            tierTotal += cost;
            tierCalculation += `${tier.prices[i].toFixed(4)}*${usedUnits})`;
            if (i < 3) tierCalculation += ' + (';
        }
        
        tierCalculation += ` = ${tierTotal.toFixed(2)} บาท`;
        totalBill += tierTotal;
        calculation.push({ usedUnits, tierCalculation, tierTotal });
        
        remainingUnits -= usedUnits;
    }

    const serviceCharge = 8.19;
    totalBill += serviceCharge;

    // คำนวณค่า Ft
    const ftRate = 0.3972;
    const ftCharge = Math.round(units * ftRate * 100) / 100;
    totalBill += ftCharge;

    return { totalBill, calculation, serviceCharge, ftRate, ftCharge, units };
}

function showBillDetails(result, currentReading, previousReading) {
    const modal = document.getElementById('billModal');
    const billDetails = document.getElementById('billDetails');
    const closeBtn = document.getElementsByClassName('close')[0];

    let detailsHtml = `
        <style>
            .bill-details { font-size: 11px; line-height: 1.3; }
            .bill-details h3 { font-size: 14px; margin-bottom: 8px; }
            .bill-details p { margin: 3px 0; }
        </style>
        <div class="bill-details">
            <h3>การคำนวณค่าไฟฟ้า</h3>
            <p>อัตรา: 10</p>
            <p>จำนวนหน่วยที่ใช้ ${currentReading} - ${previousReading} = ${result.units} หน่วย</p>
    `;
    
    let totalEnergyCharge = 0;
    if (Array.isArray(result.calculation)) {
        result.calculation.forEach(tier => {
            if (tier && typeof tier.tierCalculation === 'string' && typeof tier.tierTotal === 'number') {
                detailsHtml += `<p>${tier.tierCalculation}</p>`;
                totalEnergyCharge += tier.tierTotal;
            }
        });
    }
    
    detailsHtml += `
            <p>ค่าพลังงานไฟฟ้า ${totalEnergyCharge.toFixed(2)} บาท</p>
            <p>ค่าบริการ: ${result.serviceCharge.toFixed(2)} บาท</p>
            <p>ค่า Ft ${result.ftRate.toFixed(4)} บาท/หน่วย: ${result.ftCharge.toFixed(2)} บาท</p>
            <p></p>
            <p><strong>รวมค่าไฟฟ้าทั้งหมด: ${result.totalBill.toFixed(2)} บาท</strong></p>
        </div>
    `;

    billDetails.innerHTML = detailsHtml;
    modal.style.display = "block";

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

    meterReading.addEventListener('input', function() {
        const value = this.value;
        if (validateReading(value)) {
            this.style.borderColor = '#810E5D';
        } else {
            this.style.borderColor = 'red';
        }
    });

    saveButton.addEventListener('click', function() {
        const value = meterReading.value;
        if (validateReading(value)) {
            const previousReading = 0; // ค่าอ่านครั้งก่อน (สมมติให้เป็น 0)
            const currentReading = parseFloat(value);
            const units = currentReading - previousReading;
            const result = calculateElectricityBill(units);
            showBillDetails(result, currentReading, previousReading);
        } else {
            alert('กรุณากรอกค่าที่ถูกต้อง');
        }
    });
});
