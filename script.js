function calculateGPA() {
    const name = document.getElementById("name").value;
    const numCourses = parseInt(document.getElementById("numCourses").value);

    let totalCredits = 0;
    let totalGradePoints = 0;

    for (let i = 1; i <= numCourses; i++) {
        const courseName = document.getElementById(`courseName${i}`).value;
        const percentage = parseFloat(document.getElementById(`grade${i}`).value);
        const courseType = document.getElementById(`courseType${i}`).value;

        let scale;
        if (courseType === "regular") {
            if (percentage >= 90) scale = 4.00;
            else if (percentage >= 80) scale = 3.00;
            else if (percentage >= 70) scale = 2.00;
            else if (percentage >= 60) scale = 1.00;
            else scale = 0.00;
        } else if (courseType === "honors" || courseType === "ap") {
            if (percentage >= 90) scale = 5.00;
            else if (percentage >= 80) scale = 4.00;
            else if (percentage >= 70) scale = 3.00;
            else if (percentage >= 60) scale = 2.00;
            else scale = 1.00;
        }

        totalCredits += 1;
        totalGradePoints += scale;
    }

    const gpa = totalGradePoints / totalCredits;
    document.getElementById("result").textContent = `Hello ${name}, Your GPA: ${gpa.toFixed(2)}`;
}
