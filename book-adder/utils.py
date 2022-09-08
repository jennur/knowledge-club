import logging
import re
import os
from PyPDF2 import PdfReader
from ebooklib import epub
from lxml import etree

def get_sections(toc,spaces=0,flattened=True):
    out = []
    for e in toc:
        if hasattr(e,"__iter__"):
            if flattened:
                out.extend(get_sections(e,spaces=spaces+1,flattened=flattened))
            else:
                out.append(get_sections(e,spaces=spaces+1,flattened=flattened))
        else:
            out.append(e.title)
    return out


def flatten_xml(string_chapter):
    tree = etree.fromstring(string_chapter)
    notags = etree.tostring(tree, encoding='utf8', method='text').decode("utf-8")
    return notags