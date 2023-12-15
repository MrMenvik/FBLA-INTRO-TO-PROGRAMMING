print("-" * 60)
print("Welcome to GPA Calculator")
print("-" * 60)

def get_course_input():
    while True:
        try:
            course_amount = int(input("How many courses have you taken? (1-36): "))
            print()
            if 1 <= course_amount <= 36:
                return course_amount
            else:
                print("Please enter a number between 1 and 36.")
        except ValueError:
            print("Please type in a number!")

def gpa_inputs(course_input):
    counter = 0
    ordinals = [
        "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth",
        "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth",
        "eighteenth", "nineteenth", "twentieth", "twenty-first", "twenty-second", "twenty-third",
        "twenty-fourth", "twenty-fifth", "twenty-sixth", "twenty-seventh", "twenty-eighth", "twenty-ninth",
        "thirtieth", "thirty-first", "thirty-second", "thirty-third", "thirty-fourth", "thirty-fifth",
        "thirty-sixth"
    ]
    courses = []  # List to store course data as individual dictionaries
    while counter != course_input:
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
            if course_type not in ["regular", "honors", "ap", "dual enrollment"]:
                print("Please enter a valid course type")
                course_type = None
        
        # Store data for each course as a dictionary and append it to the list
        course_data = {
            "Course Name": course_name,
            "Grade": grade,
            "Course Type": course_type
        }
        courses.append(course_data)
        print()
        counter += 1
    return courses

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
        # If grade is below 60, no points are added (considered as failing)
    unweighted_gpa = total_points / total_courses
    return unweighted_gpa

def calculate_weighted_gpa(courses):
    total_points = 0
    total_courses = len(courses)
    for course in courses:
        grade = course["Grade"]
        course_distinction = course["Course Type"].lower()  # Convert course type to lowercase for comparison
        if course_distinction in ["honors", "ap", "dual enrollment", "honor", "de", "dualenrollment", "h"]:
            total_points += 1
        if 100 >= grade >= 90:
            total_points += 4.0
        elif 89 >= grade >= 80:
            total_points += 3.0
        elif 79 >= grade >= 70:
            total_points += 2.0
        elif 69 >= grade >= 60:
            total_points += 1.0
        # If grade is below 60, no points are added (considered as failing)
    weighted_gpa = total_points / total_courses
    return weighted_gpa

course_input = get_course_input()
course_data = gpa_inputs(course_input)  # Pass course_input
print("-" * 60)

unweighted_gpa = calculate_unweighted_gpa(course_data)
weighted_gpa = calculate_weighted_gpa(course_data)
print(f"Your unweighted GPA is: {unweighted_gpa:.2f}")
print(f"Your weighted GPA is: {weighted_gpa:.2f}")
print("-" * 60)