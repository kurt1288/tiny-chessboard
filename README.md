# tiny-chessboard

A modern, lighweight, JavaScript chessboard (written in TypeScript). Built-in responsiveness, mobile friendly, and no dependencies.

## What is tiny-chessboard?

tiny-chessboard is just the board. It's purely just a "view".

## What tiny-chessboard is not

It is not capable how determining what moves are legal, whether a position is in check, who's turn it is, etc.. It has no concept of rules nor any ability to "think" or play moves.

If you need the ability to generate moves, position detection, etc., consider using the [chess.js](https://github.com/jhlywa/chess.js) library.

## Installation

You can add tiny-chessboard to your project using any of the following:

1. Download the latest file [here](https://github.com/kurt1288/tiny-chessboard/releases/latest).
2. Install with `npm install tiny-chessboard`
3. From a CDN

## Usage

### Step 1

Create a container element. Make sure you give it a `width`, either inline or in your CSS:

```html
<div id="board" style="width: 200px"></div>
```

or

```html
<style>
    #board {
        width: 50%;
    }
</style>

<div id="board"></div>
```

### Step 2
#### Step 2a
Import tiny-chessboard into your JavaScript (remember to make the path relative to the file location, if you downloaded the file):

```js
import Chessboard from "tiny-chessboard";
```

Note: If you use this in a `script` tag, remember to include `type="module"`:

```html
<script type="module">
    import Chessboard from "tiny-chessboard";
    ...
</script>
```

#### Step 2b
Create the board element:

```js
const board = new Chessboard("board");
// or...
const board = new Chessboard(document.getElementById("board"));
```

This is a minimal setup and will result in a board in the start position.

### Multiple boards

Multiple boards can be created on a page:

```html
<div id="board1"></div>
<div id="board2"></div>
<div id="board3"></div>

<script>
    const board1 = new Chessboard("board1");
    const board2 = new Chessboard("board2");
    const board3 = new Chessboard("board3");
</script>
```

## Configuration

Below is the default configuration object:

```js
const config = {
    position: "start", // FEN string or "start"
    draggable: false, // allow pieces to be dragged
    onDragStart: function() { },
    onDrop: function() { },
    flipped: false, // true for black to be at the bottom
}
```

In both the `onDragStart` and `onDrop` events, use `return false` to cancel the default behavior.

## Methods

### constructor

`new Chessboard(element, config)`

* **element** (required): A string or DOM element. A string will be used to find the element by ID.
* **config** (optional): A config object (see the Configuration section above)

### SetPosition(fen)
Sets the board position to the `fen`.

### Move(move)

`move` is a string containing the start and end square. Like `e2e4` or `b1c3`.

### Clear()

Removes all pieces from the board

### Destroy()

Removes the board from the DOM.

## Licenses
tiny-chessboard: MIT License

Piece graphics by Colin M.L. Burnett, [GPLv2+](https://www.gnu.org/licenses/gpl-2.0.txt)