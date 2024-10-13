import { calculateElectricityBill } from './calculator.js';
import { RATE_DETAILS, FT_RATE, VAT_RATE } from './config.js';

export function initializeUI() {
    populateRateSelect();
    setupEventListeners();
    updateDateTime();
}

function populateRateSelect() {
    const rateSelect = document.getElementById('rateSelect');
    if (!rateSelect) return;
    
    for (const [rate, details] of Object.entries(RATE_DETAILS)) {
        const option = document.createElement('option');
        option.value = rate;
        option.textContent = `${rate} (${details.name})`;
        rateSelect.appendChild(option);
    }
}

function setupEventListeners() {
    const meterReading = document.getElementById('meterReading');
    const saveButton = document.getElementById('saveButton');
    
    if (meterReading) {
        meterReading.addEventListener('input', validateMeterReading);
    }
    if (saveButton) {
        saveButton.addEventListener('click', handleSaveButtonClick);
    }
}

function validateMeterReading(event) {
    const value = event.target.value;
    event.target.style.borderColor = isValidReading(value) ? '#810E5D' : 'red';
}

function isValidReading(value) {
    return !isNaN(value) && parseFloat(value) > 0;
}

function handleSaveButtonClick() {
    const meterReading = document.getElementById('meterReading');
    const rateSelect = document.getElementById('rateSelect');

    if (!meterReading || !rateSelect) return;

    const value = meterReading.value;
    const rate = rateSelect.value;

    if (isValidReading(value)) {
        const units = parseFloat(value);
        const result = calculateElectricityBill(units, rate);
        showBillDetails(result);
    } else {
        alert('กรุณากรอกค่าที่อ่านได้ให้ถูกต้อง');
    }
}

function showBillDetails(result) {
    const modal = document.getElementById('billModal');
    const billDetails = document.getElementById('billDetails');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    if (!modal || !billDetails || !closeBtn) return;

    billDetails.innerHTML = generateBillDetailsHTML(result);
    modal.style.display = "block";

    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

// สร้าง HTML สำหรับแสดงรายละเอียดค่าไฟฟ้า
function generateBillDetailsHTML(result) {
    try {
        let html = `
            <h3>การคำนวณค่าไฟฟ้า</h3>
            <p>ประเภทผู้ใช้ไฟ: ${RATE_DETAILS[result.rate].name} (${result.rate})</p>
            <p>จำนวนหน่วยที่ใช้: ${result.units} หน่วย</p>
        `;

        result.calculation.forEach(tier => {
            let tierDetails = tier.prices.map(price => 
                (tier.usedUnits * price).toFixed(2)
            ).join(' + ');
            
            html += `<p>${tier.usedUnits} หน่วย: ${tierDetails} = ${tier.tierCost.toFixed(2)} บาท</p>`;
        });

        const subtotalBeforeFtAndVat = result.totalEnergyCost + result.serviceCharge;

        html += `
            <p>ค่าพลังงานไฟฟ้า: ${result.totalEnergyCost.toFixed(2)} บาท</p>
            <p>ค่าบริการ: ${result.serviceCharge.toFixed(2)} บาท</p>
            <p>ค่า Ft (${result.units} หน่วย x ${FT_RATE.toFixed(4)}): ${result.ftCharge.toFixed(2)} บาท</p>
            <p>รวมก่อนภาษีมูลค่าเพิ่ม: ${(subtotalBeforeFtAndVat + result.ftCharge).toFixed(2)} บาท</p>
            <p>ภาษีมูลค่าเพิ่ม ${(VAT_RATE * 100).toFixed(0)}% (${(subtotalBeforeFtAndVat + result.ftCharge).toFixed(2)} x ${VAT_RATE.toFixed(2)}): ${result.vat.toFixed(2)} บาท</p>
            <p><strong>รวมค่าไฟฟ้าทั้งหมด: ${result.totalBill.toFixed(2)} บาท</strong></p>
        `;

        return html;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการสร้าง HTML สำหรับรายละเอียดบิล:', error);
        return '<p>เกิดข้อผิดพลาดในการแสดงรายละเอียดบิล กรุณาลองใหม่อีกครั้ง</p>';
    }
}

function updateDateTime() {
    const dateTimeElement = document.getElementById('dateTimeInfo');
    if (!dateTimeElement) return;

    const now = new Date();
    const dateTimeString = now.toLocaleString('th-TH', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit'
    });
    dateTimeElement.textContent = dateTimeString;
}
