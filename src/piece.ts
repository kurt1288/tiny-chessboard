import Settings from "./config";

export default class Piece extends HTMLElement {
    private settings: Settings;

    constructor(type: string, settings: Settings) {
        super();

        this.settings = settings;
        this.classList.add(`${type === type.toUpperCase() ? "w" : "b"}${type.toUpperCase()}`);

        if (settings.draggable) {
            this.onmousedown = this.OnMouseDown.bind(this);
            this.ontouchstart = this.OnTouchStart.bind(this);
        }
    }

    private OnMouseDown(downEvent: MouseEvent) {
        if (downEvent.button !== 0) { // only capture left clicks
            return;
        }

        this.StartDrag(downEvent);
    }

    private OnTouchStart(touchEvent: TouchEvent) {
        if (touchEvent.touches.length > 1) { // ignore multiple touch points
            return;
        }

        touchEvent.preventDefault(); // Prevent scrolling
        this.StartDrag(touchEvent.touches[0]);
    }

    private StartDrag(startEvent: MouseEvent | Touch) {
        const board = this.closest("chess-board");
        if (!board) { // only capture left clicks
            return;
        }

        const originalParent = this.parentElement;

        // User defined onDragStart
        if (this.settings.onDragStart(originalParent?.dataset.square || "", this.className) === false) {
            return;
        }

        const boardRect = board.getBoundingClientRect();
        const shiftX = startEvent.clientX - this.getBoundingClientRect().left;
        const shiftY = startEvent.clientY - this.getBoundingClientRect().top;

        Object.assign(this.style, {
            height: `${this.offsetHeight}px`,
            width: `${this.offsetWidth}px`,
            position: "absolute",
        });

        // Remove from current parent and append to board
        originalParent?.removeChild(this);
        board.appendChild(this);

        const moveAt = (pageX: number, pageY: number) => {
            let adjustedX = pageX - shiftX;
            let adjustedY = pageY - shiftY;

            // if the board is rotated, we have to adjust the positioning
            if (getComputedStyle(board).transform === "matrix(-1, 0, 0, -1, 0, 0)") {
                adjustedX = boardRect.width - (pageX - boardRect.left) - (this.offsetWidth - shiftX);
                adjustedY = boardRect.height - (pageY - boardRect.top) - (this.offsetHeight - shiftY);
            }

            this.style.left = adjustedX + "px";
            this.style.top = adjustedY + "px";
        };

        moveAt(startEvent.pageX, startEvent.pageY);

        const onMove = (moveEvent: MouseEvent | TouchEvent) => {
            moveEvent.preventDefault(); // Prevent scrolling
            const event = moveEvent instanceof MouseEvent ? moveEvent : moveEvent.touches[0];
            moveAt(event.pageX, event.pageY);
        };

        const onEnd = (endEvent: MouseEvent | TouchEvent) => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("touchmove", onMove);
            document.removeEventListener("mouseup", onEnd);
            document.removeEventListener("touchend", onEnd);

            const event = endEvent instanceof MouseEvent ? endEvent : endEvent.changedTouches[0];
            let element: Element | null = document.elementFromPoint(event.clientX, event.clientY);

            if (element?.shadowRoot) {
                element = Array.from(element.shadowRoot.elementsFromPoint(event.clientX, event.clientY))
                    .find(el => el.tagName.toLowerCase() === "cb-square") || element;
            }

            const target = element?.tagName.toLowerCase() === "cb-square" ? element : undefined;

            Object.assign(this.style, {
                position: "relative",
                top: "auto",
                left: "auto",
                height: "inherit",
                width: "inherit",
            });

            // User defined onDrop
            if (this.settings.onDrop((target as HTMLElement)?.dataset.square || "", this.className) === false) {
                originalParent?.appendChild(this);
            }
            else if (target) {
                target.innerHTML = "";
                (target as HTMLElement).appendChild(this);
            }
            else {
                originalParent?.appendChild(this);
            }

            this.onmouseup = null;
            this.ontouchend = null;
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("mouseup", onEnd);
        document.addEventListener("touchend", onEnd, { passive: false });
    }
}

customElements.define("cb-piece", Piece);
