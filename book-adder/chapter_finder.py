import ebooklib
import fitz
import logging
import os
import re

from bs4 import BeautifulSoup, Tag
from datetime import datetime
from ebooklib import epub
from itertools import chain
from lxml import etree
from PyPDF2 import PdfReader
from utils import get_sections,flatten_xml

logging.basicConfig(level=logging.INFO)

class Book():
    def __init__(self, filename, nochapters=False, category=None):
        self.filename = filename
        self.file_ext = os.path.splitext(filename)[1]
        self.date_uploaded = datetime.today()
        self.created_at = datetime.today()
        self.updated_at = datetime.today()
        self.published = True
        self.nochapters = nochapters
        self.category = category
        if self.isEPUB:
            self.process_epub()
        elif self.isPDF:
            self.process_pdf()

    def process_epub(self):
        self.book_ = epub.read_epub(self.filename)
        
        # Ebooklib functions
        self.identifiers = self.book_.get_metadata("DC", "identifier")
        self.languages = self.book_.get_metadata("DC", "language")

        self.lines = -1 #Deal with this later
        self.title = self.book_.title
    
        self.getEpubChaptersAndContents()
        self.getEpubCoverImage()
        self.stats = self.getStats()

    def process_pdf(self):
        print("PDF in proccess!")
        self.contents = self.getContents()

    @property
    def isEPUB(self):
        return self.file_ext in [".EPUB",".epub"]
    
    @property
    def isPDF(self):
        return self.file_ext in [".PDF",".pdf"]

    def getEpubCoverImage(self):
        cover_image_item = self.book_.get_item_with_id('cover')
        
        if cover_image_item:
            cover_image_binary = cover_image_item.content
            self.cover_image = cover_image_binary

            print(">> Cover image extracted.")
        else:
            self.cover_image = None
            print(">> No cover image found in the EPUB file.")


    def getEpubChaptersAndContents(self):
        doc = fitz.open(self.filename)
        # toc = doc.get_toc()
        num_chapters = doc.chapter_count
        
        chapters = []
        chapters_text = []
        prev_page_no = 1
        page_counter = 1

        for i in range(num_chapters):
            chapter_page_count = doc.chapter_page_count(i)
            chapter_text = ""
            chapter_html = ""

            for j in range(chapter_page_count):
                page = doc.load_page((i, j))
                text_page = page.get_textpage()
                page_text = text_page.extractText()

                chapter_text += page_text
                chapter_html += text_page.extractHTML() + f"<div class='page-num'>{page_counter}</div>"

                if page_text != "":
                    page_counter += 1

            if chapter_text != "":
                current_page_no = prev_page_no + (chapter_page_count)
                page_num_text = f"{prev_page_no + 1}-{current_page_no}"

                if chapter_page_count == 1:
                    page_num_text = prev_page_no
                    prev_page_no -= 1
                prev_page_no += chapter_page_count

                chapters.append(f"Part {i} <span class='page-range'>p.{page_num_text}</span>")


                chapter_soup = BeautifulSoup(chapter_html, "html.parser")
                def handle_attributes(tag, index):
                    if isinstance(tag, Tag):
                        if tag.name == "script":
                            tag.decompose()
                        if tag.has_attr("style"):
                            del tag["style"]
                        if tag.has_attr("id") and tag["id"] == "page0":
                            tag["id"] = f"page-{index}"
                            tag["class"] = "book-page"

                for index, tag in enumerate(chapter_soup):
                    handle_attributes(tag, index)

                chapters_text.append({
                    "html": chapter_soup, 
                    "raw": chapter_html,
                    "text-only": chapter_text
                    }
                )

        self.metadata = doc.metadata
        self.num_pages = doc.page_count
        # print("\n\nMETADATA:", self.metadata)
        # print("\nNUM PAGES:", self.num_pages)
        self.num_chapters = num_chapters
        self.chapters = chapters
        self.contents = chapters_text

    def getContents(self):
        """
        Reads the book into memory.
        """
        if self.isEPUB:
            text = []
            doc_items = self.book_.get_items_of_type(ebooklib.ITEM_DOCUMENT)
            print("\n\nENUMERATED:", enumerate(doc_items))
            for i, item in enumerate(doc_items):
                if isinstance(item, epub.EpubHtml):
                    html_string = BeautifulSoup(item.get_body_content(), "html.parser")
                    raw_string = item.get_body_content()
                    processed_string = ""
                    try:
                        processed_string = flatten_xml(raw_string)
                    except:
                        logging.error(f"The chapter couldn't be processed: {i}")
                    text.append({
                        "html": html_string.prettify(formatter="html"), 
                        "raw": raw_string,
                        "text-only": processed_string
                        }
                    )
            return text


        if self.isPDF:
            reader = PdfReader(self.filename)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            logging.error(text)
            return text

        else:
            with open(self.filename, errors='ignore') as f:
                contents = f.read()
            return contents

    def getLines(self):
        """
        Breaks the book into lines.
        """
        return self.contents.split('\n')

    def getHeadings(self):
        def get_nav_labels_text(chapter):
            soup = BeautifulSoup(chapter.get_content(), "xml")
            # print("\n\n\nPrettified soup:", soup.prettify())
            nav_labels_text = [nav_label.get_text() for nav_label in soup.find_all("navLabel")]
            return nav_labels_text

        print("\n\nEPUB:", self.book_)
        title = self.book_.get_metadata("DC", "title")
        navigation = self.book_.get_items_of_type(ebooklib.ITEM_NAVIGATION)

        print("\n\nMETADATA:", title) 

        print("\n\n\nEPUB DOCUMENT:", self.book_.get_items_of_type(ebooklib.ITEM_DOCUMENT))
        document = self.book_.get_items_of_type(ebooklib.ITEM_DOCUMENT)
        for doc in document:
            name = doc.get_name()
            print("\n\nDOC:", doc, "NAME:", name)
        for nav in navigation:
            # print("\n\nNAVIGATION:", nav.get_content())
            text = get_nav_labels_text(nav)
            print("\n\nNAVIGATION TEXT:", text)
            return text

    # def getHeadings(self,flattened=True):
    #     if self.isEPUB:
    #         return get_sections(self.book_.toc,flattened=flattened)
    #     elif self.isPDF:
    #         # Form 1: Chapter I, Chapter 1, Chapter the First, CHAPTER 1
    #         # Ways of enumerating chapters, e.g.
    #         arabicNumerals = '\d+'
    #         romanNumerals = '(?=[MDCLXVI])M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})'
    #         numberWordsByTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty',
    #                             'seventy', 'eighty', 'ninety']
    #         numberWords = ['one', 'two', 'three', 'four', 'five', 'six',
    #                     'seven', 'eight', 'nine', 'ten', 'eleven',
    #                     'twelve', 'thirteen', 'fourteen', 'fifteen',
    #                     'sixteen', 'seventeen', 'eighteen', 'nineteen'] + numberWordsByTens
    #         numberWordsPat = '(' + '|'.join(numberWords) + ')'
    #         ordinalNumberWordsByTens = ['twentieth', 'thirtieth', 'fortieth', 'fiftieth', 
    #                                     'sixtieth', 'seventieth', 'eightieth', 'ninetieth'] + \
    #                                     numberWordsByTens
    #         ordinalNumberWords = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 
    #                             'seventh', 'eighth', 'ninth', 'twelfth', 'last'] + \
    #                             [numberWord + 'th' for numberWord in numberWords] + ordinalNumberWordsByTens
    #         ordinalsPat = '(the )?(' + '|'.join(ordinalNumberWords) + ')'
    #         enumeratorsList = [arabicNumerals, romanNumerals, numberWordsPat, ordinalsPat] 
    #         enumerators = '(' + '|'.join(enumeratorsList) + ')'
    #         form1 = 'chapter ' + enumerators

    #         # Form 2: II. The Mail
    #         enumerators = romanNumerals
    #         separators = '(\. | )'
    #         titleCase = '[A-Z][a-z]'
    #         form2 = enumerators + separators + titleCase

    #         # Form 3: II. THE OPEN ROAD
    #         enumerators = romanNumerals
    #         separators = '(\. )'
    #         titleCase = '[A-Z][A-Z]'
    #         form3 = enumerators + separators + titleCase

    #         # Form 4: a number on its own, e.g. 8, VIII
    #         arabicNumerals = '^\d+\.?$'
    #         romanNumerals = '(?=[MDCLXVI])M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\.?$'
    #         enumeratorsList = [arabicNumerals, romanNumerals]
    #         enumerators = '(' + '|'.join(enumeratorsList) + ')'
    #         form4 = enumerators

    #         pat = re.compile(form1, re.IGNORECASE)
    #         # This one is case-sensitive.
    #         pat2 = re.compile('(%s|%s|%s)' % (form2, form3, form4))

    #         # TODO: can't use .index() since not all lines are unique.

    #         headings = []
    #         for i, line in enumerate(self.lines):
    #             if pat.match(line) is not None:
    #                 headings.append(i)
    #             if pat2.match(line) is not None:
    #                 headings.append(i)

    #         if len(headings) < 3:
    #             logging.info('Headings: %s' % headings)
    #             logging.error("Detected fewer than three chapters. This probably means there's something wrong with chapter detection for this book.")
    #             exit()

    #         self.endLocation = self.getEndLocation()

    #         # Treat the end location as a heading.
    #         headings.append(self.endLocation)

    #         return headings
    #     else:
    #         raise ValueError("The input is neither pdf nor epub.")

    def ignoreTOC(self):
        """
        Filters headings out that are too close together,
        since they probably belong to a table of contents.
        """
        if self.isPDF:
            pairs = zip(self.headingLocations, self.headingLocations[1:])
            toBeDeleted = []
            for pair in pairs:
                delta = pair[1] - pair[0]
                if delta < 4:
                    if pair[0] not in toBeDeleted:
                        toBeDeleted.append(pair[0])
                    if pair[1] not in toBeDeleted:
                        toBeDeleted.append(pair[1])
            logging.debug('TOC locations to be deleted: %s' % toBeDeleted)
            for badLoc in toBeDeleted:
                index = self.headingLocations.index(badLoc)
                del self.headingLocations[index]
        else:
            logging.info("The file is not a PDF so we won't ignore the TOC.")
            return

    def getEndLocation(self):
        """
        Tries to find where the book ends.
        """
        ends = ["End of the Project Gutenberg EBook",
                "End of Project Gutenberg's",
                "\*\*\*END OF THE PROJECT GUTENBERG EBOOK",
                "\*\*\* END OF THIS PROJECT GUTENBERG EBOOK"]
        joined = '|'.join(ends)
        pat = re.compile(joined, re.IGNORECASE)
        endLocation = None
        for line in self.lines:
            if pat.match(line) is not None:
                endLocation = self.lines.index(line)
                self.endLine = self.lines[endLocation]
                break

        if endLocation is None: # Can't find the ending.
            logging.info("Can't find an ending line. Assuming that the book ends at the end of the text.")
            endLocation = len(self.lines)-1 # The end
            self.endLine = 'None'

        logging.info('End line: %s at line %s' % (self.endLine, endLocation))
        return endLocation

    def getTextBetweenHeadings(self):
        chapters = []
        lastHeading = len(self.headingLocations) - 1
        for i, headingLocation in enumerate(self.headingLocations):
            if i != lastHeading:
                nextHeadingLocation = self.headingLocations[i+1]
                chapters.append(self.lines[headingLocation+1:nextHeadingLocation])
        return chapters

    def zeroPad(self, numbers):
        """
        Takes a list of ints and zero-pads them, returning
        them as a list of strings.
        """
        maxNum = max(numbers)
        maxDigits = len(str(maxNum))
        numberStrs = [str(number).zfill(maxDigits) for number in numbers]
        return numberStrs

    def getStats(self):
        """
        Returns statistics about the chapters, like their length.
        """
        # TODO: Check to see if there's a log file. If not, make one.
        # Write headings to file.
        numChapters = self.num_chapters
        averageChapterLength = sum([len(chapter) for chapter in self.chapters])/numChapters
        headings = ['Filename', 'Average chapter length', 'Number of chapters']
        stats = ['"' + self.filename + '"', averageChapterLength, numChapters]
        stats = [str(val) for val in stats]
        headings = ','.join(headings) + '\n'
        statsLog = ','.join(stats) + '\n'
        logging.info('Log headings: %s' % headings)
        logging.info('Log stats: %s' % statsLog)

        if not os.path.exists('log.txt'):
            logging.info('Log file does not exist. Creating it.')
            with open('log.txt', 'w') as f:
                f.write(headings)
                f.close()

        with open('log.txt', 'a') as f:
            f.write(statsLog)
            f.close()

    def writeChapters(self):
        chapterNums = self.zeroPad(range(1, len(self.chapters)+1))
        logging.debug('Writing chapter headings: %s' % chapterNums)
        basename = os.path.basename(self.filename)
        noExt = os.path.splitext(basename)[0]

        if self.nochapters:
            # Join together all the chapters and lines.
            text = ""
            for chapter in self.chapters:
                # Stitch together the lines.
                chapter = '\n'.join(chapter)
                # Stitch together the chapters.
                text += chapter + '\n'
            ext = '-extracted.txt'
            path = noExt + ext
            with open(path, 'w') as f:
                f.write(text)
        else:
            logging.info('Filename: %s' % noExt)
            outDir = noExt + '-chapters'
            if not os.path.exists(outDir):
                os.makedirs(outDir)
            ext = '.txt'
            for num, chapter in zip(chapterNums, self.chapters):
                path = outDir + '/' + num + ext
                logging.debug(chapter)
                chapter = '\n'.join(chapter)
                with open(path, 'w') as f:
                    f.write(chapter)

if __name__=="__main__":
    import sql_transmitter
    book= Book("/Users/galois/Documents/git/knowledge-club/research/data/i_see_satan_falling_like_lightning.epub",True,True)
    sql_transmitter.transmit_book(book)