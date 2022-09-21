
export default function getSelectedText() {
    let text = "";
    let text_range = { startloc: 0, endloc: 0 };
    // let curSelection = window.getSelection().focusNode
    // let prevSelection = curSelection.previousSibling
    // while(prevSelection.previousSibling){
    //   if(prevSelection.classList.contains("highlight")){
    //     break
    //   }
    //   else{
    //     prevSelection = prevSelection.previousSibling
    //   }
    // }
    // console.log("Previous Selection: ", prevSelection)

    if(!window.getSelection().focusNode.previousSibling){
      text = window.getSelection();
      text_range = { startloc: text.anchorOffset, endloc: text.focusOffset };
    }
    else if (typeof window.getSelection != "undefined") {
      let last_loc= parseInt(window.getSelection().focusNode.previousSibling.attributes.loc.value);
      text = window.getSelection();
      text_range = {startloc:last_loc + text.anchorOffset,endloc:last_loc + text.focusOffset}

    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange();
    }
    return {...text_range, text: text.toString() };
  }