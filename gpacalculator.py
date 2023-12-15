import json
from pymongo import MongoClient

# Display welcome message
print("-" * 60)
print("Welcome to GPA Calculator")
print("-" * 60)
print("Here is the grading scale you get your GPA from: ")
print("")
print("| Grade | Honor Points | Grade | Grade Points |")
print("|-------|--------------|-------|--------------|")
print("| A     | 5            | A     | 4            |")
print("| B     | 4            | B     | 3            |")
print("| C     | 3            | C     | 2            |")
print("| D     | 1            | D     | 1            |")
print("| F     | 0            | F     | 0            |")
print("-" * 60)

# Function to get the user's name
def get_user_name():
    return input("Please enter your name: ")

# Function to get the number of courses taken
def get_number_of_courses():
    while True:
        try:
            # Ask user for the number of courses
            num_courses = int(input("How many courses have you taken? (1-36): "))
            print()
            if 1 <= num_courses <= 36:
                return num_courses
            else:
                print("Please enter a number between 1 and 36.")
        except ValueError:
            print("Please type in a number!")

# Function to gather course information
def collect_course_data(num_courses):
    counter = 0
    ordinals = [
        "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth",
        "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth",
        "eighteenth", "nineteenth", "twentieth", "twenty-first", "twenty-second", "twenty-third",
        "twenty-fourth", "twenty-fifth", "twenty-sixth", "twenty-seventh", "twenty-eighth", "twenty-ninth",
        "thirtieth", "thirty-first", "thirty-second", "thirty-third", "thirty-fourth", "thirty-fifth",
        "thirty-sixth"
    ]
    courses = []  
    while counter != num_courses:
        course_name = input(f"What was the name of your {ordinals[counter]} course?: ")
        grade = None
        while grade is None:
            try:
                grade = int(input(f"What was your grade in the {ordinals[counter]} course?: "))
                if not 0 <= grade <= 100:
                    print("Please enter a valid grade between 0 and 100.")
                    grade = None
            except ValueError:
                print("Please type in a number!")

        course_type = None
        while course_type is None:
            course_type = input("Regular, Honors, AP/Dual Enrollment?: ").lower()
            if course_type not in ["regular", "honors", "ap", "dual enrollment", "reg", "r", "h", "de"]:
                print("Please enter a valid course type (Regular, Honors, AP, Dual Enrollment)")
                course_type = None
        
        course_info = {
            "Course Name": course_name,
            "Grade": grade,
            "Course Type": course_type
        }
        courses.append(course_info)
        print()
        counter += 1
    return courses

# Calculate unweighted GPA
def calculate_unweighted_gpa(courses):
    total_points = 0
    total_courses = len(courses)
    for course in courses:
        grade = course["Grade"]
        if 100 >= grade >= 90:
            total_points += 4.0
        elif 89 >= grade >= 80:
            total_points += 3.0
        elif 79 >= grade >= 70:
            total_points += 2.0
        elif 69 >= grade >= 60:
            total_points += 1.0
    unweighted_gpa = total_points / total_courses
    return unweighted_gpa

# Calculate weighted GPA
def calculate_weighted_gpa(courses):
    total_points = 0
    total_courses = len(courses)
    for course in courses:
        grade = course["Grade"]
        course_type = course.get("Course Type", "").lower()
        if course_type in ["honors", "ap", "dual enrollment", "honor", "de", "dualenrollment", "h"]:
            total_points += 1
        if 100 >= grade >= 90:
            total_points += 4.0
        elif 89 >= grade >= 80:
            total_points += 3.0
        elif 79 >= grade >= 70:
            total_points += 2.0
        elif 69 >= grade >= 60:
            total_points += 1.0
    weighted_gpa = total_points / total_courses
    return weighted_gpa

# Get user's name
user_name = get_user_name()

# Get the number of courses
num_courses = get_number_of_courses()
# Collect course information based on user input
course_data = collect_course_data(num_courses)

# Display GPA results
print("-" * 60)
unweighted_gpa = calculate_unweighted_gpa(course_data)
weighted_gpa = calculate_weighted_gpa(course_data)
print(f"Hi {user_name}!")
print("Here's your GPA information:")
print("Unweighted GPA: {:.2f}".format(unweighted_gpa))
print("Weighted GPA: {:.2f}".format(weighted_gpa))
print("-" * 60)

# Save user-specific data to MongoDB
def save_to_mongodb(data):
    try:
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017')
        db = client['gpa_data']
        collection = db['user_data']
        
        # Insert the data into MongoDB
        collection.insert_one(data)
        print("Data uploaded to MongoDB successfully!")
        print("Thanks for using GPA Calculator")
    except Exception as e:
        print("Error while uploading data to MongoDB:", e)

# Save user-specific data to MongoDB if chosen
if input("Do you want to save your data to MongoDB? (yes/no): ").lower() == "yes":
    user_data = {
        "User": user_name,
        "Courses": course_data,
        "Unweighted GPA": unweighted_gpa,
        "Weighted GPA": weighted_gpa
    }
    save_to_mongodb(user_data)