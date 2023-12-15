# FBLA 2023-24 Intro to Programming Project by Maanvik Poddar

## Author Information

- **Name**: Maanvik Poddar
- **School**: Mountain Ridge High School
- **Grade Level**: 10th Grade

# GPA Calculator

Welcome to the GPA Calculator! This tool helps you calculate your GPA based on the courses you've taken.

## Features

- **User Input:** Collects user's name and course information to calculate GPA.
- **Unweighted GPA Calculation:** Calculates GPA based on a standard grading scale.
- **Weighted GPA Calculation:** Calculates GPA with consideration for course types (Regular, Honors, AP, etc.).
- **Data Storage:** Option to store user data in a MongoDB database.

## Requirements

- Python 3.x
- `pymongo` (if storing data in MongoDB)
- `mongodb` (if using MongoDB)
- `MySQL Connector` (if storing data in MySQL)

## Installation

1. Clone this repository:
git clone https://github.com/yourusername/gpa-calculator.git

2. Install the required Python packages:
pip install pymongo mysql-connector-python

## Configuration

- For MongoDB: Ensure MongoDB is running locally (`localhost:27017`).
- For MySQL: Update the MySQL credentials in the code before use.

## Usage

Run the script in your terminal:
python gpa_calculator.py

Follow the prompts and choose whether to save data to MongoDB.

## Contributions

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
