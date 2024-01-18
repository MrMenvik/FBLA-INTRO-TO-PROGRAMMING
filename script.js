function generateCourseInputs(event) {
    event.preventDefault(); // Prevent the default form submission behavior

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

function calculateUnweightedGPA(percentage) {
    if (percentage >= 90) return 4.00;
    else if (percentage >= 80) return 3.00;
    else if (percentage >= 70) return 2.00;
    else if (percentage >= 60) return 1.00;
    else return 0.00;
}

function calculateGPA() {
    const name = document.getElementById("name").value;
    const numCourses = parseInt(document.getElementById("numCourses").value);

    let totalCredits = 0;
    let totalUnweightedGradePoints = 0;
    let totalWeightedGradePoints = 0;

    for (let i = 1; i <= numCourses; i++) {
        const percentageInput = document.getElementById(`grade${i}`);
        const courseType = document.getElementById(`courseType${i}`).value;

        const percentage = parseFloat(percentageInput.value);
        if (isNaN(percentage) || percentage < 0 || percentage > 100) {
            alert("Please enter a valid percentage between 0 and 100.");
            return;
        }

        let unweightedScale = calculateUnweightedGPA(percentage);

        let weightedScale;
        if (courseType === "regular") {
            weightedScale = unweightedScale * 1.1; // Adjust the weight factor as needed
        } else if (courseType === "honors" || courseType === "ap") {
            if (percentage >= 90) weightedScale = 5.00;
            else if (percentage >= 80) weightedScale = 4.00;
            else if (percentage >= 70) weightedScale = 3.00;
            else if (percentage >= 60) weightedScale = 2.00;
            else weightedScale = 1.00;
        }

        totalCredits += 1;
        totalUnweightedGradePoints += unweightedScale;
        totalWeightedGradePoints += weightedScale;
    }

    const unweightedGPA = totalUnweightedGradePoints / totalCredits;
    const weightedGPA = totalWeightedGradePoints / totalCredits;

    document.getElementById("result").textContent = `Hello ${name}, Your GPA:`;
    document.getElementById("unweightedGPA").textContent = `Unweighted GPA: ${unweightedGPA.toFixed(2)}`;
    document.getElementById("weightedGPA").textContent = `Weighted GPA: ${weightedGPA.toFixed(2)}`;
}