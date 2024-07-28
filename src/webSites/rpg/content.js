const button = document.querySelector('button#exec')
const input = document.querySelector('div#code_input>textarea')
const csslink = document.querySelector('link#cssinjection')
const heightDif = screen.height - window.innerHeight
const widthDif = screen.width - window.innerWidth
var gamediv = document.querySelector('section#game>div')
var lv = 1 //TEMPORÁRIO! futura ligação com banco de dados

class HtmlObject {
    constructor(height, width, left, top) {
        this.height = height
        this.width = width
        this.left = left
        this.top = top
    }
}
class GameDOM {
    constructor(heroVal, pxadd, walls, enemies, end) {
        this.heroVal = heroVal,
        this.pxadd = pxadd,
        this.walls = walls,
        this.enemies = enemies,
        this.end = end
    }
}

function list(divArr) {
    let objArr = []
    divArr.forEach(el => {
        objArr.push(new HtmlObject(el.height, el.width, el.left, el.top))
    })
    return objArr
}

async function ejsload() {
    var ejsrequest = await fetch(`http://localhost:3000/webSites/rpg/localassets/levels/lv${lv}/content.ejs`)
    gamediv.innerHTML = await ejsrequest.text()
}

ejsload().then(() => {
    csslink.setAttribute('href', `http://localhost:3000/webSites/rpg/localassets/levels/lv${lv}/content.css`)
    const hero = document.querySelector("div#hero")
    const walls = document.querySelectorAll("div.wall")
    const enemies = document.querySelectorAll("div.enemy")

    async function main() {
        let heroVal = hero.getBoundingClientRect()
        let end = document.querySelector("div#end")
        console.log(hero.style.top)
        let GameDOMObj = new GameDOM(new HtmlObject(heroVal.style.height, heroVal.style.width, heroVal.style.left - hero.offsetLeft, heroVal.style.top - hero.offsetTop), 100, list(walls), list(enemies), new HtmlObject(end.style.height, end.style.width, end.style.left, end.style.top))
        var inputcommands = input.value.split('\n')
        console.log(GameDOMObj)

        let response = await fetch('/api/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           body: JSON.stringify({inputcommands: inputcommands, GameDOMObj: GameDOMObj})
        })

        const data = await response.json()
        hero.style.top = data.heroVal.top + "px"
        hero.style.left = data.heroVal.left + "px"
    }

    button.addEventListener('click', () => {
        main()
    })
})