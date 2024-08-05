export interface IConfig {
    position: string
    draggable: boolean
    flipped: boolean
    onDragStart: (source: string, piece: string) => boolean;
    onDrop: (target: string, piece: string) => boolean
}

export default class Settings {
    private _position: string;
    private _draggable: boolean;
    private _flipped: boolean;
    private _onDragStart: (source: string, piece: string) => boolean;
    private _onDrop: (target: string, piece: string) => boolean;

    constructor(config?: IConfig) {
        this._position = config?.position ?? "start";
        this._draggable = config?.draggable ?? false;
        this._flipped = config?.flipped ?? false;
        this._onDragStart = config?.onDragStart ?? function() { return true; };
        this._onDrop = config?.onDrop ?? function() { return true; };
    }

    get position() {
        return this._position;
    }

    get flipped() {
        return this._flipped;
    }

    get draggable() {
        return this._draggable;
    }

    get onDragStart() {
        return this._onDragStart;
    }

    get onDrop() {
        return this._onDrop;
    }
}