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
                    SaveBlGap(dragBlock.id, this.element.id)
            }
        });
    }
    destroy(){

    }
}
var saveBlockId = [] //array que guarda a sequência
var saveGapId = [] //array para debug que mostra a quem os blocos se referenciam
var level = 1 //temporário
function SaveBlGap(dragBlockId, gapId){//uso interno do módulo para salvar os valores na array
    saveBlockId.push(dragBlockId)
    saveGapId.push(gapId) //debug
}
export async function Execute(){
    const correctSeqRqst = await fetch("http://localhost:3000/webSites/blocks/localAssets/levels/correctSeq.json")
    const correctSeq = await correctSeqRqst.json()
    var isCorrect = null
    var wrongCount = 0
    if(saveBlockId.length === correctSeq[level-1].length && saveBlockId.every((value, index)=>value===correctSeq[level-1][index])){
        isCorrect = true
    }
    else{
        isCorrect = false
        if(saveBlockId.length === correctSeq[level-1].length){
            saveBlockId.forEach((value, index)=>{
                if(saveBlockId[index] != correctSeq[level-1][index]){
                    wrongCount++
                }
            })
        }
        else{
            wrongCount = -1
        }
    }
    saveBlockId=[] //zera a array após a verificação
    return [isCorrect, wrongCount];
}

