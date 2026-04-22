import pdfplumber
import pytesseract
from PIL import Image

def extract_text_from_pdf(file_path: str):
    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text
            else:# 🔥 OCR fallback
                img = page.to_image(resolution=300).original
                text += pytesseract.image_to_string(img)

    return text