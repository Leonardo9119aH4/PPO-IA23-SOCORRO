export class DragBlock { //clase que torna as divs .dragBlock arrastáveis
    constructor(element) {
        this.element = element;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.mainElement = document.querySelector('main');

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
            const mainRect = this.mainElement.getBoundingClientRect();
            let newLeft = e.clientX - this.offsetX - mainRect.left;
            let newTop = e.clientY - this.offsetY - mainRect.top;
            // Garantir que o elemento permaneça dentro dos limites do main
            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft + this.element.offsetWidth > mainRect.width) newLeft = mainRect.width - this.element.offsetWidth;
            if (newTop + this.element.offsetHeight > mainRect.height) newTop = mainRect.height - this.element.offsetHeight;
            this.element.style.left = newLeft + "px";
            this.element.style.top = newTop + "px";
        }
    }
    getBoundingClientRect() {
        return this.element.getBoundingClientRect();
    }
}
export class ReceiveBlock{ //classe que permite as lacunas (.reBl) detectar se um .dragBlock está encaixado corretamente
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
function SaveBlGap(dragBlockId, gapId){//uso interno do módulo para salvar os valores na array
    saveBlockId.push(dragBlockId)
    saveGapId.push(gapId) //debug
}
export async function Execute(correctSeq){ //verifica se os blocos estão na sequência correta
    var isCorrect = null //booleano para verificar se a sequência está correta
    var wrongCount = 0 //contador de erros, valor -1 para quando há lacunas não preenchidas
    if(saveBlockId.length === correctSeq.length && saveBlockId.every((value, index)=>value===correctSeq[index])){ //a posição na array equivale ao nível
        isCorrect = true
    }
    else{
        isCorrect = false
        if(saveBlockId.length === correctSeq.length){
            saveBlockId.forEach((value, index)=>{
                if(saveBlockId[index] != correctSeq[index]){
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

