document.addEventListener('DOMContentLoaded', () => {
    const readingInput = document.querySelector('.reading-input input');
    const errorIcon = document.querySelector('.reading-input .error');
    const errorMessage = document.querySelector('.error-message');
    const saveButton = document.querySelector('.main-button');

    // ฟังก์ชันสำหรับตรวจสอบค่าที่ป้อน
    function validateReading(value) {
        // สมมติว่าค่าปกติอยู่ระหว่าง 0 ถึง 1000
        return value >= 0 && value <= 1000;
    }

    // เพิ่ม event listener สำหรับการป้อนค่า
    readingInput.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (validateReading(value)) {
            errorIcon.style.display = 'none';
            errorMessage.style.display = 'none';
        } else {
            errorIcon.style.display = 'inline';
            errorMessage.style.display = 'block';
        }
    });

    // เพิ่ม event listener สำหรับปุ่มบันทึก
    saveButton.addEventListener('click', function() {
        const value = parseFloat(readingInput.value);
        if (validateReading(value)) {
            alert('บันทึกค่าสำเร็จ: ' + value);
        } else {
            alert('กรุณาตรวจสอบค่าที่ป้อนอีกครั้ง');
        }
    });

    // เพิ่ม event listener สำหรับปุ่มนำทาง (ถ้าต้องการ)
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // ทำงานเมื่อกดปุ่มนำทาง
            console.log('กดปุ่มนำทาง:', this.innerHTML);
        });
    });
});
