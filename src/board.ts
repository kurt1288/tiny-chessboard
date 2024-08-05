import Settings from "./config";
import Square from "./square";

export default class Board extends HTMLElement {
    private settings: Settings;

    constructor(settings: Settings) {
        super();

        this.settings = settings;
    }

    connectedCallback() {
        const createSquare = (index: number) => {
            const isLight = ((index >> 3) % 2 === (index % 2));
            return new Square(isLight, index, this.settings);
        };

        if (this.settings.flipped) {
            // When the board is flipped, we need to start from the bottom-left corner of the board
            for (let k = 0; k < 64; k++) {
                const index = 63 - k; // Flip index calculation
                const square = createSquare(index);
                this.appendChild(square);
            }
        } else {
            // Normal order from top-left to bottom-right
            for (let k = 0; k < 64; k++) {
                const square = createSquare(k);
                this.appendChild(square);
            }
        }
    }

    SetPosition(pieces: string[]) {
        // Remove existing pieces
        this.querySelectorAll("cb-piece").forEach((element) => element.remove());
        const squares = this.querySelectorAll("cb-square") as NodeListOf<Square>;

        pieces.forEach((piece, index) => {
            if (piece !== "") {
                const square = squares[this.settings.flipped ? 63 - index : index];
                if (square) {
                    square.SetPiece(piece);
                }
            }
        });
    }
}

customElements.define("chess-board", Board);
