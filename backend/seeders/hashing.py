import csv
import hashlib

input_file = "unHashednewOne.csv"
output_file = "newOne.csv"

with open(input_file, newline='') as infile, open(output_file, 'w', newline='') as outfile:
    reader = csv.DictReader(infile)
    writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames)
    writer.writeheader()
    for row in reader:
        row['Name'] = hashlib.sha256(row['Name'].strip().lower().encode()).hexdigest()[:16]
        writer.writerow(row)

print(f"Done! Saved to {output_file}")