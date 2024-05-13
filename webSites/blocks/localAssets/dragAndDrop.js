export class dragBlock {
    constructor(Element) {
        this.Element = Element;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;

        this.Element.addEventListener("mousedown", (e) => {
            this.isDragging = true;
            this.offsetX = e.clientX - this.Element.getBoundingClientRect().left;
            this.offsetY = e.clientY - this.Element.getBoundingClientRect().top;
            this.Element.style.cursor = "grabbing";
        });

        this.Element.addEventListener("mouseup", () => {
            this.isDragging = false;
            this.Element.style.cursor = "grab";
        });

        document.addEventListener("mousemove", (e) => {
            if (this.isDragging) {
                this.Element.style.left = e.clientX - this.offsetX + "px";
                this.Element.style.top = e.clientY - this.offsetY + "px";
            }
        });
    }

    destroy(){
        // Adicione a lógica de destruição aqui
    }
}
export class receiveBlock{
    constructor(element, id) {
        this.element = element
        this.id = id
        this.reBlElements = []
    }
    addReBlElement(element) {
        this.reBlElements.push(element);
    }
    checkCollision(dragBlock) {
        const rect1 = this.element.getBoundingClientRect()
        const rect2 = dragBlock.getBoundingClientRect()
        if (rect1.left < rect2.right && rect1.right > rect2.left &&
            rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
            // Sobreposição detectada
            console.log(`Sobreposição com gap${this.id} detectada`)
        }
        this.reBlElements.forEach(reBlElement => {
            const reBlRect = reBlElement.getBoundingClientRect();
            if (reBlRect.left < rect2.right && reBlRect.right > rect2.left &&
                reBlRect.top < rect2.bottom && reBlRect.bottom > rect2.top) {
                // Sobreposição com reBl detectada
                console.log(`Sobreposição com reBl${this.id} detectada`);
            }
        });
    }
    destroy(){

    }
}
