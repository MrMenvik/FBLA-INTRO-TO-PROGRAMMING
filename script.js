function generateCourseInputs() {
    const numCourses = parseInt(document.getElementById("numCourses").value);
    let coursesHtml = "";
    for (let i = 1; i <= numCourses; i++) {
        coursesHtml += `
            <div class="course-container">
                <label for="courseName${i}">Course ${i} Name:</label>
                <input type="text" id="courseName${i}" placeholder="Enter course name">

                <label for="grade${i}">Grade in Percentage:</label>
                <input type="number" id="grade${i}" placeholder="Enter percentage">

                <label for="courseType${i}">Type of Course:</label>
                <select id="courseType${i}">
                    <option value="regular">Regular</option>
                    <option value="honors">Honors</option>
                    <option value="ap">AP</option>
                </select>
            </div>
        `;
    }

    document.getElementById("courses-container").innerHTML = coursesHtml;
}

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
