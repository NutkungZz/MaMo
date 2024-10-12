document.addEventListener('DOMContentLoaded', () => {
    const meterReading = document.getElementById('meterReading');
    const saveButton = document.getElementById('saveButton');

    function validateReading(value) {
        return !isNaN(value) && parseFloat(value) > 0;
    }

    function calculateElectricityBill(units, rate) {
        const tiers = [
            { limit: 15, price: 2.3488 },
            { limit: 10, price: 2.9882 },
            { limit: 10, price: 3.2405 },
            { limit: 65, price: 3.6237 },
            { limit: 50, price: 3.7171 },
            { limit: 250, price: 4.2218 },
            { limit: Infinity, price: 4.4217 }
        ];

        let totalBill = 0;
        let remainingUnits = units;
        let calculation = [];

        for (let tier of tiers) {
            if (remainingUnits <= 0) break;
            
            let usedUnits = Math.min(remainingUnits, tier.limit);
            let cost = usedUnits * tier.price;
            totalBill += cost;
            
            calculation.push(`${usedUnits} หน่วย x ${tier.price.toFixed(4)} บาท = ${cost.toFixed(2)} บาท`);
            
            remainingUnits -= usedUnits;
        }

        return { totalBill, calculation };
    }

    function showBillDetails(result) {
        const modal = document.getElementById('billModal');
        const billDetails = document.getElementById('billDetails');
        const closeBtn = document.getElementsByClassName('close')[0];

        let detailsHtml = "<ul>";
        result.calculation.forEach(item => {
            detailsHtml += `<li>${item}</li>`;
        });
        detailsHtml += "</ul>";
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
            const rate = 10; // สมมติว่าเป็นบ้านอยู่อาศัยขนาดเล็ก
            const result = calculateElectricityBill(units, rate);
            showBillDetails(result);
        } else {
            alert('กรุณากรอกค่าที่ถูกต้อง');
        }
    });
});
