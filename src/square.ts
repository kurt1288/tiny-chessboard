import Settings from "./config";
import Piece from "./piece";

export default class Square extends HTMLElement {
    settings: Settings;

    constructor(isLight: boolean, sqIndex: number, settings: Settings) {
        super();
        
        this.settings = settings;
        this.classList.add(isLight ? "light" : "dark");

        // Calculate file and rank
        const file = String.fromCharCode(97 + (sqIndex % 8));
        const rank = 8 - Math.floor(sqIndex / 8);

        this.dataset.square = `${file}${rank}`;
    }

    SetPiece(piece: string) {
        const newPiece = new Piece(piece, this.settings);
        this.innerHTML = "";
        this.appendChild(newPiece);
    }
}

customElements.define("cb-square", Square);
