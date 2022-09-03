-- SELECT * FROM BOOKS;

-- DROP TABLE Books;
CREATE TABLE Books (
BookUuid VARCHAR(255) NOT NULL,
PublishedDate DATE,
Title VARCHAR(255) NOT NULL,
createdAt DATE NOT NULL,
FileType VARCHAR(10) NOT NULL,
NumChapters INT,
PRIMARY KEY (BookUuid)
);

-- SELECT chapter_content FROM Chapters WHERE book_id == *

-- SELECT 
-- book_id as book_id,
-- chapter_number as chapter_number,
-- chapter_content as chapter_content
-- FROM Chapters
-- OUTER JOIN Books USING (book_id)
-- WHERE book_id = *
