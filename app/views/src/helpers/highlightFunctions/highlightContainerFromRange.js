import { highlight } from "@/models/highlight";

export default function highlightContainerFromRange(container, range, highlightId) {
  const { 
    commonAncestorId,
    startNode,
    startloc: startOffset,
    endNode,
    endloc: endOffset,
  } = highlight(range);

  const commonAncestor = container.querySelector(`#${commonAncestorId}`);

  if(endNode !== startNode) {
    addHighlightToElement(startNode, startOffset, null, highlightId);
    addHighlightToElement(endNode, null, endOffset, highlightId);
  } else {
    addHighlightToElement(startNode, startOffset, endOffset, highlightId);
  }
  const rangeTextNodes = extractTextNodesFromRange(range, commonAncestor);

  if (rangeTextNodes.length > 2) {
    for(let i = 1; i < rangeTextNodes.length - 1; i++) {
      const textNode = rangeTextNodes[i];
      addHighlightToElement(textNode, null, null, highlightId);
    }
  }
}

function addHighlightToElement(node, startOffset, endOffset, idValue) {
  const nodeText = node.textContent;
  const nodeObj = { length: node.length, text: node.textContent };
  const nodeWrapper = document.createElement("span");
  const highLightWrapper = document.createElement("span");
  highLightWrapper.classList.add("highlight");
  
  if(idValue) {
    highLightWrapper.classList.add(`highlight-${idValue}`);
  }

  if(startOffset && endOffset){
    const { startSubstringNode, midSubstringNode, endSubstringNode } = getSubstringNodes(nodeObj, startOffset, endOffset)
    highLightWrapper.append(midSubstringNode);
    nodeWrapper.append(startSubstringNode, highLightWrapper, endSubstringNode);
  }
  else if(startOffset) {
    const { startSubstringNode, endSubstringNode } = getSubstringNodes(nodeObj, startOffset, startOffset)
    highLightWrapper.append(endSubstringNode);
    nodeWrapper.append(startSubstringNode, highLightWrapper);
  }
  else if (endOffset) {
    const { startSubstringNode, endSubstringNode } = getSubstringNodes(nodeObj, endOffset, endOffset)
    highLightWrapper.append(startSubstringNode);
    nodeWrapper.append(highLightWrapper, endSubstringNode);
  }
  else {
    highLightWrapper.append(nodeText);
    nodeWrapper.append(highLightWrapper);
  }

  node.parentNode && node.parentNode.replaceChild(nodeWrapper, node);
  
  function getSubstringNodes(node, offset1, offset2) {
    let { length, text } = node;
    let startSubstring = offset1 && text.substring(0, offset1);
    let midSubstring = (offset1 !== offset2) && text.substring(offset1, offset2);
    let endSubstring = offset2 && text.substring(offset2, length);
    
    let startSubstringNode = startSubstring && document.createTextNode(startSubstring);
    let midSubstringNode = midSubstring && document.createTextNode(midSubstring);
    let endSubstringNode = endSubstring && document.createTextNode(endSubstring);
  
    return { startSubstringNode, midSubstringNode, endSubstringNode };
  }
}




function extractTextNodesFromRange(range, element) {
  const textNodes = [];
  const walker = document.createTreeWalker(
    element, 
    NodeFilter.SHOW_TEXT
  );

  let currentNode = walker.nextNode();

  while (currentNode && currentNode !== range.endContainer.nextSibling) {
    if (range.intersectsNode(currentNode)) {
      textNodes.push(currentNode);
    }
    currentNode = walker.nextNode();
  }
  return textNodes;
}