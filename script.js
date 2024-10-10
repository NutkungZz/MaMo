document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const currentReadingInput = document.getElementById('currentReading');
    const resultDiv = document.getElementById('result');
    const unitsUsedSpan = document.getElementById('unitsUsed');
    const electricityChargeSpan = document.getElementById('electricityCharge');

    // Mock previous reading
    const previousReading = 5000;

    calculateBtn.addEventListener('click', () => {
        const currentReading = parseFloat(currentReadingInput.value);
        if (isNaN(currentReading)) {
            alert('กรุณากรอกตัวเลขที่ถูกต้อง');
            return;
        }

        const unitsUsed = currentReading - previousReading;
        const charge = calculateCharge(unitsUsed);

        unitsUsedSpan.textContent = unitsUsed.toFixed(2);
        electricityChargeSpan.textContent = charge.toFixed(2);
        resultDiv.classList.remove('hidden');
    });

    function calculateCharge(units) {
        // Simple calculation for demonstration
        // You'll replace this with your actual calculation logic
        return units * 3.5; // assuming 3.5 baht per unit
    }
});
