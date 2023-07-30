import highlightContainerFromRange from "./highlightContainerFromRange";

export default function getContainerWithHighlights(containerElem, highlights) {  
  highlights && highlights.forEach(highlight => {
    const {
      commonAncestorId,
      startloc: startOffset,
      startNode: startNodeText,
      endloc: endOffset,
      endNode: endNodeText
    } = highlight;

    const pageElement = containerElem.querySelector(`#${commonAncestorId}`);

    if(pageElement) {
      const rangeNodes = findRangeNodes(pageElement, startNodeText, endNodeText);
      const { startNode, endNode } = rangeNodes;
      if(startNode && endNode) {
        const range = createRange(startNode, startOffset, endNode, endOffset);
        highlightContainerFromRange(containerElem, range);
      }
    }
  })
  return containerElem.outerHTML;
}

function createRange(startNode, startOffset, endNode, endOffset) {
  let range = new Range();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  return range;
}

function findRangeNodes(element, startNodeText, endNodeText) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let isSameNode = startNodeText.trim() === endNodeText.trim();
  let startNode = null;
  let endNode = null;
  let node;

  while (!endNode && (node = walker.nextNode())) {
    if (node.textContent === startNodeText) {
      startNode = node;
      if(isSameNode) endNode = startNode;
    } 
    else if (node.textContent === endNodeText) endNode = node;
  }
  return { startNode, endNode };
}