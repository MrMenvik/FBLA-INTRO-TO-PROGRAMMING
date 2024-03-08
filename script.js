// Variable to store the number of years
let numYears = 0;

// Function to create the GPA calculation table
function createTable() {
 // Parse the input value to get the number of years
 numYears = parseInt(document.getElementById('numYears').value);

 // Check if the input is a valid number
 if (isNaN(numYears) || numYears < 1) {
   alert('Please enter a valid number of years.');
   return;
 }

 // Variable to store the HTML content for the table
 let tableHTML = '';

 for (let year = 1; year <= numYears; year++) {
   tableHTML += `<h2>Year ${year}</h2>`;
   tableHTML += '<table>';
   tableHTML += '<tr>';
   tableHTML += '<th class="tooltip" data-tooltip="Semester">Semester</th>';
   tableHTML += '<th class="tooltip" data-tooltip="Enter the number of classes you are taking here."># of Classes</th>';
   tableHTML += '<th class="tooltip" data-tooltip="Enter the name of the Course/Class you are taking here.">Course Name</th>';
   tableHTML += '<th class="tooltip" data-tooltip="Enter the percent grade you got in the class.">Grade</th>';
   tableHTML += '<th class="tooltipap" data-tooltip="Check the box if your class was Honors/AP.">Honors/AP</th>';
   tableHTML += '</tr>';

   // Loop to create rows for each semester
   for (let semester = 1; semester <= 2; semester++) {
     tableHTML += `<tr data-year="${year}" data-semester="${semester}">`;
     tableHTML += `<td>${semester} Semester</td>`;
     tableHTML += `<td><input type="number" class="numClasses" min="1"></td>`;
     tableHTML += `<td id="courseName_${year}_${semester}"></td>`;
     tableHTML += `<td id="grade_${year}_${semester}"></td>`;
     tableHTML += `<td id="isHonors_${year}_${semester}"></td>`;
     tableHTML += '</tr>';
   }

   tableHTML += '</table>';
 }

 // Get the table container element
 const tableContainer = document.getElementById('tableContainer');

 // Set the table HTML content
 tableContainer.innerHTML = tableHTML;

 // Triggering reflow to apply transition
 tableContainer.offsetHeight;

 // Set the opacity to make the table visible with transition effect
 tableContainer.style.opacity = 1;

 // Attach event listeners and update GPA
 attachEventListeners();
 updateGPA();
}

// Function to attach event listeners
function attachEventListeners() {
 // Get all inputs with class 'numClasses' and attach input event listener
 const numClassesInputs = document.querySelectorAll('.numClasses');
 numClassesInputs.forEach(input => {
   input.addEventListener('input', createClassRows);
   input.addEventListener('input', saveDataLocally);
 });

 // Get all inputs with id starting with 'courseName_' and attach input event listener
 const courseNameInputs = document.querySelectorAll('[id^="courseName_"]');
 courseNameInputs.forEach(input => {
   input.addEventListener('input', updateGPA);
   input.addEventListener('input', saveDataLocally);
 });

 // Get all inputs with id starting with 'grade_' and attach input event listener
 const gradeInputs = document.querySelectorAll('[id^="grade_"]');
 gradeInputs.forEach(input => {
   input.addEventListener('input', updateGPA);
   input.addEventListener('input', saveDataLocally);
 });

 // Get all inputs with id starting with 'isHonors_' and attach input event listener
 const honorsInputs = document.querySelectorAll('[id^="isHonors_"]');
 honorsInputs.forEach(input => {
   input.addEventListener('input', updateGPA);
   input.addEventListener('input', saveDataLocally);
 });
}

// Function to dynamically create rows based on the number of classes
function createClassRows(event) {
 const numClasses = parseInt(event.target.value);
 const year = event.target.closest('tr').dataset.year;
 const semester = event.target.closest('tr').dataset.semester;

 let courseNameHTML = '';
 let gradeHTML = '';
 let isHonorsHTML = '';

 // Loop to generate input fields for each class
 for (let i = 1 ; i <= numClasses; i++) {
   courseNameHTML += `<input type="text" id="courseName_${year}_${semester}_${i}" placeholder="Course Name"><br>`;
   gradeHTML += `<input type="number" id="grade_${year}_${semester}_${i}" min="0" max="100" placeholder="Grade"><br>`;
   isHonorsHTML += `<input type="checkbox" id="isHonors_${year}_${semester}_${i}"> Honors/AP<br>`;
 }

 // Set the inner HTML of corresponding elements
 document.getElementById(`courseName_${year}_${semester}`).innerHTML = courseNameHTML;
 document.getElementById(`grade_${year}_${semester}`).innerHTML = gradeHTML;
 document.getElementById(`isHonors_${year}_${semester}`).innerHTML = isHonorsHTML;
 updateGPA();
}

