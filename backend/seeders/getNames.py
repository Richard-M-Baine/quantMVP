import pandas as pd

def split_and_save_names(input_csv_path, output_csv_path):
    """
    Reads a CSV file with a 'Name' column, splits the names into first,
    middle, and last, and saves the result to a new CSV file.

    Args:
        input_csv_path (str): The file path of the input CSV.
        output_csv_path (str): The file path where the new CSV will be saved.
    """
    
    # Define a helper function to split the name
    def split_name(name):
        parts = str(name).split()
        if len(parts) == 2:
            return parts[0], None, parts[1]
        elif len(parts) >= 3:
            return parts[0], " ".join(parts[1:-1]), parts[-1]
        else:
            return None, None, None

    try:
        # Read the original CSV file
        df = pd.read_csv(input_csv_path)

        # Check if the 'Name' column exists
        if 'Name' not in df.columns:
            print("Error: The CSV file does not contain a 'Name' column.")
            return

        # Apply the split function to the 'Name' column and create new columns
        df[['FirstName', 'MiddleName', 'LastName']] = df['Name'].apply(
            lambda x: pd.Series(split_name(x))
        )

        # Select only the new name columns
        new_df = df[['FirstName', 'MiddleName', 'LastName']]

        # Save the new DataFrame to a new CSV file
        new_df.to_csv(output_csv_path, index=False)
        
        print(f"Successfully processed '{input_csv_path}' and saved the results to '{output_csv_path}'.")

    except FileNotFoundError:
        print(f"Error: The file '{input_csv_path}' was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage:
# Replace 'your_original_file.csv' and 'your_new_file.csv' with your actual file names
split_and_save_names('nationTwo.csv', 'justNames.csv')