import store from "../../store/index"
import highlightSort from "./highlightSort";

export default function getHighlightedText () {

    // /*
    // This function takes the highlights and sorts them from end to start. 
    // This allows us to deal with the indexing in a smart way. That is, if we did it from beginning to end we would have to contend with the changing indices of the text since adding HTML tags changes the size of the innerHTML.Doing it from end to beggining mitigates  this as the index only changes for all text proceeding the added tag. 

    // We also deal with overlapping text here by saying that if a highlight ends after the previous beginning we add a span that is for both the highlights. 

    // In the future this may be too much as the number of highlights is sure to be very large. For now this will do. 

    // */
    // // let textContent = textContent;
    // const textContent = store.state.chapters.focusedChapter.chapterContent;
    // let highlights = store.state.chapters.focusedChapter.highlights;
    // const sortedHighlights = highlights?.sort(highlightSort);

    // let out = "";

    // let cur_index = textContent.length;
    // let cur_highlight = "";

    // for (let highlight of sortedHighlights) {
  
    //   if (highlight.endloc < cur_index) {
    //     //If there is space between the previous highlight and the current
    //     //highlight then update the index to be the location of the current highlight and add the text to out.
    //     let subString = textContent.substring(highlight.endloc,cur_index - 1);
    //     out = subString + out;
    //   }
    //   else if(highlight.endloc>cur_index){
    //     //If the current highlight ending is within the last highlight for now just ignore it. 
    //     highlight.endloc=cur_index-1;
    //   }
    //   let highlightedString = textContent.substring(highlight.startloc-1, highlight.endloc);
    //   cur_highlight = `<span class='highlight' loc=${ highlight.endloc }>${ highlightedString }</span>`;
    //   out = cur_highlight + out;
    //   cur_index = highlight.startloc;
    // }
    // //If we run out of highlights before the end add the rest of the text.
    // if (cur_index > 0) {
    //   out = textContent.substring(0,cur_index) + out;
    // }
    // return out;
  }