// Function to update GPA based on user input
function updateGPA() {
 const resultContainer = document.getElementById('result');
 let totalPoints = 0;
 let totalCredits = 0;
 let totalHonorsCredits = 0;

 // Nested loops to iterate through each year and semester
 for (let year = 1; year <= numYears; year++) {
   for (let semester = 1; semester <= 2; semester++) {
     const numClasses = parseInt(document.querySelector(`[data-year="${year}"][data-semester="${semester}"] .numClasses`).value);

     // Loop to iterate through each class in a semester
     for (let i = 1; i <= numClasses; i++) {
       const grade = parseFloat(document.querySelector(`#grade_${year}_${semester}_${i}`).value);
       const isHonors = document.querySelector(`#isHonors_${year}_${semester}_${i}`).checked;

       let gpa;

       // Calculate GPA based on grade and honors status
       switch (true) {
         case (grade >= 90):
           gpa = isHonors ? 5.0 : 4.0;
           break;
         case (grade >= 80):
           gpa = isHonors ? 4.0 : 3.0;
           break;
         case (grade >= 70):
           gpa = isHonors ? 3.0 : 2.0;
           break;
         case (grade >= 60):
           gpa = isHonors ? 2.0 : 1.0;
           break;
         default:
           gpa = 0.0;
       }

       // Update total points, credits, and honors credits
       totalPoints += gpa;
       totalCredits += 1;

       if (isHonors) {
         totalHonorsCredits += 1;
       }
     }
   }
 }

 // Calculate unweighted and weighted GPA
 const unweightedGPA = totalPoints / totalCredits - totalHonorsCredits / totalCredits;
 const weightedGPA = unweightedGPA + totalHonorsCredits / totalCredits;

 // Display GPA in the result container
 let color;
 if (unweightedGPA >= 3.0) {
   color = 'green';
 } else if (unweightedGPA >= 2.0) {
   color = 'orange';
 } else if (unweightedGPA >= 1.0) {
   color = 'red';
 } else {
   color = '#8B0000';
 }

 // Display GPA in the result container with color
 resultContainer.innerHTML = `
   Unweighted GPA: <span style="color: ${color};">${unweightedGPA.toFixed(2)}</span><br>
   Weighted GPA: <span style="color: ${color};">${weightedGPA.toFixed(2)}</span>
 `;
}

// Function to save GPA data locally
function saveDataLocally() {
 const data = [];

 // Loop to gather data for each year and semester
 for (let year = 1; year <= numYears; year++) {
   for (let semester = 1; semester <= 2; semester++) {
     const numClasses = parseInt(document.querySelector(`[data-year="${year}"][data-semester="${semester}"] .numClasses`).value);

     data.push({ year, semester, numClasses });

     // Loop to gather data for each class
     for (let i = 1; i <= numClasses; i++) {
       const courseName = document.querySelector(`#courseName_${year}_${semester}_${i}`).value;
       const grade = document.querySelector(`#grade_${year}_${semester}_${i}`).value;
       const isHonors = document.querySelector(`#isHonors_${year}_${semester}_${i}`).checked;

       data.push({ year, semester, courseName, grade, isHonors, num: i });
     }
   }
 }

 // Save data to local storage as a JSON string
 localStorage.setItem('gpaData', JSON.stringify({ numYears, data }));
}

