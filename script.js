document.addEventListener('DOMContentLoaded', () => {
    const meterReading = document.getElementById('meterReading');
    const errorIcon = document.getElementById('errorIcon');
    const errorMessage = document.getElementById('errorMessage');
    const saveButton = document.getElementById('saveButton');

    function validateReading(value) {
        // ตัวอย่างการตรวจสอบ: ค่าต้องเป็นตัวเลขและมากกว่า 0
        return !isNaN(value) && parseFloat(value) > 0;
    }

    function checkAbnormalUsage(value) {
        // ตัวอย่างการตรวจสอบการใช้ไฟผิดปกติ (เกิน 150%)
        // ในที่นี้สมมติว่าค่าปกติคือ 1000
        const normalUsage = 1000;
        return parseFloat(value) > normalUsage * 1.5;
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
            // ทำการบันทึกข้อมูลจริงๆ ที่นี่
        } else {
            alert('กรุณากรอกค่าที่ถูกต้อง');
        }
    });
});
