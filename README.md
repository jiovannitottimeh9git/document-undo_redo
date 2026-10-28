# DraftDesk — Document Editor with Undo and Redo

A small document-editing application demonstrating a real-world use of the Stack data structure.

## Features
- Type and edit text
- Undo and redo recent edits
- Keyboard shortcuts: Ctrl+Z to undo; Ctrl+Y or Ctrl+Shift+Z to redo
- Clear document and load sample text
- Live word and character counts
- Responsive design

## Run
1. Extract `Document-Undo-Redo.zip`.
2. Open the `document-undo-redo` folder in Visual Studio Code.
3. Open `index.html` in a browser. No installation or server is required.

## Where the stack is used
In `script.js`:
- `const undoStack = []` creates the undo stack.
- `const redoStack = []` creates the redo stack.
- `undoStack.push(lastText)` saves a previous document version.
- `undoStack.pop()` retrieves the most recently saved version.
- `redoStack.push(editor.value)` saves the current version before undoing.
- `redoStack.pop()` restores the most recent version that was undone.

## How it works
A stack follows LIFO: Last In, First Out. Before an edit is captured, the previous document version is pushed onto the undo stack. Undo retrieves the latest version and stores the current version on the redo stack. Redo reverses this process. A new edit clears redo history because the previous redo sequence no longer matches the current document.

This learning project keeps history in memory. Refreshing the browser resets undo/redo history.