// Function to load saved GPA data
function loadSavedData() {
  // Retrieve saved GPA data from local storage
  const savedData = JSON.parse(localStorage.getItem('gpaData'));

  // Display an alert if no saved GPA data is found
  if (!savedData) {
      alert('No saved GPA data found.');
  } else {
      // Update the number of years input and create the table structure
      numYears = savedData.numYears;
      document.getElementById('numYears').value = numYears;
      createTable();

      // Loop to populate input fields with saved data
      savedData.data.forEach((entry) => {
          if (entry.numClasses) {
              document.querySelector(`[data-year="${entry.year}"][data-semester="${entry.semester}"] .numClasses`).value = entry.numClasses;
              createClassRows({ target: document.querySelector(`[data-year="${entry.year}"][data-semester="${entry.semester}"] .numClasses`) });
          } else {
              const courseName = document.querySelector(`#courseName_${entry.year}_${entry.semester}_${entry.num}`);
              const grade = document.querySelector(`#grade_${entry.year}_${entry.semester}_${entry.num}`);
              const isHonors = document.querySelector(`#isHonors_${entry.year}_${entry.semester}_${entry.num}`);

              if (courseName && grade && isHonors) {
                  courseName.value = entry.courseName;
                  grade.value = entry.grade;
                  isHonors.checked = entry.isHonors;
              }
          }
      });

      // Update GPA based on loaded data
      updateGPA();
  }

  // Load saved chart data from localStorage
  const savedChartData = JSON.parse(localStorage.getItem('gpaChartData'));

  // Check if there is saved chart data
  if (savedChartData) {
      gpaChartData = savedChartData;

      // Render the chart with the loaded data
      const ctx = document.getElementById('gpaChart').getContext('2d');
      if (gpaChart) {
          gpaChart.destroy(); // Destroy the existing chart instance before creating a new one
      }
      gpaChart = new Chart(ctx, {
          type: 'line',
          data: gpaChartData,
          options: {
              scales: {
                  y: {
                      beginAtZero: true,
                      suggestedMax: 5, // Suggested max value to accommodate weighted GPA
                  }
              },
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                  legend: {
                      display: true,
                  }
              }
          }
      });
  }
}

// Function to clear locally saved GPA data
function clearData() {
  // Remove saved GPA data from localStorage
  localStorage.removeItem('gpaData');
  
  // Clear the GPA calculation results and the table container from the UI
  document.getElementById('tableContainer').innerHTML = '';
  document.getElementById('result').textContent = '';

  // Remove saved chart data from localStorage
  localStorage.removeItem('gpaChartData');

  // Optionally, if you wish to remove the chart visually as well, you can do so by checking if the chart exists and then destroying it
  if (gpaChart) {
      gpaChart.destroy();
      gpaChart = null; // Reset the chart variable to ensure you can create a new chart later without issues
  }
}

// Function to navigate to the FAQ page
function goToFAQ() {
 window.location.href = 'faq.html';
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedData();
});

let gpaChartData = {
 labels: [],
 datasets: [
   {
     label: 'Unweighted GPA',
     data: [],
     fill: false,
     borderColor: 'rgb(75, 192, 192)',
     tension: 0.1,
     pointRadius: 5, // Add pointRadius property
     hitRadius: 5, // Add hitRadius property
     pointBackgroundColor: 'rgb(75, 192, 192)', // Optional: Set the color of the points
     pointHoverRadius: 7, // Optional: Set the hover radius of the points
     pointHoverBackgroundColor: 'rgb(75, 192, 192)', // Optional: Set the hover color of the points
   },
   {
     label: 'Weighted GPA',
     data: [],
     fill: false,
     borderColor: 'rgb(255, 99, 132)',
     tension: 0.1,
     pointRadius: 5, // Add pointRadius property
     hitRadius: 5, // Add hitRadius property
     pointBackgroundColor: 'rgb(255, 99, 132)', // Optional: Set the color of the points
     pointHoverRadius: 7, // Optional: Set the hover radius of the points
     pointHoverBackgroundColor: 'rgb(255, 99, 132)', // Optional: Set the hover color of the points
   }
 ]
};

let gpaChart;

function addToPlot() {
  // Retrieve GPA values
  const unweightedGPA = parseFloat(document.querySelector('#result span:first-child').textContent);
  const weightedGPA = parseFloat(document.querySelector('#result span:last-child').textContent);

  // Check if the GPAs are valid numbers
  if (!isNaN(unweightedGPA) && !isNaN(weightedGPA)) {
      const currentDate = new Date();
      const label = currentDate.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

      // Update chart data
      gpaChartData.labels.push(label);
      gpaChartData.datasets[0].data.push(unweightedGPA);
      gpaChartData.datasets[1].data.push(weightedGPA);

      // Check if the chart has already been created
      if (gpaChart) {
          // If the chart exists, update it with the new data
          gpaChart.update();
      } else {
          // If the chart hasn't been created, initialize it with the current data
          const ctx = document.getElementById('gpaChart').getContext('2d');
          gpaChart = new Chart(ctx, {
              type: 'line',
              data: gpaChartData,
              options: {
                  scales: {
                      y: {
                          beginAtZero: true,
                          suggestedMax: 5, // Suggested max value to accommodate weighted GPA
                      }
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                      legend: {
                          display: true,
                      }
                  }
              }
          });
      }

      // Save the updated chart data to localStorage
      localStorage.setItem('gpaChartData', JSON.stringify(gpaChartData));
  } else {
      alert('Invalid GPA values. Please ensure all grades are entered correctly.');
  }
}