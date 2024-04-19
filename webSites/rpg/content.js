import {main} from '../../globalAssets/js/main.js'
main()
const hero = document.querySelector('div#hero')
const button = document.querySelector('button#exec')
const input = document.querySelector('div#code_input>input')

button.onclick = async function() {
    const requestcommand = await fetch('./localassets/commands.json ')
    const commands = await requestcommand.json()
    commands.forEach(element => {
        if(input.value == element.command) {
            let valoratual = parseInt(element.eval())
            return
        }
    });
}