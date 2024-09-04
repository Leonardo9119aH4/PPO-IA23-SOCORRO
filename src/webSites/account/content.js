import {main} from '/globalAssets/js/main.js'
main()
import { loadSecurity } from '/webSites/account/assets/security.js'
import { loadPersonalInformations } from '/webSites/account/assets/personalInformations.js'

async function getHtml(htmlName){
    let htmlOption = await fetch(`/websites/account/assets/${htmlName}.html`)
    return htmlOption.text()
}

const options = document.querySelectorAll("#options button")

options.forEach(option => {
    option.addEventListener("click", async () => {
        options.forEach(option => {
            option.style.backgroundColor = "transparent"
        })
        option.style.backgroundColor = "#ffffff"
        document.querySelector("#sectionContent").innerHTML = await getHtml(option.id)
        document.querySelector("#sectionName").innerHTML = option.querySelector("p").innerHTML
        //eu me odeio por fazer isso mas tenho que terminar logo
        switch (option.id){
            case "security":
                loadSecurity()
                break
            case "personalInformations":
                loadPersonalInformations()
        }
    })
})

document.querySelector("#security").click()