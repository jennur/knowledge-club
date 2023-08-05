import getContainerWithHighlights from "./getContainerWithHighlights";

export default function highlightChapterContent(chapterContent, highlights) {
  let contentNode = document.createElement("div");
  contentNode.innerHTML = chapterContent;
  return getContainerWithHighlights(contentNode, highlights);
}