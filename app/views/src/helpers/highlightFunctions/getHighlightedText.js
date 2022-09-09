import store from "../../store/index"
import highlightSort from "./sort";

export default function getHighlightedText () {
    // let textContent = textContent;
    const textContent = store.state.chapters.focusedChapter.chapterContent;
    let highlights = store.state.chapters.focusedChapter.highlights;
    const sortedHighlights = highlights?.sort(highlightSort);

    let out = "";
    let cur_index = textContent.length;
    let cur_highlight = "";
  
    for (let highlight of sortedHighlights) {
  
      if (highlight.endloc < cur_index) {
        // console.log("Highlight endloc, cur_index:", highlight.endloc, cur_index);
        // console.log("Substring:", textContent.substring(highlight.endloc, cur_index));
  
        let subString = textContent.substring(highlight.endloc,cur_index - 1);
        out = subString + out;
      }
      
      let highlightedString = textContent.substring(highlight.startloc, highlight.endloc);
      cur_highlight = `<span class='highlight' loc=${ highlight.endloc }>${ highlightedString }</span>`;
      out = cur_highlight + out;
      cur_index = highlight.startloc;
    }
    if (cur_index > 0) {
      out = textContent.substring(0,cur_index) + out;
    }
    // console.log("Original chapter content:", textContent);
    return out;
  }