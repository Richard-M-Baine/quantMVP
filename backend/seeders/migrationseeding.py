import pandas as pd
import sqlite3

DB_PATH = "../myapp.db"

def import_csv_to_sqlite(csv_file, table_name, encoding="utf-8", clean=True):
    df = pd.read_csv(csv_file, encoding=encoding)

    if clean:
        df.columns = df.columns.str.strip()
        df = df.map(lambda x: x.strip() if isinstance(x, str) else x)

    with sqlite3.connect(DB_PATH) as conn:

        if table_name == "JudgeCrimes":
            # Load Judges table into memory
            judges_df = pd.read_sql(
                "SELECT id, Judge, County FROM Judges",
                conn
            )

            # Normalize keys
            df["Judge"] = df["Judge"].str.strip().str.upper()
            df["County"] = df["County"].str.strip().str.upper()

            judges_df["Judge"] = judges_df["Judge"].str.strip().str.upper()
            judges_df["County"] = judges_df["County"].str.strip().str.upper()

            # Merge JudgeCrimes data with Judges table
            merged = df.merge(
                judges_df,
                how="left",
                on=["Judge", "County"]
            )

            matched = merged[merged["id"].notnull()].copy()
            unmatched = merged[merged["id"].isnull()].copy()

            if not unmatched.empty:
                print("⚠️ WARNING: Some JudgeCrimes rows could not be matched to Judges table!")
                print(unmatched[["Judge", "County"]].drop_duplicates())

            matched = matched.rename(columns={"id": "JudgeId"})
            matched = matched[df.columns.tolist() + ["JudgeId"]]

            matched.to_sql(
                table_name,
                conn,
                if_exists="append",
                index=False
            )

        elif table_name == "CrimeData":
            # Load TotalCrimes table
            total_crimes = pd.read_sql(
                "SELECT id, Offense FROM TotalCrimes",
                conn
            )

            # Normalize Offense values
            df["Offense"] = df["Offense"].str.strip().str.upper()
            total_crimes["Offense"] = total_crimes["Offense"].str.strip().str.upper()

            # Merge CrimeData with TotalCrimes
            merged = df.merge(
                total_crimes,
                how="left",
                on="Offense"
            )

            matched = merged[merged["id"].notnull()].copy()
            unmatched = merged[merged["id"].isnull()].copy()

            if not unmatched.empty:
                print("⚠️ WARNING: Some CrimeData rows could not be matched to TotalCrimes!")
                print(unmatched["Offense"].drop_duplicates())

            matched = matched.rename(columns={"id": "totalCrimeId"})
            matched = matched[df.columns.tolist() + ["totalCrimeId"]]

            matched.to_sql(
                table_name,
                conn,
                if_exists="append",
                index=False
            )

        else:
            df.to_sql(
                table_name,
                conn,
                if_exists="append",
                index=False
            )

    print(f"{table_name} clear ✅")


# Import all datasets
import_csv_to_sqlite("newOne.csv", "Things")
import_csv_to_sqlite("totalCrime.csv", "TotalCrimes")
import_csv_to_sqlite("judgeList.csv", "Judges")
import_csv_to_sqlite("judgeCrimes.csv", "JudgeCrimes")
import_csv_to_sqlite("countyCrimes.csv", "CountyCrimes")
import_csv_to_sqlite("textcsv.csv", "Kettlehundes", encoding="cp1252")
import_csv_to_sqlite("nationWideOne.csv", "nationOnes", encoding="cp1252")
import_csv_to_sqlite("nationTwo.csv", "TwoNations", encoding="cp1252")
import_csv_to_sqlite("offense_counts.csv", "CrimeData")