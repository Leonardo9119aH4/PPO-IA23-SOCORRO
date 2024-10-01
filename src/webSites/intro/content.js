import {main} from "/globalAssets/js/main.js"
const video = document.querySelector("video")
const controls = document.querySelector(".controls")
const skip = controls.querySelector("#skip")
const reset = controls.querySelector("#reset")
async function content(){
    skip.addEventListener("click", ()=>{
        EndVideo()
    })
    reset.addEventListener("click", ()=>{
        video.currentTime = 0
    })
    video.addEventListener("ended", () =>{
        EndVideo()
    })
    function EndVideo(){
        window.location.href = "/webSites/intro/letter.html"
    }
}
main()
content()