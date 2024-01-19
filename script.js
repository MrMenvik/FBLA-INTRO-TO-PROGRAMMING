// Event listener to ensure the DOM is fully loaded before attaching other listeners
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve buttons and add event listeners
    const generateButton = document.getElementById("generateButton");
    const calculateButton = document.getElementById("calculateButton");
    const saveButton = document.getElementById("saveButton");
    const resetButton = document.getElementById("resetButton");

    generateButton.addEventListener("click", generateCourseInputs);
    calculateButton.addEventListener("click", calculateGPA);
    resetButton.addEventListener("click", resetForm);
    saveButton.addEventListener("click", saveData);

    // Initial state: Hide Calculate GPA and Save Data buttons
    calculateButton.style.display = "none";
    saveButton.style.display = "none";
});

// Function to generate course inputs dynamically based on user input
function generateCourseInputs(event) {
    event.preventDefault();

    // Get the number of courses entered by the user
    const numCourses = parseInt(document.getElementById("numCourses").value);

    // Validate the number of courses
    if (numCourses <= 0 || numCourses > 36) {
        alert("Please enter a number between 1 and 36.");
        return;
    }

    // Generate HTML for course inputs
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

    // Display the generated course inputs
    const coursesContainer = document.getElementById("courses-container");
    coursesContainer.innerHTML = coursesHtml;
    coursesContainer.style.height = "300px";
    coursesContainer.style.overflow = "auto";

    // Trigger animations for course containers
    const courseContainers = document.querySelectorAll(".course-container");
    courseContainers.forEach((container, index) => {
        setTimeout(() => {
            container.classList.add("active");
        }, index * 100); // Adjust the delay for a staggered effect

        // Show Calculate GPA button after generating course inputs
        document.getElementById("calculateButton").style.display = "block";
    });
}

// Function to calculate GPA scales based on percentage and course type
function calculateScale(percentage, courseType) {
    let unweightedScale, weightedScale;

    if (courseType === "regular") {
        unweightedScale = percentage >= 90 ? 4.00 : percentage >= 80 ? 3.00 : percentage >= 70 ? 2.00 : percentage >= 60 ? 1.00 : 0.00;
        weightedScale = percentage >= 90 ? 4.00 : percentage >= 80 ? 3.00 : percentage >= 70 ? 2.00 : percentage >= 60 ? 1.00 : 0.00;
    } else if (courseType === "honors" || courseType === "ap") {
        unweightedScale = percentage >= 90 ? 4.00 : percentage >= 80 ? 3.00 : percentage >= 70 ? 2.00 : percentage >= 60 ? 1.00 : 0.00;
        weightedScale = percentage >= 90 ? 5.00 : percentage >= 80 ? 4.00 : percentage >= 70 ? 3.00 : percentage >= 60 ? 2.00 : 1.00;
    }

    return { unweightedScale, weightedScale };
}

// Function to calculate unweighted GPA based on percentage
function calculateUnweightedGPA(percentage) {
    return percentage >= 90 ? 4.00 : percentage >= 80 ? 3.00 : percentage >= 70 ? 2.00 : percentage >= 60 ? 1.00 : 0.00;
}

// Function to calculate weighted GPA based on percentage and course type
function calculateWeightedGPA(percentage, courseType) {
    if (courseType === "regular") {
        return percentage >= 90 ? 4.00 : percentage >= 80 ? 3.00 : percentage >= 70 ? 2.00 : percentage >= 60 ? 1.00 : 0.00;
    } else if (courseType === "honors" || courseType === "ap") {
        return percentage >= 90 ? 5.00 : percentage >= 80 ? 4.00 : percentage >= 70 ? 3.00 : percentage >= 60 ? 2.00 : 1.00;
    }
}

// Function to calculate overall GPA based on user input
function calculateGPA() {
    const name = document.getElementById("name").value;
    const numCourses = parseInt(document.getElementById("numCourses").value);

    let totalCredits = 0;
    let totalUnweightedGradePoints = 0;
    let totalWeightedGradePoints = 0;

    // Iterate through each course to calculate GPA
    for (let i = 1; i <= numCourses; i++) {
        const percentageInput = document.getElementById(`grade${i}`);
        const courseType = document.getElementById(`courseType${i}`).value;

        // Get the percentage grade entered by the user
        const percentage = parseFloat(percentageInput.value);

        // Validate the percentage input
        if (isNaN(percentage) || percentage < 0 || percentage > 100) {
            alert("Please enter a valid percentage between 0 and 100.");
            return;
        }

        // Calculate unweighted and weighted GPA scales for the course
        const { unweightedScale, weightedScale } = calculateScale(percentage, courseType);

        // Update total credits and grade points
        totalCredits += 1;
        totalUnweightedGradePoints += unweightedScale;
        totalWeightedGradePoints += weightedScale;
    }

    // Calculate overall unweighted and weighted GPAs
    const unweightedGPA = totalUnweightedGradePoints / totalCredits;
    const weightedGPA = totalWeightedGradePoints / totalCredits;

    // Display GPA results to the user
    document.getElementById("result").textContent = `Hello ${name}, Your GPA:`;
    document.getElementById("unweightedGPA").textContent = `Unweighted GPA: ${unweightedGPA.toFixed(2)}`;
    document.getElementById("weightedGPA").textContent = `Weighted GPA: ${weightedGPA.toFixed(2)}`;

    // Show Save Data button after calculating GPA
    document.getElementById("saveButton").style.display = "block";
}

// Function to reset the GPA calculator form
function resetForm() {
    // Reset form elements and GPA results
    document.getElementById("gpaForm").reset();
    document.getElementById("courses-container").innerHTML = '';
    document.getElementById("courses-container").style.height = "auto"; // Reset height
    document.getElementById("courses-container").style.overflow = "visible"; // Reset overflow
    document.getElementById("result").textContent = 'Your GPA: ';

    // Hide Calculate GPA and Save Data buttons after resetting
    document.getElementById("calculateButton").style.display = "none";
    document.getElementById("saveButton").style.display = "none";
}

// Placeholder function for potential download functionality
function downloadData() {
    // Implement the download functionality if needed
    // For example, you can export the data to a file
    console.log('Download function called');
}

// Function to save user data locally
function saveData() {
    // Create a data object to store user information
    const userData = {
        userName: document.getElementById("name").value,
        courses: [],
        timestamp: new Date().toISOString(),
    };

    // Get the number of courses entered by the user
    const numCourses = parseInt(document.getElementById("numCourses").value);

    // Iterate through each course to save course data
    for (let i = 1; i <= numCourses; i++) {
        const courseData = {
            courseName: document.getElementById(`courseName${i}`).value,
            gradePercentage: parseFloat(document.getElementById(`grade${i}`).value),
            courseType: document.getElementById(`courseType${i}`).value,
        };

        // Add course data to the user's courses array
        userData.courses.push(courseData);
    }

    // Convert user data to JSON format and store in localStorage
    const dataJson = JSON.stringify(userData, null, 2);
    localStorage.setItem('userData', dataJson);
    alert('Data saved successfully!');
}