document.addEventListener('DOMContentLoaded', () => {
    const meterReading = document.getElementById('meterReading');
    const saveButton = document.getElementById('saveButton');
    const rateSelect = document.getElementById('rateSelect');

    function validateReading(value) {
        return !isNaN(value) && parseFloat(value) > 0;
    }
//ฟังก์ชันคำนวณค่าไฟฟ้า
    function calculateElectricityBill(units, rate) {

        //กำหนดอัตราค่าไฟฟ้าตามช่วงการใช้
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

        // คำนวณค่าไฟฟ้าตามช่วงการใช้
        for (let tier of tiers) {
            if (remainingUnits <= 0) break;
            
            let usedUnits = Math.min(remainingUnits, tier.limit);
            let tierTotal = 0;
            let tierCalculation = `${usedUnits} หน่วย x (`;
            
            for (let i = 0; i < 4; i++) {
                let cost = Math.round(usedUnits * tier.prices[i] * 100) / 100;
                tierTotal += cost;
                tierCalculation += `${tier.prices[i].toFixed(4)}${i < 3 ? ' + ' : ''}`;
            }
            
            tierCalculation += `) = ${tierTotal.toFixed(2)} บาท`;
            totalBill += tierTotal;
            calculation.push(tierCalculation);
            
            remainingUnits -= usedUnits;
        }

        // เพิ่มค่าบริการ
        const serviceCharge = 8.19;
        totalBill += serviceCharge;

        return { totalBill, calculation, serviceCharge };
    }

    //แสดงการคำนวณ
    function showBillDetails(result, units, previousReading) {
        const modal = document.getElementById('billModal');
        const billDetails = document.getElementById('billDetails');
        const closeBtn = document.getElementsByClassName('close')[0];
    
        let detailsHtml = `<h3>การคำนวณค่าไฟฟ้า</h3>`;
        detailsHtml += `<p>อัตรา: 10</p>`;
        detailsHtml += `<p>จำนวนหน่วยที่ใช้ ${units} - ${previousReading} = ${units - previousReading} หน่วย</p>`;
        
        let totalEnergyCharge = 0;
        result.calculation.forEach((tier, index) => {
            let tierCalculation = `${tier.units} หน่วย: `;
            let tierTotal = 0;
            for (let i = 0; i < 4; i++) {
                tierTotal += tier.costs[i].cost;
                tierCalculation += `(${tier.prices[i].toFixed(4)}*${tier.units})`;
                if (i < 3) tierCalculation += ' + ';
            }
            tierCalculation += ` = ${tierTotal.toFixed(2)} บาท`;
            detailsHtml += `<p>${tierCalculation}</p>`;
            totalEnergyCharge += tierTotal;
        });
        
        detailsHtml += `<p>ค่าพลังงานไฟฟ้า ${totalEnergyCharge.toFixed(2)}</p>`;
        detailsHtml += `<p>ค่าบริการ: ${result.serviceCharge.toFixed(2)} บาท</p>`;
        detailsHtml += `<p><strong>รวมค่าไฟฟ้าทั้งหมด: ${result.totalBill.toFixed(2)} บาท</strong></p>`;
    
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
            const units = parseFloat(value) - 0; // 0 คือค่าอ่านครั้งก่อน
            const rate = parseInt(rateSelect.value);
            const result = calculateElectricityBill(units, rate);
            showBillDetails(result, units, rate);
        } else {
            alert('กรุณากรอกค่าที่ถูกต้อง');
        }
    });
});
