const button = document.querySelector('button#exec')
const input = document.querySelector('div#code_input>textarea')
const csslink = document.querySelector('link#cssinjection')
var gamediv = document.querySelector('section#game>div')
var lv = 1 //TEMPORÁRIO! futura ligação com banco de dados

async function ejsload() {
    var ejsrequest = await fetch(`http://localhost:3000/webSites/rpg/localassets/levels/lv${lv}/content.ejs`)
    gamediv.innerHTML = await ejsrequest.text()
}
ejsload().then(() => {
    csslink.setAttribute('href', `http://localhost:3000/webSites/rpg/localassets/levels/lv${lv}/content.css`)
    class HtmlObject {
        constructor(height, width, left, top) {
            this.height = height
            this.width = width
            this.left = left
            this.top = top
        }
    }
    let hero = document.querySelector("div#hero")
    let walls = document.querySelectorAll("div.wall")
    let enemies = document.querySelectorAll("div.enemy")
    let end = document.querySelector("div#end")
    function list(divArr) {
        let objArr = []
        divArr.forEach(el => {
            objArr.push(new HtmlObject(el.height, el.width, el.left, el.top))
        })
        return objArr
    }
    var GameDOM = {
        hero: new HtmlObject(hero.height, hero.width, hero.left, hero.top), //personagem
        pxadd: 100, //quantidade de pixels a serem adicionadas a cada execução
        walls: list(walls), //constante com todos os obstáculos do mapa
        enemies: list(enemies), //constante com todos os inimigos
        end: new HtmlObject(end.height, end.width, end.left, end.top) //contante com o final do level
    }
    async function main() {
        var inputcommands = input.value.split('\n')
        let response = await fetch('/api/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           body: JSON.stringify({inputcommands: inputcommands, GameDOM: GameDOM})
        })
        const data = await response.json()
        console.log(data)
    }
    button.addEventListener('click', () => {
        main()
    })
})