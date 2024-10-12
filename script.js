document.addEventListener('DOMContentLoaded', () => {
    const meterReading = document.getElementById('meterReading');
    const saveButton = document.getElementById('saveButton');

    function validateReading(value) {
        return !isNaN(value) && parseFloat(value) > 0;
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
            alert('บันทึกค่า ' + value + ' สำเร็จ');
        } else {
            alert('กรุณากรอกค่าที่ถูกต้อง');
        }
    });
});
