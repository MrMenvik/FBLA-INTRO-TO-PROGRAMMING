document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateButton").addEventListener("click", calculateGPA);
});

function generateCourseInputs(event) {
    event.preventDefault();

    const numCourses = parseInt(document.getElementById("numCourses").value);

    if (numCourses > 36) {
        alert("Please enter a number between 1 and 36.");
        return;
    }

    let coursesHtml = "";
    for (let i = 1; i <= numCourses; i++) {
        coursesHtml += `
            <div class="course-container">
                <h2>Course ${i}</h2>

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

    const coursesContainer = document.getElementById("courses-container");
    coursesContainer.innerHTML = coursesHtml;
    coursesContainer.style.height = "300px";
    coursesContainer.style.overflow = "auto";
}

function calculateWeightedGPA(percentage, courseType) {
    if (courseType === "regular") {
        return percentage >= 90 ? 4.00 : percentage >= 80 ? 3.00 : percentage >= 70 ? 2.00 : percentage >= 60 ? 1.00 : 0.00;
    } else if (courseType === "honors" || courseType === "ap") {
        return percentage >= 90 ? 5.00 : percentage >= 80 ? 4.00 : percentage >= 70 ? 3.00 : percentage >= 60 ? 2.00 : 1.00;
    }
}

function calculateUnweightedGPA(percentage) {
    return percentage >= 90 ? 4.00 : percentage >= 80 ? 3.00 : percentage >= 70 ? 2.00 : percentage >= 60 ? 1.00 : 0.00;
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
            weightedScale = calculateWeightedGPA(percentage, courseType);
        } else if (courseType === "honors" || courseType === "ap") {
            weightedScale = calculateWeightedGPA(percentage, courseType);
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

    // Populate userData structure
    const userData = {
        userName: name,
        courses: [],
        timestamp: new Date().toISOString(),
    };

    for (let i = 1; i <= numCourses; i++) {
        const courseData = {
            courseName: document.getElementById(`courseName${i}`).value,
            gradePercentage: parseFloat(document.getElementById(`grade${i}`).value),
            courseType: document.getElementById(`courseType${i}`).value,
        };

        userData.courses.push(courseData);
    }

    console.log(userData); // Display userData in the console (you can save it to a file or send it to a server)
}

function resetForm() {
    document.getElementById("gpaForm").reset();
    document.getElementById("courses-container").innerHTML = '';
    document.getElementById("result").textContent = 'Your GPA: ';
    document.getElementById("unweightedGPA").textContent = 'Unweighted GPA: ';
    document.getElementById("weightedGPA").textContent = 'Weighted GPA: ';
}

function downloadData() {
    // Implement the logic to download the user's data
    const userData = {
        userName: document.getElementById("name").value,
        courses: [],
        timestamp: new Date().toISOString(),
    };

    const numCourses = parseInt(document.getElementById("numCourses").value);
    for (let i = 1; i <= numCourses; i++) {
        const courseData = {
            courseName: document.getElementById(`courseName${i}`).value,
            gradePercentage: parseFloat(document.getElementById(`grade${i}`).value),
            courseType: document.getElementById(`courseType${i}`).value,
        };

        userData.courses.push(courseData);
    }

    const dataJson = JSON.stringify(userData, null, 2);
    const blob = new Blob([dataJson], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `userData_${userData.timestamp}.json`;
    link.click();
}