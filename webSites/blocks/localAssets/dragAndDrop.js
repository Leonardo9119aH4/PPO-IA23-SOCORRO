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

    destroy() {
        // Adicione a lógica de destruição aqui
    }
}

