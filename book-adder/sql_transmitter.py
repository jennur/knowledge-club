from asyncore import read
import config
import json
import psycopg2


book_insert_query = (
    "INSERT INTO \"books\" ("
    "\"bookUUID\",\"title\",\"published\",\"fileType\","
    "\"numChapters\",\"metadata\",\"languages\",\"identifiers\",\"numPages\","
    "\"coverImage\",\"createdAt\",\"updatedAt\") "
    "VALUES (DEFAULT,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING "
    "\"bookUUID\",\"title\",\"published\",\"fileType\","
    "\"numChapters\",\"metadata\",\"languages\",\"identifiers\",\"numPages\","
    "\"coverImage\",\"createdAt\",\"updatedAt\";"
)

chapter_insert_query ="INSERT INTO \"chapters\" (\"chapterUUID\",\"bookUUID\",\"chapterName\",\"chapterNumber\",\"chapterContent\",\"createdAt\",\"updatedAt\") VALUES (DEFAULT,%s,%s,%s,%s,%s,%s) RETURNING \"chapterUUID\",\"bookUUID\",\"chapterName\",\"chapterNumber\",\"chapterContent\",\"createdAt\",\"updatedAt\";"

def transmit_book(book):
    conn = psycopg2.connect(
        database = config.DB_NAME,
        user = config.DB_USER,
        password = config.DB_PASSWORD,
        host = config.DB_HOST,
        port = config.DB_PORT
    )
    cursor = conn.cursor()
    #query = book_insert_query()
    
    cursor.execute(
        book_insert_query,
        [
            book.title,
            book.published,
            book.file_ext,
            book.num_chapters,
            json.dumps(book.metadata),
            json.dumps(book.languages),
            json.dumps(book.identifiers),
            book.num_pages,
            book.cover_image,
            book.created_at,
            book.updated_at
        ]
    )
    id_of_new_row = cursor.fetchone()[0]
    
    i = 0
    for chapter_name, chapter_content in zip(book.chapters, book.contents):
        cursor.execute(
            chapter_insert_query, 
            [
                id_of_new_row,
                chapter_name,
                i,
                str(chapter_content['html']),
                book.created_at,
                book.updated_at
            ]
        )
        i+=1
    conn.commit()

    


if __name__ == "__main__":
    conn = psycopg2.connect(
        database = config.DB_NAME,
        user = config.DB_USER,
        password = config.DB_PASSWORD,
        host = config.DB_HOST,
        port = config.DB_PORT
    )
