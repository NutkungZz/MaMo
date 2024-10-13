import { calculateElectricityBill } from './calculator.js';
import { RATE_DETAILS } from './config.js';

export function initializeUI() {
    populateRateSelect();
    setupEventListeners();
    updateDateTime();
}

function populateRateSelect() {
    const rateSelect = document.getElementById('rateSelect');
    for (const [rate, details] of Object.entries(RATE_DETAILS)) {
        const option = document.createElement('option');
        option.value = rate;
        option.textContent = `${rate} (${details.name})`;
        rateSelect.appendChild(option);
    }
}

function setupEventListeners() {
    document.getElementById('meterReading').addEventListener('input', validateMeterReading);
    document.getElementById('saveButton').addEventListener('click', handleSaveButtonClick);
    document.getElementsByClassName('close')[0].addEventListener('click', closeBillModal);
}

function validateMeterReading(event) {
    const value = event.target.value;
    event.target.style.borderColor = isValidReading(value) ? '#810E5D' : 'red';
}

function isValidReading(value) {
    return !isNaN(value) && parseFloat(value) > 0;
}

function handleSaveButtonClick() {
    const meterReading = document.getElementById('meterReading').value;
    const rate = document.getElementById('rateSelect').value;

    if (isValidReading(meterReading)) {
        const units = parseFloat(meterReading);
        const result = calculateElectricityBill(units, rate);
        showBillDetails(result);
    } else {
        alert('กรุณากรอกค่าที่อ่านได้ให้ถูกต้อง');
    }
}

function showBillDetails(result) {
    const modal = document.getElementById('billModal');
    const billDetails = document.getElementById('billDetails');
    
    billDetails.innerHTML = generateBillDetailsHTML(result);
    modal.style.display = "block";
}

function generateBillDetailsHTML(result) {
    let html = `
        <h3>การคำนวณค่าไฟฟ้า</h3>
        <p>อัตรา: ${result.rate}</p>
        <p>จำนวนหน่วยที่ใช้: ${result.units} หน่วย</p>
    `;

    result.calculation.forEach(tier => {
        html += `<p>${tier.usedUnits} หน่วย: (${tier.price.toFixed(4)} * ${tier.usedUnits}) = ${tier.tierCost.toFixed(2)} บาท</p>`;
    });

    html += `
        <p>ค่าพลังงานไฟฟ้า: ${result.totalEnergyCost.toFixed(2)} บาท</p>
        <p>ค่าบริการ: ${result.serviceCharge.toFixed(2)} บาท</p>
        <p>ค่า Ft: ${result.ftCharge.toFixed(2)} บาท</p>
        <p>ภาษีมูลค่าเพิ่ม 7%: ${result.vat.toFixed(2)} บาท</p>
        <p><strong>รวมค่าไฟฟ้าทั้งหมด: ${result.totalBill.toFixed(2)} บาท</strong></p>
    `;

    return html;
}

function closeBillModal() {
    document.getElementById('billModal').style.display = "none";
}

function updateDateTime() {
    const dateTimeElement = document.getElementById('dateTimeInfo');
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
