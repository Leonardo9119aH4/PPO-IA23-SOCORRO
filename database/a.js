class receiveBlock {
    constructor(element, id) {
        this.element = element;
        this.id = id;
        this.reBlElements = [];
    }

    addReBlElement(element) {
        this.reBlElements.push(element);
    }

    checkCollision(dragBlock) {
        const rect1 = this.element.getBoundingClientRect();
        const rect2 = dragBlock.getBoundingClientRect();

        if (rect1.left < rect2.right && rect1.right > rect2.left &&
            rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
            // Sobreposição com gap detectada
            console.log(`Sobreposição com gap${this.id} detectada`);
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
}

const receiveBlocks = [];

document.querySelectorAll('.reBl').forEach((element, index) => {
    const id = index + 1;
    const receiveBlock = new receiveBlock(element, id);

    // Adicione todos os elementos reBl à instância de receiveBlock
    const reBlElements = document.querySelectorAll(`#reBl${id}`);
    reBlElements.forEach(reBlElement => {
        receiveBlock.addReBlElement(reBlElement);
    });

    receiveBlocks.push(receiveBlock);
});

document.addEventListener('mousemove', function() {
    document.querySelectorAll('.dragBlock').forEach(dragBlock => {
        receiveBlocks.forEach(reBl => {
            reBl.checkCollision(dragBlock);
        });
    });
});
