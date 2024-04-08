import pdfplumber
import re
import csv
import logging

# Setting up detailed logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def extract_text_from_pdf(pdf_path):
    logging.info(f"Starting text extraction from PDF: {pdf_path}")
    text_content = []
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            text = page.extract_text()
            logging.info(f"Extracted text from Page {page_num}")
            text_content.append(text)
    logging.info("Completed text extraction from PDF")
    return text_content

def parse_and_log_records(text_content):
    logging.info("Starting parsing of text content and immediate logging of records")
    name_pattern = re.compile(r'Name: ([\w\s]+)')

    for page_num, page_text in enumerate(text_content, start=1):
        if not page_text:
            logging.warning(f"No text found on Page {page_num}")
            continue

        logging.info(f"Processing Page {page_num}")
        for line in page_text.split('\n'):
            name_match = name_pattern.search(line)
            if name_match:
                name = name_match.group(1).strip()
                logging.info(f"Found Name: {name}")

                # Immediate logging of related materials/details for the name
                # Here you can include logic to extract and log additional details related to the name
                # For example:
                # detail_match = re.search(r'Detail Pattern', line)
                # if detail_match:
                #     detail = detail_match.group(1).strip()
                #     logging.info(f"Related detail for {name}: {detail}")

    logging.info("Completed parsing and logging of text content")

def write_records_to_csv(records, csv_file_path):
    # This function remains as a placeholder for when you're ready to compile and write records to CSV
    pass

def main(pdf_path, csv_file_path):
    text_content = extract_text_from_pdf(pdf_path)
    parse_and_log_records(text_content)
    # Call write_records_to_csv when ready to compile and write records

pdf_path = 'BOND.pdf'
csv_file_path = 'output.csv'

main(pdf_path, csv_file_path)
