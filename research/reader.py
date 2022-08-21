from PyPDF2 import PdfReader

class Book:
    def __init__(self,book_loc:str):
        self.reader =PdfReader(book_loc)
        self.text = ""
        self.get_text_()

    def get_text_(self):
        for page in reader.pages:
            self.text += page.extract_text() + "\n"
    




