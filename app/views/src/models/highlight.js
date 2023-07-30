export function highlight(range) {
  let commonAncestor = range.commonAncestorContainer;

  if (!commonAncestor.id) {
    // Get the book-page node to get a valid id
    if(commonAncestor.nodeType === Node.TEXT_NODE) commonAncestor = commonAncestor.parentNode;
    commonAncestor = commonAncestor.closest(".book-page");
  }

  return {
    commonAncestorId: commonAncestor.id,
    startloc: range.startOffset,
    startNode: range.startContainer,
    endloc: range.endOffset,
    endNode: range.endContainer,
    content: range.toString()
  }
}

export function highlightDbObject(highlight) {
  const { startNode, endNode } = highlight;
  delete highlight.startNode;
  delete highlight.endNode;
  return {
    ...highlight,
    startNode: startNode.textContent,
    endNode: endNode.textContent,
  }
}