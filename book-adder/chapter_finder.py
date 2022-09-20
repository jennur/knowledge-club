from datetime import datetime
import logging
import re
import os
from PyPDF2 import PdfReader
from ebooklib import epub
from utils import get_sections,flatten_xml
from lxml import etree
from itertools import chain


logging.basicConfig(level=logging.INFO)

class Book():
    def __init__(self, filename, nochapters, stats):
        
        self.filepath = filename
        filename, self.file_ext = os.path.splitext(filename)
        self.filename = os.path.splitext(os.path.basename(self.filepath))[0]


        self.date_uploaded = datetime.today()
        self.created_at = datetime.today()
        self.updated_at = datetime.today()
        self.published = True
        self.nochapters = nochapters
        if self.isEPUB:
            self.process_epub()
        elif self.isPDF:
            self.process_pdf()
        elif self.isHTML:
            self.process_html()

    def process_epub(self):
        self.book_ = epub.read_epub(self.filepath)
        self.chapters = self.getHeadings() # The contents essentially
        self.contents = self.getContents()
        self.lines = -1 #Deal with this later
        self.title = self.book_.title
        
        self.num_chapters = len(self.chapters)
        self.stats = self.getStats()

    def process_pdf(self):
        print("PDF in proccess!")
        self.contents = self.getContents()

    def process_html(self):
        print("HTML in process")
        self.contents = self.getContents()
        self.title = self.filename
        self.chapters = ["Main"]
        self.lines = -1 #Deal with this later
        self.num_chapters = 1
        
    @property
    def isEPUB(self):
        return self.file_ext in [".EPUB",".epub"]
    
    @property
    def isPDF(self):
        return self.file_ext in [".PDF",".pdf"]
    
    @property
    def isHTML(self):
        return self.file_ext in [".HTML",".html"]

    def getContents(self):
        """
        Reads the book into memory.
        """
        if self.isEPUB: 
            
            text = []
            for i,x in enumerate(self.book_.items):
                if isinstance(x,epub.EpubHtml):
                    raw_string = x.get_body_content()
                    processed_string = ""
                    try:
                        processed_string = flatten_xml(raw_string)
                    except:
                        logging.error(f"The chapter couldn't be processed: {i}")
                    text.append({"raw":raw_string,"text-only":processed_string})
            return text


        if self.isPDF:
            reader = PdfReader(self.filepath)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            logging.error(text)
            return text

        else:
            text = []
            with open(self.filepath, errors='ignore') as f:
                contents = f.read()
            text = [{"raw":contents,"text-only":contents}]
            return text

    def getLines(self):
        """
        Breaks the book into lines.
        """
        return self.contents.split('\n')

    def getHeadings(self,flattened=True):
        if self.isEPUB:
            return get_sections(self.book_.toc,flattened=flattened)
        elif self.isPDF:
            # Form 1: Chapter I, Chapter 1, Chapter the First, CHAPTER 1
            # Ways of enumerating chapters, e.g.
            arabicNumerals = '\d+'
            romanNumerals = '(?=[MDCLXVI])M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})'
            numberWordsByTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty',
                                'seventy', 'eighty', 'ninety']
            numberWords = ['one', 'two', 'three', 'four', 'five', 'six',
                        'seven', 'eight', 'nine', 'ten', 'eleven',
                        'twelve', 'thirteen', 'fourteen', 'fifteen',
                        'sixteen', 'seventeen', 'eighteen', 'nineteen'] + numberWordsByTens
            numberWordsPat = '(' + '|'.join(numberWords) + ')'
            ordinalNumberWordsByTens = ['twentieth', 'thirtieth', 'fortieth', 'fiftieth', 
                                        'sixtieth', 'seventieth', 'eightieth', 'ninetieth'] + \
                                        numberWordsByTens
            ordinalNumberWords = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 
                                'seventh', 'eighth', 'ninth', 'twelfth', 'last'] + \
                                [numberWord + 'th' for numberWord in numberWords] + ordinalNumberWordsByTens
            ordinalsPat = '(the )?(' + '|'.join(ordinalNumberWords) + ')'
            enumeratorsList = [arabicNumerals, romanNumerals, numberWordsPat, ordinalsPat] 
            enumerators = '(' + '|'.join(enumeratorsList) + ')'
            form1 = 'chapter ' + enumerators

            # Form 2: II. The Mail
            enumerators = romanNumerals
            separators = '(\. | )'
            titleCase = '[A-Z][a-z]'
            form2 = enumerators + separators + titleCase

            # Form 3: II. THE OPEN ROAD
            enumerators = romanNumerals
            separators = '(\. )'
            titleCase = '[A-Z][A-Z]'
            form3 = enumerators + separators + titleCase

            # Form 4: a number on its own, e.g. 8, VIII
            arabicNumerals = '^\d+\.?$'
            romanNumerals = '(?=[MDCLXVI])M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\.?$'
            enumeratorsList = [arabicNumerals, romanNumerals]
            enumerators = '(' + '|'.join(enumeratorsList) + ')'
            form4 = enumerators

            pat = re.compile(form1, re.IGNORECASE)
            # This one is case-sensitive.
            pat2 = re.compile('(%s|%s|%s)' % (form2, form3, form4))

            # TODO: can't use .index() since not all lines are unique.

            headings = []
            for i, line in enumerate(self.lines):
                if pat.match(line) is not None:
                    headings.append(i)
                if pat2.match(line) is not None:
                    headings.append(i)

            if len(headings) < 3:
                logging.info('Headings: %s' % headings)
                logging.error("Detected fewer than three chapters. This probably means there's something wrong with chapter detection for this book.")
                exit()

            self.endLocation = self.getEndLocation()

            # Treat the end location as a heading.
            headings.append(self.endLocation)

            return headings
        else:
            raise ValueError("The input is neither pdf nor epub.")

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
        stats = ['"' + self.filepath + '"', averageChapterLength, numChapters]
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
        basename = os.path.basename(self.filepath)
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