export class DragBlock {
    constructor(element) {
        this.element = element;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;

        this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
        document.addEventListener("mouseup", this.onMouseUp.bind(this));
        document.addEventListener("mousemove", this.onMouseMove.bind(this));
    }
    onMouseDown(e) {
        this.isDragging = true;
        this.offsetX = e.clientX - this.element.getBoundingClientRect().left;
        this.offsetY = e.clientY - this.element.getBoundingClientRect().top;
        this.element.style.cursor = "grabbing";
    }

    onMouseUp() {
        this.isDragging = false;
        this.element.style.cursor = "grab";
    }

    onMouseMove(e) {
        if (this.isDragging) {
            this.element.style.left = e.clientX - this.offsetX + "px";
            this.element.style.top = e.clientY - this.offsetY + "px";
        }
    }

    getBoundingClientRect() {
        return this.element.getBoundingClientRect();
    }
    destroy() {
        // Adicione a lógica de destruição aqui
    }
}
export class ReceiveBlock{
    constructor(element) {
        this.element = element;
    }

    checkCollision(dragBlocks) {
        const rect1 = this.element.getBoundingClientRect();
        dragBlocks.forEach(dragBlock => {
            const rect2 = dragBlock.getBoundingClientRect();
            if (rect1.left < rect2.right && rect1.right > rect2.left &&
                rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
                console.log(`Sobreposição detectada: ${dragBlock.id} sobre ${this.element.id}`);
            }
        });
    }
    destroy(){

    }
}
