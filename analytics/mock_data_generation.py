import random
import pandas as pd
import numpy as np

# Define the value database with weights (weights representing a normal-like distribution)
value_database = {
    'ROLE': (['admin', 'learner'], [0.2, 0.8]),
    'AGE_TYPE': (['Baby Boomers (55-75)', 'Generation X (40-55)', 'Millennials (25-40)', 'Generation Z (18-24)'], 
                 [0.1, 0.4, 0.4, 0.1]),
    'GENDER_TYPE': (['Male', 'Female', 'Other'], [0.45, 0.45, 0.1]),
    'RACE_TYPE': (['Caucasian', 'African American', 'Asian', 'Hispanic/Latino', 'Other'], 
                  [0.4, 0.2, 0.2, 0.1, 0.1]),
    'JOB_CATEGORY_TYPE': (['Entry-level', 'Mid-level', 'Senior-level', 'Executive'], 
                          [0.5, 0.3, 0.15, 0.05]),
    'LIFE_STAGE_TYPE': (['Early career', 'Mid-career', 'Late career', 'Retirement'], 
                        [0.4, 0.4, 0.15, 0.05]),
    'CAREER_STAGE_TYPE': (['starter', 'Builder', 'Accelerator', 'Expert'], 
                          [0.4, 0.3, 0.2, 0.1]),
    'SPECIAL_NEEDS_TYPE': (['None', 'Physical', 'Mental', 'Other'], 
                           [0.7, 0.1, 0.1, 0.1]),
    'EDUCATIONAL_LEVEL_TYPE': (['High school or below', 'Some college', 'Bachelor\'s degree', 'Master\'s degree', 'Doctoral degree'], 
                               [0.1, 0.3, 0.4, 0.15, 0.05]),
    'LANGUAGE_ABILITIES_TYPE': (['Fluent', 'Proficient', 'Basic', 'None'], 
                                [0.5, 0.3, 0.15, 0.05]),
    'LITERACY_NUMERACY_PROFICIENCY_TYPE': (['Advanced', 'Intermediate', 'Basic', 'None'], 
                                           [0.3, 0.4, 0.2, 0.1]),
    'LEARNING_PREFERENCES_TYPE': (['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing'], 
                                  [0.25, 0.25, 0.25, 0.25]),
    'PRIOR_KNOWLEDGE_SKILLS_TYPE': (['Advanced', 'Intermediate', 'Basic', 'None'], 
                                    [0.2, 0.5, 0.2, 0.1]),
    'RELATIONSHIP_TO_PEERS_TYPE': (['Collaborative', 'Competitive', 'Supportive', 'Independent'], 
                                   [0.35, 0.2, 0.3, 0.15]),
    'TENDENCY_TO_COMPETE_OR_COOPERATE_TYPE': (['Competitive', 'Cooperative', 'Both', 'Neither'], 
                                              [0.25, 0.25, 0.4, 0.1]),
    'SOCIAL_BACKGROUND_TYPE': (['Urban', 'Suburban', 'Rural'], 
                               [0.4, 0.4, 0.2]),
    'COMPUTER_LITERACY_TYPE': (['Advanced', 'Intermediate', 'Basic', 'None'], 
                               [0.4, 0.4, 0.15, 0.05]),
    'ATTITUDE_TOWARDS_LEARNING_TYPE': (['Positive', 'Neutral', 'Negative'], 
                                       [0.6, 0.3, 0.1]),
    'MOTIVATIONAL_LEVEL_TYPE': (['High', 'Medium', 'Low'], 
                                [0.5, 0.4, 0.1]),
    'BARRIERS_TO_LEARNING_INTERESTS': (['Time', 'Resources', 'Accessibility', 'Interest'], 
                                       [0.3, 0.25, 0.25, 0.2]),
    'PERSONALITY_TYPE': (['Extroverted', 'Introverted', 'Ambivert'], 
                         [0.4, 0.4, 0.2]),
    'REASONS_FOR_ATTENDING_COURSE_TYPE': (['Career advancement', 'Skill development', 'Personal interest', 'Requirement'], 
                                          [0.35, 0.35, 0.2, 0.1])
}

# Function to generate a random user based on weighted choices
def generate_random_user():
    user = {key: random.choices(value_database[key][0], weights=value_database[key][1])[0] for key in value_database}
    return user

# Generate 1000 users
users = [generate_random_user() for _ in range(1000)]

# Convert the list of users into a pandas DataFrame
df = pd.DataFrame(users)

# Save the DataFrame to a CSV file
file_path = 'random_users_weighted.csv'
df.to_csv(file_path, index=False)

# Acknowledge the user that the CSV file has been saved
print(f"CSV file saved at: {file_path}")