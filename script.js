function calculateGPA() {
    const name = document.getElementById("name").value;
    const numCourses = parseInt(document.getElementById("numCourses").value);

    let coursesHtml = "";
    for (let i = 1; i <= numCourses; i++) {
        coursesHtml += `
            <div class="course-container">
                <label for="courseName${i}">Course ${i} Name:</label>
                <input type="text" id="courseName${i}" placeholder="Enter course name">

                <label for="grade${i}">Grade in Numbers:</label>
                <input type="number" id="grade${i}" placeholder="Enter grade">

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

    // Additional logic for calculating GPA based on the entered courses can be added here
}
