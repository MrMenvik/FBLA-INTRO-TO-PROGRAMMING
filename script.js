let unweightedGPA = 0;
let weightedGPA = 0;

function calculateGPA() {
    const name = document.getElementById("name").value;
    const numCourses = parseInt(document.getElementById("numCourses").value);

    unweightedGPA = 0;
    weightedGPA = 0;

    for (let i = 1; i <= numCourses; i++) {
        const courseName = document.getElementById(`courseName${i}`).value;
        const percentageInput = document.getElementById(`grade${i}`);
        const courseType = document.getElementById(`courseType${i}`).value;

        const percentage = parseFloat(percentageInput.value);
        if (isNaN(percentage) || percentage < 0 || percentage > 100) {
            alert("Please enter a valid percentage between 0 and 100.");
            return;
        }

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

        unweightedGPA += scale;
        weightedGPA += scale * 0.1; // Adjust the weight factor as needed
    }

    const totalCredits = numCourses;
    const unweightedResult = unweightedGPA / totalCredits;
    const weightedResult = weightedGPA / totalCredits;

    document.getElementById("result").textContent = `Hello ${name}, Your GPA: ${unweightedResult.toFixed(2)}`;
    document.getElementById("unweightedGPA").textContent = `Unweighted GPA: ${unweightedResult.toFixed(2)}`;
    document.getElementById("weightedGPA").textContent = `Weighted GPA: ${weightedResult.toFixed(2)}`;
}

function saveToDatabase() {
    const dataToSave = {
        name: document.getElementById("name").value,
        unweightedGPA: unweightedGPA.toFixed(2),
        weightedGPA: weightedGPA.toFixed(2),
    };

    fetch('/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data saved:', data);
    })
    .catch(error => {
        console.error('Error saving data:', error);
    });
}
