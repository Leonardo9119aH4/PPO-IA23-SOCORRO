export async function DragAndDrop() {
    const dragBlocks = document.querySelectorAll(".dragBlock");
    dragBlocks.forEach(function(dragBlock) {
        dragBlock.addEventListener("dragstart", function(event) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Salva a posição inicial do mouse em relação à posição da div
            event.dataTransfer.setData("mouseX", mouseX);
            event.dataTransfer.setData("mouseY", mouseY);
        });
    });
    document.addEventListener("drag", function(event) {
        const dragBlock = document.querySelector(".dragBlock.dragging");

        if (dragBlock) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const mouseXInitial = parseInt(event.dataTransfer.getData("mouseX"));
            const mouseYInitial = parseInt(event.dataTransfer.getData("mouseY"));

            // Calcula a diferença na posição do mouse
            const diffX = mouseX - mouseXInitial;
            const diffY = mouseY - mouseYInitial;

            // Atualiza a posição da div sendo arrastada
            dragBlock.style.left = (dragBlock.offsetLeft + diffX) + "px";
            dragBlock.style.top = (dragBlock.offsetTop + diffY) + "px";
        }
    });

    document.addEventListener("dragend", function(event) {
        const dragBlock = document.querySelector(".dragBlock.dragging");

        if (dragBlock) {
            // Limpa quaisquer dados salvos
            event.dataTransfer.clearData();
            dragBlock.classList.remove("dragging");
        }
    });
}
  