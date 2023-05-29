const confirmButton = document.getElementById('confirm');
confirmButton.addEventListener('click', () => {
    const monthSelect = document.getElementById('month');
    const selectedMonth = monthSelect.value;

    const yearInput = document.getElementById('year');
    const selectedYear = yearInput.value;

    // Rediriger vers la route principale avec les paramètres de mois et d'année
    window.location.href = `/?month=${selectedMonth}&year=${selectedYear}`;
});
