function calculateGPA() {
    const gradeSelect = document.getElementById("grade");
    const selectedGrade = gradeSelect.value;

    const regularScale = {
        'A': 4.00,
        'B': 3.00,
        'C': 2.00,
        'D': 1.00,
        'F': 0.00
    };

    const honorsAPScale = {
        'A-': 5.00,
        'B-': 4.00,
        'C-': 3.00,
        'D-': 2.00,
        'F': 1.00
    };

    const isHonorsAP = selectedGrade.includes('-');
    const scale = isHonorsAP ? honorsAPScale : regularScale;

    const gpa = scale[selectedGrade];
    document.getElementById("result").textContent = `Your GPA: ${gpa.toFixed(2)}`;
}
