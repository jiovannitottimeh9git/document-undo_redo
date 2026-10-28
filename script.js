const editor=document.getElementById("editor");
const undoButton=document.getElementById("undo-btn"),redoButton=document.getElementById("redo-btn");
const clearButton=document.getElementById("clear-btn"),sampleButton=document.getElementById("sample-btn");
const statusText=document.getElementById("save-status");
const wordCount=document.getElementById("word-count"),charCount=document.getElementById("char-count"),historyCount=document.getElementById("history-count");
// The end of each array is the TOP of its stack.
const undoStack=[],redoStack=[];
let lastText=editor.value,captureTimer=null;
function updateInterface(){
  undoButton.disabled=undoStack.length===0;redoButton.disabled=redoStack.length===0;
  historyCount.textContent=`Undo history: ${undoStack.length}`;
  const t=editor.value.trim();wordCount.textContent=`Words: ${t?t.split(/\s+/).length:0}`;
  charCount.textContent=`Characters: ${editor.value.length}`;
}
function saveCurrentVersion(){
  if(editor.value!==lastText){
    undoStack.push(lastText); // PUSH previous version onto undo stack
    redoStack.length=0;       // new edits invalidate the old redo path
    lastText=editor.value;statusText.textContent="Edited";updateInterface();
  }
}
editor.addEventListener("input",()=>{
  statusText.textContent="Typing…";clearTimeout(captureTimer);
  captureTimer=setTimeout(saveCurrentVersion,350);
  const t=editor.value.trim();wordCount.textContent=`Words: ${t?t.split(/\s+/).length:0}`;
  charCount.textContent=`Characters: ${editor.value.length}`;
});
function flushPendingEdit(){clearTimeout(captureTimer);saveCurrentVersion();}
function undo(){
  flushPendingEdit();if(!undoStack.length)return;
  redoStack.push(editor.value); // save current version for Redo
  editor.value=undoStack.pop(); // POP the most recently saved version
  lastText=editor.value;statusText.textContent="Undo applied";updateInterface();editor.focus();
}
function redo(){
  flushPendingEdit();if(!redoStack.length)return;
  undoStack.push(editor.value); // preserve current version for Undo
  editor.value=redoStack.pop(); // POP the most recent undone version
  lastText=editor.value;statusText.textContent="Redo applied";updateInterface();editor.focus();
}
undoButton.addEventListener("click",undo);redoButton.addEventListener("click",redo);
clearButton.addEventListener("click",()=>{
  flushPendingEdit();if(editor.value==="")return;
  undoStack.push(editor.value);redoStack.length=0;editor.value="";lastText="";
  statusText.textContent="Document cleared";updateInterface();editor.focus();
});
sampleButton.addEventListener("click",()=>{
  flushPendingEdit();const sample="Meeting Notes\n\n1. Review the project timeline.\n2. Assign tasks to the team.\n3. Confirm the next meeting date.\n\nRemember: every edit can be undone.";
  if(sample===editor.value)return;
  undoStack.push(editor.value);redoStack.length=0;editor.value=sample;lastText=sample;
  statusText.textContent="Sample loaded";updateInterface();
});
document.addEventListener("keydown",event=>{
  const key=event.key.toLowerCase();
  if((event.ctrlKey||event.metaKey)&&key==="z"&&!event.shiftKey){event.preventDefault();undo();}
  else if((event.ctrlKey||event.metaKey)&&(key==="y"||(key==="z"&&event.shiftKey))){event.preventDefault();redo();}
});
updateInterface();
