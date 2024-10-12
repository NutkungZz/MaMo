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
            errorIcon.style.display = 'none';
            if (checkAbnormalUsage(value)) {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        } else {
            errorIcon.style.display = 'block';
            errorMessage.style.display = 'none';
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
