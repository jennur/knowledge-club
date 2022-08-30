from asyncore import read
import psycopg2
import re

dotenv_re = re.compile("(.*)=(.*)|")

book_insert_query ="INSERT INTO \"books\" (\"bookUUID\",\"title\",\"dateUploaded\",\"published\",\"FileType\",\"NumChapters\",\"createdAt\",\"updatedAt\") VALUES (DEFAULT,%s,%s,%s,%s,%s,%s,%s) RETURNING \"bookUUID\",\"title\",\"dateUploaded\",\"published\",\"FileType\",\"NumChapters\",\"createdAt\",\"updatedAt\"";

chapter_insert_query ="INSERT INTO \"chapters\" (\"chapterUUID\",\"bookUUID\",\"chapterName\",\"chapterNumber\",\"dateUploaded\",\"chapterContent\",\"createdAt\",\"updatedAt\") VALUES (DEFAULT,%s,%s,%s,%s,%s,%s,%s) RETURNING \"chapterUUID\",\"bookUUID\",\"chapterName\",\"chapterNumber\",\"dateUploaded\",\"chapterContent\",\"createdAt\",\"updatedAt\";"

def read_dotenv(path):
    env_vars = {}
    with open(path,"r") as f:
        for x in dotenv_re.finditer(f.read()):
            if x.group(1):
                env_vars[x.group(1)] = x.group(2).replace("\"","")
    return env_vars

def transmit_book(book):
    env_vars = read_dotenv("/Users/galois/Documents/git/knowledge-club/.env")
    conn = psycopg2.connect(
    database=env_vars["DB_NAME"],
    user=env_vars["DB_USER"],
    password=env_vars["DB_PASSWORD"])
    cursor = conn.cursor()
    #query = book_insert_query()
    
    cursor.execute(book_insert_query,[book.title,book.date_uploaded,book.published,book.file_ext,book.num_chapters,book.created_at,book.updated_at])
    id_of_new_row = cursor.fetchone()[0]
    
    i = 0
    for chapter_name,chapter_content in zip(book.chapters,book.contents):
        cursor.execute(chapter_insert_query,[id_of_new_row,chapter_name,i,book.date_uploaded,str(chapter_content['text-only']),book.created_at,book.updated_at])
        i+=1
    conn.commit()

    


if __name__ == "__main__":
    env_vars = read_dotenv("/Users/galois/Documents/git/knowledge-club/.env")
    conn = psycopg2.connect(
    database=env_vars["DB_NAME"],
    user=env_vars["DB_USER"],
    password=env_vars["DB_PASSWORD"])
